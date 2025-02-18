import React from 'react'

export default function Header() {
    return (
        <header className="flex items-center justify-between gap-4 p-4">
            {/*The <a> tage represents an anchor element, which is used to create hyperlinks.*/}
            {/*These hyperlinks allow users to navigate to other web pages, jump to a different sectino of the same page, or initiate a download.*/}
            {/*The href='/' creates a linkn that navigates to the root directory of the website.*/}
            {/*This is done when the "New +" "button" is cilcked. Everything is reset. The page refresh.*/}
            <a href='/'><h1 className='font-semibold'>Free<span className="text-blue-400 bold">Scribe</span></h1></a>
            {/*Givint the specialBtn class for styling this button*/}
            <a href='/' className="flex items-center gap-2 specialBtn px-3 text-sm py-2 rounded-lg text-blue-400">
                <p>New</p>
                <i className="fa-solid fa-plus"></i>
            </a>
        </header>
    )
}
