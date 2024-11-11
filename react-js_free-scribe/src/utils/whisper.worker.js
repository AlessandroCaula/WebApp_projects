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


// 2) Web Worker Event Listener. The Web Worker listens for messages from the main thread. Setting up a listener on self (the Web Worker instace).
// This function listens for messages in the Web Worker.
// Setting up an event listener that waits for messages from the main application. 
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
        // Pipeline Loading. Uses MyTranscriptionPipeline.getInstance() to retrieve or initialize the ASR pipeline. 
        pipeline = await MyTranscriptionPipeline.getInstance(load_model_callback)
    } catch (err) {
        console.log(err.message);
    }

    sendLoadingMessage('success');

    const stride_length_s = 5;

    // An instance to the GenerationTracker class (discussed below), which manages transcription tracking. 
    const generationTracker = new GenerationTracker(pipeline, stride_length_s);

    // ASR Inference. Runs the pipeline on the audio with specific settings. 
    // Call the pipeline function with the audio data and a set of configuration options. 
    await pipeline(audio, {
        // Limit the number of outputs generated (0 means no restriction)
        top_k: 0,
        // Disable sampling, making the transcription deterministic.
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

// 6) This is a utility class to manage and process chunks of transcribed data.
// this class tracks the transcription's progress, manage chunks, and sends partial and final results back to the main thread.
class GenerationTracker {

    // Class constructor. Accepts the pipeline and stride length, setting up data structures to store chunks and intermediate transcription data. 
    constructor(pipeline, stride_length_s) {
        // Properties.
        //
        // Reference to the transcription pipeline instance. 
        this.pipeline = pipeline;
        // The stride length in seconds. 
        this.stride_length_s = stride_length_s;
        // Holds raw audio data chunks.
        this.chunks = [];
        // Used to accurately process timestamps. 
        this.time_precision = pipeline?.processor.feature_extractor.config.chunk_length / pipeline.model.config.max_source_positions;
        this.processed_chunks = [];
        this.callbackFunctionCounter = 0;
    }

    // Send a message to the main thread when transcription is completed. 
    sendeFinalResult() {
        self.postMessage({ type: MessageTypes.INFERENCE_DONE })
    }

    // Handels chunk processing, storing and formatting each chunk. It uses the ASR to tokenizer to extract text and timestamps for the audio and sends a createResultMessage.
    // This function processes transcription data but only every 10 calls. When it does, it select the most confident transcription (bestBeam), decodes it, and sends an interime transcription result back to the main application. This approach makes the transcription appear responsive without overwhelming the system with too many updates.
    callbackFunction(beams) {
        // Counter used to track how many times the function has been called. This helps in limiting how often intermediate results are generated to avoid excessive updates. 
        this.callbackFunctionCounter += 1;
        // The callbackFunction only processes every 10th call. This thrittling mechanism reduces how often the functino runs, improving efficienty and reducing message frequency.
        if (this.callbackFunctionCounter % 10 !== 0) {
            return;
        }

        // beams is an array of "beams", each representing a potential transcription candidate.
        // bestBeam refers to the first item, which is assumed to be the highest-confidence result.
        const bestBeam = beams[0];
        // bestBeam.output_token_ids: contains a sequence of token IDs representing the transcribed text.
        // this.pipeline.tokenizer.decode(...): converts these token IDs into human-readable text.
        // skip_special_tokens: true: removes any tokens used for special purposes (e.g. sentence boundaries) from the decoded output.
        let text = this.pipeline.tokenizer.decode(bestBeam.output_token_ids, {
            skip_special_tokens: true
        })

        // A result object is created with:
        const result = {
            // The decoded transcription text.
            text,
            // The start timestamp of the transcription segment, obtained from this.getLastChunkTimeStamp()
            start: this.getLastChunkTimeStamp(),
            // Left as undefined because it may not be determined yet.
            end: undefined
        }

        // This calls createPartialResultMessage, which sends the partial transcription (result) back to the main thread.
        // The main ap plication can display this interim result to give the user feedback as transcription progresses. 
        createPartialResultMessage(result);
    }
    
    // Processes chunks of audio data and sends timestamped results.
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

    // Returns the timestamp of the last processed chunk.
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