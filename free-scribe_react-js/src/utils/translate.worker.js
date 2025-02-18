// Translating Web Worker. 
// pipeline: Is a function from the @xenova/transformers library that initializes a specific pipeline (like tranlsation, summarization, etc.) using a pre-trained machine learning model.
import { pipeline } from '@xenova/transformers'

env.allowLocalModels = false;

// GET INSTANCE METHOD
// This class manages the translation pipeline to avoid repeatedly loading the model, saving time and resources. 
class MyTranslationPipeline {
    // task: defines the type of task as translation.
    static task = 'translation';
    // model: Points to the Xenova/nllb-200-distilled-600M translation model.
    static model = 'Xenova/nllb-200-distilled-600M';
    // Stores the initialized pipeline instance for reuse.
    static instance = null;

    // Creates or retireves a singleton instance of the pipeline. 
    static async getInstance(progress_callback = null) {
        // Check if this.instance is null (no pipeline instance exists)
        if (this.instance === null) {
            // Calls the pipeline function to initialize the translation pipeline with:
            // - The specified task (translation).
            // - Optional progress_callback to report loading progress.
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }
        // Stores the created instance in this.instance for reuse.
        return this.instance;
    }
}

// EVENT LISTENER FOR MESSAGES
// Listens for messages from the main thread and performs tranlation based on received data. 
self.addEventListener('message', async (event) => {
    // Uses getInstance to initialize (or retrieve) the translation pipeline.
    // The progress_callback (x => self.postMessage(x)) sends model-loading progress updates back to the main thread via self.postMessage.
    let translator = await MyTranslationPipeline.getInstance(x => {
        self.postMessage(x)
    })
    console.log(event.data)

    // TRANSLATION EXECUTION
    // Performs the actual tranlation. 
    // Input for the event.data:
    //  - text: The input text to be tranlated.
    let output = await translator(event.data.text, {
        // - tgt_lang: the target language for translation
        tgt_lang: event.data.tgt_lang,
        // - src_lang: The source language of the input text
        src_lang: event.data.src_lang,
        
        // Calls the pipeline's translation method. The callback_function sends intermediate translation updates to the main thread.
        callback_function: x => {
            self.postMessage({
                status: 'update',
                // Intermediate translation: skip_special_tokens ensures unnecessary tokens (like control markers) are excluded.
                output: translator.tokenizer.decode(x[0].output_token_ids, { skip_special_tokens: true })
            })
        }
    })

    // FINAL OUTPUT
    // Sends the completed translation result back to the main thread. 
    // Status: Indicates tranlation completion. 
    // ouput: Contains the final tranlated text. 
    self.postMessage({
        status: 'complete',
        output
    })
})

// Key features of the Web Worker
// 1. Asynchronous Processing:
//      - Uses await to handle potentially long-running operations without blocking other tasks.
// 2. Intermediate Updates:
//      - Sends real-time updates during translation to provide partial results.
// 3. Main Thread Communication:
//      - Uses self.postMessages to communicate between the Web Worker and the main thread. 
// 4. Efficiency:
//      - Implements a singleton pattern (MyTranslationPipeline.instance) to reuse the tranlation pipeline and minimize resource usage. 