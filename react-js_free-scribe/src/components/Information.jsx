import React, { useState, useEffect, useRef } from 'react'
import Transcription from './Transcription'
import Translation from './translation'

export default function Information(props) {
    // Deconstructure the props
    const { output, finished } = props;
    // Define a State
    const [tab, setTab] = useState('transcription');
    // State that will contains the translation of the transcribed audio record. This is done also in order to avoid, every time that we swap tbas between the 
    // Trancription and the Translation we don't want to recreate the translation as we are recreating the component. 
    const [translation, setTranslation] = useState(null);
    const [translating, setTranslating] = useState(null);
    // State variable that stores the language to which we want to translate the text.
    const [toLanguage, setToLanguage] = useState('Select language');

    // !! In React, useRef is often used to create a persistent reference to a value or an object that persists across re-renders without trittering a re-render itself. Defining the Web Worker as a useRef object is a common pattern for the following reasongs:
    // -1 Persistency of the Web Worker: Web Workers are designed to run in the background, performing tasks independently of the main thread. By using useRef, the Web Worker instance persists throughout the component's lifecycle. This means the Web Worker won't be re-initialized on every render, improving performance.
    // -2 Avoid Triggering Re-renders: React re-renders components whenever state (useState) or props change. However, the Web Worker instance doesn’t need to trigger these re-renders. useRef allows the Web Worker instance to exist without causing unnecessary re-renders.
    // -3 When the component using the Web Worker is unmounted, you can clean up the worker to prevent memory leaks. useRef allows easy access to the Web Worker instance to terminate it.
    const worker = useRef()

    useEffect(() => {
        // If the worker does not exists. Create it. 
        if (!worker.current) {
            // Creating a new Web Worker which will run the shisper.worker.js file in the utils folder. 
            worker.current = new Worker(new URL('../utils/translate.worker.js', import.meta.url), {
                type: 'module'
            })
        }

        // Logic to allow us to let the Web Worker and the main app to communicate.
        // Function onMessageReceived to handle messages received from the worker.
        const onMessageReceived = async (e) => {
            // e.data.type represents the type of message sent by the worker. The switch statement responds based on e.data.status of the translation.
            switch (e.data.status) {
                case 'initiate':
                    console.log('DOWNLOADING')
                    break;
                case 'progress':
                    console.log('LOADING')
                    break;
                case 'update':
                    setTranslation(e.data.output)
                    console.log(e.data.output)
                    break;
                case 'complete':
                    setTranslating(false)
                    console.log("DONE")
                    break;
            }
        }
        // addEventListener allows the main app to listen for messages from the worker. 
        // This is the message event. 
        worker.current.addEventListener('message', onMessageReceived)
        // Cleanup function
        return () => worker.current.removeEventListener('message', onMessageReceived)
    })

    // variable that stores whether the tab is on transcribing or translating. 
    const textElement = tab === 'transcription' ? output.map(val => val.text) : translation || ''

    // Create functions for the Copy and Downlaod actions. 
    function handleCopy() {
        // Copy the text of the output.
        navigator.clipboard.writeText(textElement)
    }

    // Downloading the txt file with the transcription of the audio recording. 
    function handleDownload() {
        const element = document.createElement("a")
        // Create a Blob (Binary Large Object) with empty content ([]) and a MIME type of 'text/plain', indicating a plain text file.
        const file = new Blob([textElement], { type: 'text/plain' })
        // The href property of the anchor element is set to a URL created from the file Blob using URL.createObjectURL(file). This provides a temporary URL that points to the Blob data.
        element.href = URL.createObjectURL(file)
        // Setting the File Name. The download attribute specifies the name of the download file.
        element.download = `Freescribe_${new Date().toString()}.txt`
        // Adding the element to the document and triggering the download. 
        // The anchor element is temporarily added to the document so it can be clicked.
        document.body.appendChild(element)
        // The click() method simulates a click on the link, prompting the browser to download the file. 
        element.click()
    }

    // Method passed through the translation component that calls it back when the translate button is clicked.
    function generateTranslation() {
        // If it is translating, or there is no language selected. Just return from the function. 
        if (translating || toLanguage === 'Select language') {
            return
        }

        // Set translating to true.
        setTranslating(true);

        // Otherwise generate the translation. 
        worker.current.postMessage({
            text: output.map(val => val.text),
            // Original language.
            src_lang: 'eng_Latn',
            // Target language
            tgt_lang: toLanguage
        })
    }

    return (
        <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20 max-w-prose w-full mx-auto">
            <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap'>Your <span className='text-blue-400 bold'>Transcription</span></h1>

            {/*Add the two button for the transcription and translation*/}
            <div className='grid grid-cols-2 sm:mx-auto bg-white  rounded overflow-hidden items-center p-1 blueShadow border-[2px] border-solid border-blue-300'>
                {/*Conditionally add some style to the button*/}
                <button onClick={() => setTab('transcription')} className={'px-4 rounded duration-200 py-1 ' + (tab === 'transcription' ? ' bg-blue-300 text-white' : ' text-blue-400 hover:text-blue-600')}>Transcription</button>
                <button onClick={() => setTab('translation')} className={'px-4 rounded duration-200 py-1  ' + (tab === 'translation' ? ' bg-blue-300 text-white' : ' text-blue-400 hover:text-blue-600')}>Translation</button>
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
                <button onClick={handleCopy} title="Copy" className='bg-white  hover:text-blue-500 duration-200 text-blue-300 px-2 aspect-square grid place-items-center rounded'>
                    <i className="fa-solid fa-copy"></i>
                </button>
                <button onClick={handleDownload} title="Download" className='bg-white  hover:text-blue-500 duration-200 text-blue-300 px-2 aspect-square grid place-items-center rounded'>
                    <i className="fa-solid fa-download"></i>
                </button>
            </div>


        </main>
    )
}
