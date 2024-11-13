import { useState, useRef, useEffect } from "react"
import Header from "./components/Header"
import FileDisplay from "./components/FileDisplay"
import HomePage from "./components/Homepage"
import Information from "./components/Information"
import Transcribing from "./components/Transcribing"
import { MessageTypes } from "./utils/presets"

function App() {
    // useState variables
    // The file state exist when we upload a file.
    const [file, setFile] = useState(null);
    // The audioStream exist when we click record button and have a recorderd audio.
    const [audioStream, setAudioStream] = useState(null);
    // The transcribed useState Hook variable final output
    const [output, setOutput] = useState(null);
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    // State variable for the transcription.
    const [finished, setFinished] = useState(false);

    // Boolean check to see if there exist an audio available, both file or audioStream file.
    const isAudioAvailable = file || audioStream;

    // Define a function to reset the audio. Set the files and the audioStream state variables to null. 
    function handleAudioReset() {
        setFile(null);
        setAudioStream(null);
    }

    // // Since the audioStream is not updated when start and stop recording are executed in the HomePage, and the FileDisplayed is not rendered (since the audioStream is not updated) we will use a useEffect Hook.
    // useEffect(() => {
    //     console.log(audioStream);
    // }, [audioStream])

    // Creating a worker reference. We will let the ML code for the transcription to work in the background.
    const worker = useRef(null)

    // This code sets up a Web Worker to handle background tasks for transcription without blocking the main UI
    // The useEffect hook is used to run code after the component renders.
    // This code enables efficient, non-blocking transcription by offloading processing to a Web Worker, using onMessageReceived to handle the worker's messages. This setup helps to keep the app responsive, especially for tasks like transcriprion that can be resource-demanding. 
    useEffect(() => {
        // If the worker does not exists. Create it. 
        if (!worker.current) {
            // Creating a new Web Worker which will run the shisper.worker.js file in the utils folder. 
            worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url), {
                type: 'module'
            })
        }
        // Logic to allow us to let the Web Worker and the main app to communicate.
        // Function onMessageReceived to handle messages received from the worker.
        const onMessageReceived = async (e) => {
            // e.data.type represents the type of message sent by the worker. The switch statement responds based on e.data.type.
            switch (e.data.type) {
                // Indicating a downloading has started.
                case 'DOWNLOADING':
                    setDownloading(true)
                    console.log('DOWNLOADING')
                    break;
                // Indicates that the app is loading some resources.
                case 'LOADING':
                    setLoading(true)
                    console.log('LOADING')
                    break;
                // Updating the app with the transcription results received from the worker by setting setOutput(e.data.results).
                case 'RESULT':
                    setOutput(e.data.results)
                    console.log(e.data.results)
                    break;
                // Signals that the transription or processing is finished. 
                case 'INFERENCE_DONE':
                    setFinished(true)
                    console.log("DONE")
                    break;
            }
        }
        // addEventListener allows the main app to listen for messages from the worker. 
        // This is the message event. 
        worker.current.addEventListener('message', onMessageReceived)

        // Cleanup function
        return () => worker.current.removeEventListener('message', onMessageReceived)
    });

    // Function to get the audio buffer from the file or the transcription. 
    // This function reads audio from a file, decodes it, and returns the audio data in a specific format.
    // This method, takes a file, reads it as an audio array, decodes it, and returns the audio data in a format that can be easily processed.
    async function readAudioFrom(file) {
        const sampling_rate = 16000; // 1600;
        // An AudioContext is created with this sampling, rate, allowing for audio processing. AudioContext is a part of the Web Audio API used for creating and managing audio content. 
        const audioCTX = new AudioContext({ sampleRate: sampling_rate });
        // The file.arrayBuffer() method reads the file  data as an ArrayBuffer. This buffer is a low-level representation of binary data, which is easier to process and decode. 
        const response = await file.arrayBuffer();
        // audioCTX.decodeAudioData(response) decodes the buffer data into audio samples that the AudioContext can work with, converting it to a formati usable by the Web Audio API.
        const decoded = await audioCTX.decodeAudioData(response)
        // The getChannelData(0) method extracts the audio data for a single channels (in this case the first channel or the left channel if it is stereo.)
        // getChannelData returns the audio data as a Float32Array, which is an array of 32-bit floating-point values representing audio sample amplitudes over time.
        const audio = decoded.getChannelData(0)
        return audio
    }

    // This function initiates the transcription process by reading audio data from an uploaded file or a live audio stream, then sends it to a Web Worker for processing. 
    // In short, this function prepares the audio data and sends it, along with the model name, to the Web Worker. The worker will then handle the transcription in the background. This design keeps the main thread responsive by offloading the transcription work to a separate thread, which avoids blocking the UI.
    async function handleFormSubmission() {
        // Checks if there is a file or an audioStream to process. 
        if (!file && !audioStream) { return }

        // The readAudioFrom function (from your previous code) is called with either the file or audioStream, whichever is available.
        let audio = await readAudioFrom(file ? file : audioStream);
        // This specifies the model name, openai/whisper-tiny.en, which could be a version of OpenAI's Whisper model fine-tuned for English transcription.
        const model_name = `openai/whisper-tiny.en`

        // Sends a message to the Web Worker, asking it to start processing. 
        worker.current.postMessage({
            // The type of message sent, which likely tells the worker to start an inference (transcription) task.
            type: MessageTypes.INFERENCE_REQUEST,
            // The audio data in a format that the worker can process.
            audio,
            // The model name, instructing the worker on which transcription model to use.
            model_name
        })
    }

    return (
        <div className="flex flex-col max-w-[1000px] mx-auto w-full">
            {/*"min-h-screen" will apply the background color defined in the index.html to the entier page*/}
            <section className="min-h-screen flex flex-col">
                {/*Rendering out the HFeader*/}
                <Header />
                {/*Logic for the page component rendering of the page (which one to show based on what data is available*/}
                {/*Conditionally render when the output exists. The we render out the Information component. This is the first thing ot chek in the rendering of the page. Otherwise, we end up rendering the other component, even if the final output exist. That's why we check it first*/}
                {/*If it does not exist we are going to check if loading exist. If it exists, we are going to render out Transcribing.*/}
                {/*If also the Transcribing does not exist, we are going to finally renering the FileDisplay or the HomePage.*/}
                {output ? (
                    <Information output={output} />
                ) : loading ? (
                    <Transcribing />
                ) : isAudioAvailable ? (
                    // Passing down the file or the audioStream file as well as the handleAudioReset function.
                    <FileDisplay handleFormSubmission={handleFormSubmission} file={file} audioStream={audioStream} handleAudioReset={handleAudioReset} />
                ) : (
                    // We are gonna pass the setFile and setAudioStream State variables down the Homepage component as a props.
                    <HomePage setFile={setFile} setAudioStream={setAudioStream} />
                )}
            </section>
            <footer></footer>
        </div>
    )
}

export default App
