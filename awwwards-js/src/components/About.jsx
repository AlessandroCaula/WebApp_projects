import React from 'react'

const About = () => {
  

  return (
    <div
      id='about'
      // min-h-screen w-screen => In this way it will take the full high and width of the screen.
      className='min-h-screen w-screen border border-red-700'
    >
      {/* The 'relative' positioning is essential when you want to position child elements relative to the element itself 
      When an element is positioned relative, it means that you can use the top, right, bottom, or left properties to adjust the position of the element relative to irs normal static position */}
      <div className='relative mb-8 mt-36 flex flex-col items-center gap-5 border border-blue-900'>
        <h2 className='font-general text-sm uppercase md:text-[10px]'> welcome to Zentry</h2>

        <div className='mt-5 text-center text-4xl uppercase leading-[0.8] md:text-[6rem] border border-violet-300'>
          Disc<b>o</b>ver the world's <br /> l<b>a</b>rgest shared adventure
        </div>

        <div className='about-subtext'> {/* The about-subtext is a special class defined in the index.css file */}
          <p>The Game of Games begins-you life now an epic MMORPG </p>
          <p>Zentry unites every player from countless games and platforms. </p>
        </div>
      </div>
      {/* h-dvh => Sets the element's height to the dynamic viewport height, considering browser interface elements */}
      <div id='clip' className='h-dvh w-screen'>
        <div className='mask-clip-path about-image'> {/* Both the mask-clip-path and about-image are custom classes */}
          <img 
            src='img/about.webp'
            alt='Background'
            className='absolute left-0 top-0 size-full object-cover'
          />
        </div>
      </div>
    </div>
  )
}

export default About