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
    // Call the sendLoadingMessage to update the main thread on the transcription's loading state. 
    sendLoadingMessage('loading');

    let pipeline;

    try {
        pipeline = await MyTranscriptionPipeline.getInstance(load_model_callback)
    } catch (err) {
        console.log(err.message);
    }

    sendLoadingMessage('success');

    const stride_length_s = 5;

    const generationTracker = new GenerationTracker(pipeline, stride_length_s);

    await pipeline(audio, {
        top_k: 0,
        do_sample: false,
        chunk_length: 30,
        stride_length_s,
        return_timestamps: true,
        callback_function: generationTracker.callbackFunction.bind(generationTracker),
        chunk_callback: generationTracker.bind(generationTracker)
    })

    generationTracker.sendFinalResult();
}


async function load_model_callback(data) {
    const { status } = data;

    if (status === 'progress') {
        const { file, progress, loaded, total } = data;
        sendDownloadingMessage(file, progress, loaded, total);
    }
}

function sendLoadingMessage(status) {
    self.postMessage({
        type: MessageTypes.LOADING,
        status
    });
}

async function sendDownloadingMessage(file, progress, loaded, total) {
    self.postMessage({
        type: MessageTypes.DOWNLOADING,
        file,
        progress,
        loaded,
        total,
    })
}


class GenerationTracker {

    // Class constructor.
    constructor(pipeline, stride_length_s) {
        this.pipeline = pipeline;
        this.stride_length_s = stride_length_s;
        this.chunks = [];
        this.time_precision = pipeline?.processor.feature_extractor.config.chunk_length / pipeline.model.config.max_source_positions;
        this.processed_chunks = [];
        this.callbackFunctionCounter = 0;
    }

    sendeFinalResult() {
        self.postMessage({ type: MessageTypes.INFERENCE_DONE })
    }

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

function createResultMessage(result, isDone, completedUntilTimestamp) {
    self.postMessage({
        type: MessageTypes.RESULT,
        result, 
        isDone, 
        completedUntilTimestamp
    })
}

function createPartialResultMessage(result) {
    self.postMessage({
        type: MessageTypes.RESULT_PARTIAL,
        result
    })
}