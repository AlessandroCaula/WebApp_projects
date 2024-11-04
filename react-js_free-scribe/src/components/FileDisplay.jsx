import React from 'react'

export default function FileDisplay(props) {
    // Deconstruct the props 
    const {file, audioStream, handleAudioReset} = props;

    return (
        <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center text-center pb-20">
            <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl'>Your <span className='text-blue-400 bold'>File</span></h1>
            <div className='mx-auto flex flex-col text-left'>
                <h3 className='font-semibold'>Name</h3>
                <p>{file.name}</p>
            </div>
            <div className='flex items-center justify-between gap-4'>
                <button className='text-slate-400 '>Reset</button>
                <button className='specialBtn'></button>
            </div>
        </main>
    )
}
