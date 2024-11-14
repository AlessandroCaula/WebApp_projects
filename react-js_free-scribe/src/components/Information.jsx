import React, { useState } from 'react'
import Transcription from './Transcription';
import Translation from './translation';

export default function Information(props) {
  // Deconstructure the props
  const { output } = props;
  // Define a State
  const [tab, setTab] = useState('transcription');
  // State that will contains the translation of the transcribed audio record. This is done also in order to avoid, every time that we swap tbas between the 
  // Trancription and the Translation we don't want to recreate the translation as we are recreating the component. 
  const [translation, setTranslation] = useState(null);
  const [translating, setTranslating] = useState(null);
  // State variable that stores the language to which we want to translate the text.
  const [toLanguage, setToLanguage] = useState('Select language');


  // Create functions for the Copy and Downlaod actions. 
  function handleCopy() {
    // Copy the text of the output.
    navigator.clipboard.writeText()
  }

  // Downloading the txt file with the transcription of the audio recording. 
  function handleDownload() {
    const element = document.createElement('a');
    // Create a Blob (Binary Large Object) with empty content ([]) and a MIME type of 'text/plain', indicating a plain text file.
    const file = new Blob([], { type: 'text/plain' });
    // The href property of the anchor element is set to a URL created from the file Blob using URL.createObjectURL(file). This provides a temporary URL that points to the Blob data.
    element.href = URL.createObjectURL(file);
    // Setting the File Name. The download attribute specifies the name of the download file.
    element.download(`Freescribe_${(new Date()).toDateString()}.txt`);
    // Adding the element to the document and triggering the download. 
    // The anchor element is temporarily added to the document so it can be clicked.
    document.body.appendChild(element);
    // The click() method simulates a click on the link, prompting the browser to download the file. 
    element.click();
  }

  // Method passed through the translation component that calls it back when the translate button is clicked.
  function generateTranslation() {
    console.log('language');
    console.log(toLanguage);
  }

  // variable that stores whether the tab is on transcribing or translating. 
  const textElement = tab === 'transcription' ? output.map(val => val.text) : null;

  return (
    <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20 max-w-prose w-full mx-auto">
      <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap'>Your <span className='text-blue-400 bold'>Transcription</span></h1>

      {/*Add the two button for the transcription and translation*/}
      <div className='grid grid-cols-2 mx-auto bg-white shadow rounded-full overflow-hidden items-center'>
        {/*Conditionally add some style to the button*/}
        <button onClick={() => setTab('transcription')} className={'px-4 duration-200 py-1' + (tab === 'transcription' ? ' bg-blue-300 text-white' : ' text-blue-400 hover:text-blue-600')}>Transcription</button>
        <button onClick={() => setTab('translation')} className={'px-4 duration-200 py-1' + (tab === 'translation' ? ' bg-blue-300 text-white' : ' text-blue-400 hover:text-blue-600')}>Translation</button>
      </div>

      <div className='my-8 flex flex-col'>
        {/*Conditionally render the transcription or translation component*/}
        {tab === 'transcription' ? (
          // Spreading the props and passing them down to the Transcription component.
          <Transcription {...props} textElement={textElement} />
        ) : (
          <Translation {...props} textElement={textElement} toLanguage={toLanguage} translating={translating} setToLanguage={setToLanguage} generateTranslation={generateTranslation} />
        )}
      </div>

      {/*Adding the downloading buttons*/}
      <div className='flex items-center gap-4 mx-auto'>
        {/*Givin the title to the button, when you hover it with the mouse you will see the title of the button*/}
        <button title="Copy" className='bg-white px-2 aspect-square grid place-items-center text-blue-300 rounded hover:text-blue-500 duration-200'>
          <i className="fa-solid fa-copy"></i>
        </button>
        <button title="Download" className='bg-white px-2 aspect-square grid place-items-center text-blue-300 rounded hover:text-blue-500 duration-200'>
          <i className="fa-solid fa-download"></i>
        </button>
      </div>


    </main>
  )
}
