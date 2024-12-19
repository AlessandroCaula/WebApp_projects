import React from 'react'

// Creating a reusable component for the images, cause in this sections there are a lot of images to use.
const ImageClipBox = () => {
  <div className='contact-clip-path-1'>
    <img
      src='img/contact-1.webp'
    />
  </div>
}


const Contact = () => {
  return (
    <div
      id="contact"
      className='my-20 min-h-96 w-screen px-10'
    >
      <div className='relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden'>
        <div className='absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block ls:left-20 lg:w-96'>

        </div>
      </div>
    </div>
  )
}

export default Contact