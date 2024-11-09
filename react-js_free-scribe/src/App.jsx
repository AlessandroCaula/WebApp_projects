import { useState, useRef, useEffect } from "react"
import Header from "./components/Header"
import FileDisplay from "./components/FileDisplay";
import HomePage from "./components/Homepage";
import Information from "./components/Information";
import Transcribing from "./components/Transcribing";
import { MessageTypes } from "./utils/presets";

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

    // Since the audioStream is not updated when start and stop recording are executed in the HomePage, and the FileDisplayed is not rendered (since the audioStream is not updated) we will use a useEffect Hook.
    useEffect(() => {
        console.log(audioStream);
    }, [audioStream])

    // Creating a worker reference. We will let the ML code for the transcription to work in the background.
    const worker = useRef(null);

    // This code sets up a Web Worker to handle background tasks for transcription without blocking the main UI
    // The useEffect hook is used to run code after the component renders.
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
            switch (e.data.type) {
                case 'DOWNLOADING':
                    setDownloading(true);
                    console.log('DOWNLOADING');
                    break;
                case 'LOADING':
                    setLoading(true);
                    console.log('LOADING');
                    break;
                case 'RESULT':
                    setOutput(e.data.results);
                    break;
                case 'INFERENCE_DONE':
                    setFinished(true);
                    console.log('INFERENCE_DONE');
                    break;
            }
        }
        // This is the message event. 
        worker.current.addEventListener('message', onMessageReceived)

        // Cleanup function
        return () => worker.current.removeEventListener('message', onMessageReceived)
    });

    // Function to get the audio buffer from the file or the transcription. 
    async function readAudioFrom(file) {
        const sampling_rate = 1600;
        const audioCTX = new AudioContext({ sampleRate: sampling_rate });
        const response = await file.arrayBuffer();
        const decoded = await audioCTX.decodeAudioData(response);
        const audio = decoded.getChannelData(0);
        return audio;
    }

    async function handleFormSubmission() {
        if (!file && !audioStream) { return }

        let audio = await readAudioFrom(file ? file : audioStream);
        const model_name = `openai/whisper-tiny.en`

        worker.current.postMessage({
            type: MessageTypes.INFERENCE_REQUEST, 
            audio, 
            model_name
        });
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
                    <Information />
                ) : loading ? (
                    <Transcribing />
                ) : isAudioAvailable ? (
                    // Passing down the file or the audioStream file as well as the handleAudioReset function.
                    <FileDisplay file={file} audioStream={audioStream} handleAudioReset={handleAudioReset} />
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
