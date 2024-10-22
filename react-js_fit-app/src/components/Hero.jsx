import React from 'react'

// The advantage of JSX is that it allows to have JavaScript written inside the HTML code. 
// Funciton Component. It always have the same name of the file. It always start with a capital letter. 
export default function Hero() {
  return (
    // min-h-screen ensures that the elemnt's minimum height is as tall as the browser window. If the content inside the element is shorter than the screen, the element will still fill the entier heigth of the screen. If the content is longer, the element will grow accordingly.
    <div className='min-h-screen flex flex-col gap-10 items-center justify-center text-center max-w-[800px] w-full mx-auto p-4'>
      <div className='flex flex-col gap-4'>
        {/* <p>IT'S TIME TO GET</p> */}
        {/*the <span> tag is used to group inline elements or text. It doesn't inherently apply any styling or layout behavior on its own, but it serves as a generic container that you can target with CSS or manipulate with JavaScript.*/}
        {/* <h1 className='uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl'>Gige<span className='text-blue-400'>normous</span></h1> */}
        <img className='w-[500px]' src='\SWOLE_Home_2.svg' />
      </div>
      <p className='text-sm md:text-base font-light'>I hereby acknowledge that I may become so <span className='text-blue-400 font-medium'>comically massive</span>, my reflection will need a panoramic mode. I accept the risks of developing a neck as wide as my social circle, doors as mortal enemies, and the constant fear of being mistaken for a <span className='text-blue-400 font-medium'>walking protein shake</span></p>
      <button className='px-8 py-4 rounded-md border-[2px] bg-slate-950 border-blue-400 border-solid blueShadow duration-200'>
        <p>Accept & Begin</p>
      </button>
    </div>
  )
}