import { useState } from "react"
import Header from "./components/Header"
import HomePage from "./components/HomePage"
import FileDisplay from "./components/FileDisplay";

function App() {
  // useState variables
  // The file state exist when we upload a file.
  const [file, setFile] = useState(null);
  // The audioStream exist when we click record button and have a recorderd audio.
  const [audioStream, setAudioStream] = useState(null);
  // Boolean check to see if there exist an audio available, both file or audioStream file.
  const isAudioAvailable = file || audioStream;
  
  // Define a function to reset the audio. Set the files and the audioStream state variables to null. 
  function handleAudioReset() {
    setFile(null);
    setAudioStream(null);
  }

  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      {/*"min-h-screen" will apply the background color defined in the index.html to the entier page*/}
      <section className="min-h-screen flex flex-col">
        {/*Rendering out the Header*/}
        <Header />
        {/*Rendering out the Home page*/}
        {/*Add some conditional logic. If there exists any type of audio (file or audioStream) we are gonna rendere out the FileDisplay component. Otherwise we are gonna render out the Homepage component*/}
        {isAudioAvailable ? (
          // Passing down the file or the audioStream file as well as the handleAudioReset function.
          <FileDisplay file={file} audioStream={audioStream} handleAudioReset={handleAudioReset} />
        ) : (
          // We are gonna pass the setFile and setAudioStream State variables down the Homepage component as a props.
          <HomePage setFile={setFile} setAudioStream={setAudioStream} />
        )}
      </section>
      <h1 className="text-green-400">TEST</h1>
      <footer>
      </footer>
    </div>
  )
}

export default App
