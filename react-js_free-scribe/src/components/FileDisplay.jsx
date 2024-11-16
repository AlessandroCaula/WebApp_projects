import React, { useRef, useEffect } from 'react'

export default function FileDisplay(props) {
    // Deconstruct the props 
    const { handleAudioReset, file, audioStream, handleFormSubmission } = props
    const audioRef = useRef()

    // Use useEffect hook that dynamically sets the source (src) of an audio element depending on whther a file or an audioStram is available.
    useEffect(() => {
        if (!file && !audioStream) { return }
        if (file) {
            console.log('HERE FILE', file)
            audioRef.current.src = URL.createObjectURL(file)
        } else {
            console.log('HERE AUDIO', audioStream)
            audioRef.current.src = URL.createObjectURL(audioStream)
        }
        return () => {
            if (audioRef.current?.src) {
                URL.revokeObjectURL(audioRef.current.src);
            }
        };
    }, [audioStream, file])

    return (
        <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20 w-72 sm:w-96 max-w-full mx-auto">
            <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl'>Your <span className='text-blue-400 bold'>File</span></h1>
            <div className='flex flex-col text-left my-4'>
                <h3 className='font-semibold'>Name</h3>
                <p>{file ? file.name : 'Custom audio'}</p>
            </div>
            <div className='flex flex-col mb-2'>
                <audio ref={audioRef} className='w-full' controls>
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div className='flex items-center justify-between gap-4'>
                <button onClick={handleAudioReset} className='text-slate-400 hover:text-blue-600'>Reset</button>
                {/*Assign to the transcribe button, onClick, the handleFormSubmission function.*/}
                <button onClick={handleFormSubmission} className='specialBtn px-3 p-2 rounded-lg text-blue-400 flex items-center gap-2 font-medium'>
                    {/*In order to add an icon (from Fontawesome) in the button, near the Transcribe text, put the text in a paragraph <p></p>*/}
                    <p>
                        Transcribe
                    </p>
                    <i className="fa-solid fa-pen-nib"></i>
                </button>
            </div>
        </main>
    )
}
