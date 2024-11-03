import React from 'react'

export default function Header() {
    return (
        <header className="flex items-center justify-between gap-4 p-4">
            <h1 className='font-semibold'>Free<span className="text-blue-400 bold">Scribe</span></h1>
            {/*Givint the specialBtn class for styling this button*/}
            <button className="flex items-center gap-2 specialBtn px-4 py-2 rounded-lg text-blue-400">
                <p>New</p>
                <i className="fa-solid fa-plus"></i>
            </button>
        </header>
    )
}
