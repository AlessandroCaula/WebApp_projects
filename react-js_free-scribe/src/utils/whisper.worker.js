// The Web Worker. 
import {pipeline} from '@xenova/transformers'
import { MessageTypes } from './presets';

class MyTranscriptionPipeline {
    static task = 'automatic-speech-recognition';
    static mode = 'openai/whisper-tiny.en';
    static instance = null;

    // This function is important, cause it's how we are going to communicate with our main function. 
    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, null, {progress_callback});
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
    const {type, audio} = event.data;
    // If the message is from an INFERENCE_REQUEST.
    if (type === MessageTypes.INFERENCE_REQUEST) {
        await transcribe(audio);
    }
});

async function transcribe(audio) {
    sendLoadingMessage('loading');

    let pipeline;

    // try {
    //     pipeline = await MyTranscriptionPipeline.
    // }
}