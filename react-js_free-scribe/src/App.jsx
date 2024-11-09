import { useState, useEffect } from "react"
import Header from "./components/Header"
import FileDisplay from "./components/FileDisplay";
import HomePage from "./components/Homepage";
import Information from "./components/Information";
import Transcribing from "./components/Transcribing";

function App() {
    // useState variables
    // The file state exist when we upload a file.
    const [file, setFile] = useState(null);
    // The audioStream exist when we click record button and have a recorderd audio.
    const [audioStream, setAudioStream] = useState(null);
    // The transcribed useState Hook variable final output
    const [output, setOutput] = useState(null);
    const [loading, setLoading] = useState(false);

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
