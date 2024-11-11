// The Web Worker. 
import { pipeline } from '@xenova/transformers'
import { MessageTypes } from './presets';

class MyTranscriptionPipeline {
    static task = 'automatic-speech-recognition';
    static mode = 'openai/whisper-tiny.en';
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


self.addEventListener('message', async (event) => {
    const { type, audio } = event.data;
    // If the message is from an INFERENCE_REQUEST.
    if (type === MessageTypes.INFERENCE_REQUEST) {
        await transcribe(audio);
    }
});

async function transcribe(audio) {
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
        self.postMessage({type: MessageTypes.INFERENCE_DONE})
    }
}