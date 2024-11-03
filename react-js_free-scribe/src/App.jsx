import { useState } from "react"
import Header from "./components/Header"
import Homepage from "./components/Homepage"

function App() {
  // useState variables
  // The file state exist when we upload a file.
  const [file, setFile] = useState(null);
  // The audioStream exist when we click record button and have a recorderd audio.
  const [audioStream, setAudioStream] = useState(null);
  // Boolean check to see if there exist an audio available, both file or audioStream file.
  const isAudioAvailable = file || audioStream;
  
  return (
    <div className="flex flex-col max-w-[1000px] mx-auto w-full">
      {/*"min-h-screen" will apply the background color defined in the index.html to the entier page*/}
      <section className="min-h-screen flex flex-col">
        {/*Rendering out the Header*/}
        <Header />
        {/*Rendering out the Home page*/}
        {/*Add some conditional logic*/}
        {/* {boolCheck ? () : (<Homepage />)} */}
        <Homepage />
      </section>
      <h1 className="text-green-400">TEST</h1>
      <footer>
      </footer>
    </div>
  )
}

export default App
