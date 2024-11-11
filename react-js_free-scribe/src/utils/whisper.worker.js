// The Web Worker. 
// Setting up a Web Worker to handle transcription of audi orecordings using OpenAI's Whisper model for automatic speech recognition (ASR). The transcription is handeld in chunks, allowing partial results to be sent to the main thread in treal-time. 

// Importing the function called pipeline from a library. This will load and manage the Whisper ASR model.
import { pipeline } from '@xenova/transformers'
// Importing the message Types defined in the presets file. These types categorize the messages sent between the Web Worker and the main thread. 
import { MessageTypes } from './presets';

// 1) This class is a helper to create and manage the Whisper transcription pipeline. 
class MyTranscriptionPipeline {
    // task: defines the type of task automatic speech recognition (ASR)
    static task = 'automatic-speech-recognition';
    // model: specified the model "whisper-tiny.en"
    static mode = 'openai/whisper-tiny.en'; // whisper-tiny.it
    // instance: holds a single instance of the ASR pipeline to avoid re-initialization. 
    static instance = null;

    // This function is important, cause it's how we are going to communicate with our main function. 
    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, null, { progress_callback });
        }

        return this.instance;
    }
}

// !!!!!!!!!!!!!
// In an async function, the await pauses the function's execution until a promise is fullfilled (resolved or rejected).
// - Pausing Execution: when you use await before a promise, the function pauses at that line until the promise completes. 
// - Andling asynchronous Operation Sequentially: by waiting for each await to complete, you can handle asynchronous operations in a specific sequence, allowing the next steps to rely on the results of previous ones. 
// - Non-blocking Behaviour: even though await pauses the async function, it doesn't block the main thread (UI thread). Other code outside the async function can still run while the awaited operation completes. 
// !!!!!!!!!!!!!


// 2) Web Worker Event Listener. The Web Worker listens for messages from the main thread. 
// This function listens for messages in the Web Worker.
self.addEventListener('message', async (event) => {
    const { type, audio } = event.data;
    // If the message is from an INFERENCE_REQUEST, it calls the transcribe function with the provided audio data to begin transcription. 
    if (type === MessageTypes.INFERENCE_REQUEST) {
        await transcribe(audio);
    }
});


// 3) Transcribe function. This function performs the transcription of audio. 
async function transcribe(audio) {
    // Loading Message. Call the sendLoadingMessage to update the main thread on the transcription's loading state. 
    sendLoadingMessage('loading');

    let pipeline;

    try {
        // Pipeline Loading. Uses MyTranscriptionPipeline.getInstance() to get or initialize the ASR pipeline. 
        pipeline = await MyTranscriptionPipeline.getInstance(load_model_callback)
    } catch (err) {
        console.log(err.message);
    }

    sendLoadingMessage('success');

    const stride_length_s = 5;

    const generationTracker = new GenerationTracker(pipeline, stride_length_s);

    // ASR Inference. Runs the pipeline on the audio with specific settings. 
    await pipeline(audio, {
        top_k: 0,
        do_sample: false,
        // Length of each audio chunk for processing. 
        chunk_length: 30,
        // Helping handle overlap between chunks to ensure smoother transcription. 
        stride_length_s,
        return_timestamps: true,
        // Functions that handle chunk processing and real-time results.
        callback_function: generationTracker.callbackFunction.bind(generationTracker),
        // Functions that handle chunk processing and real-time results.
        chunk_callback: generationTracker.bind(generationTracker)
    })

    // Result Sending. After processing, use generationTracker.sendFinalResult() to indicate the transcription is complete.
    generationTracker.sendFinalResult();
}

// 4) Load model callback function. This function is called during model loading. It:
// - Checks if the loading status is "progress"
// - Sends download progress details (file, progress, loaded, and total) back to the main thread using sendDownloadingMessage.
async function load_model_callback(data) {
    const { status } = data;

    if (status === 'progress') {
        const { file, progress, loaded, total } = data;
        sendDownloadingMessage(file, progress, loaded, total);
    }
}

// 5) sendLoadingMessage and sendDownloadingMessage Functions. 
// These utility functions send status updates to the main thread:
// 
// Sends the loading status.
function sendLoadingMessage(status) {
    self.postMessage({
        type: MessageTypes.LOADING,
        status
    });
}
// Sends detailed progress info during model loading. 
async function sendDownloadingMessage(file, progress, loaded, total) {
    self.postMessage({
        type: MessageTypes.DOWNLOADING,
        file,
        progress,
        loaded,
        total,
    })
}

// 6) This is a utility class to manage and process chunks of transcribed data:
class GenerationTracker {

    // Class constructor. Accepts the pipeline and stride length, setting up data structures to store chunks and intermediate transcription data. 
    constructor(pipeline, stride_length_s) {
        this.pipeline = pipeline;
        this.stride_length_s = stride_length_s;
        this.chunks = [];
        this.time_precision = pipeline?.processor.feature_extractor.config.chunk_length / pipeline.model.config.max_source_positions;
        this.processed_chunks = [];
        this.callbackFunctionCounter = 0;
    }

    // Send a message to the main thread when transcription is completed. 
    sendeFinalResult() {
        self.postMessage({ type: MessageTypes.INFERENCE_DONE })
    }

    // Handels chunk processing, storing and formatting each chunk. It uses the ASR to tokenizer to extract text and timestamps for the audio and sends a createResultMessage.
    callbackFunction(beams) {
        this.callbackFunctionCounter += 1;
        if (this.callbackFunctionCounter % 10 !== 0) {
            return;
        }

        const bestBeam = beams[0];
        let text = this.pipeline.tokenizer.decode(bestBeam.output_token_ids, {
            skip_special_tokens: true
        })

        const result = {
            text,
            start: this.getLastChunkTimeStamp(),
            end: undefined
        }

        createPartialResultMessage(result);
    }

    chunkCallback(data) {
        this.chunks.push(data)
        const [text, { chunks }] = this.pipeline.tokenizer._decode_asr(
            this.chunks,
            {
                time_precision: this.time_precision,
                return_timestamps: true,
                force_full_sequence: false
            }
        )

        this.processed_chunks = chunks.map((chunk, index) => {
            return this.processChunk(chunk, index)
        });

        createResultMessage(
            this.processed_chunks, false, this.getLastChunkTimeStamp()
        );
    }

    getLastChunkTimeStamp() {
        if (this.processed_chunks.length === 0) {
            return 0;
        }
    }

    // Formats individual chunks with start and end timestamps. 
    processChunk(chunk, index) {
        const { text, timestamp } = chunk;
        const [start, end] = timestamp;

        return {
            index, 
            text: `${text.trim()}`,
            start: Math.round(start),
            end: Math.round(end) || Math.round(start + 0.9 * this.stride_length_s);
        }
    }
}

// 7) createResultMessage and createPartialResultMessage Functions. 
// These functions send messages back to the main thread with transcription results.
//
// Send full transcription results and metadata to the main thread.
function createResultMessage(result, isDone, completedUntilTimestamp) {
    self.postMessage({
        type: MessageTypes.RESULT,
        result, 
        isDone, 
        completedUntilTimestamp
    })
}
// Send partial transcription results, allowing real-time feedback during the transcription. 
function createPartialResultMessage(result) {
    self.postMessage({
        type: MessageTypes.RESULT_PARTIAL,
        result
    })
}