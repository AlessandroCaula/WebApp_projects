import React from 'react'

export default function Homepage(props) {
  // Deconstruct the props passed to the Homepage.
  const {setFile, setAudioStream} = props;
  
  return (
    <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 justify-center text-center pb-20">
        <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>Free<span className='text-blue-400 bold'>Scribe</span></h1>
        <h3 className='font-medium md:text-lg'>Record <span 
        className='text-blue-400'>&rarr;</span> Transcribe <span
        className='text-blue-400'>&rarr;</span> Translate</h3>
        <button className='flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 specialBtn px-4 py-2 rounded-lg'>
            <p className='text-blue-400'>Record</p>
            <i className="fa-solid fa-microphone"></i>
        </button>
        {/*Or upload your file. It can only accept mp3 or wave recording files*/}
        {/*- <input> element: which is often used for taking user input, such as text or file uploads.
        - 'hidden' class; is typically used to make an element invisible on the page.
        - type='file': this attribute changes the input into a file upload field, allowing users to select files from their device when the input is shown.*/}
        {/*In the input class we are gonna set the onChange event to handle the file upload and set the setFile useState variable.*/}
        <p className='text-base'>Or <label className='text-blue-400 cursor-pointer hover:text-blue-600 duration-200'>upload <input onChange={(e) => {
          // Retrieve the selected file.
          const tempfile = e.target.files[0];
          // Set the file to the setFile useState variable.
          setFile(tempfile);
        }} className='hidden' type='file' accept='.mp3,.wave' /></label> a mp3 file</p>
        <p className='italic text-slate-500'>Free now Free forever</p>
    </main>
  )
}
