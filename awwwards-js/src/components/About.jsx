import { useGSAP } from '@gsap/react'
import React from 'react'
import AnimatedTitle from './AnimatedTitle'
import gsap from 'gsap'
// Register the plugin for scrolling,
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger);

const About = () => {

  // In order to animate the About image we will use the gsap hook.
  useGSAP(() => {
    // the gsap.timeline => is a utility in GSAP for creating and sequencing multiple animations in a controlled timeline. It allows to: - Chain animations together in a specific order. - Control the entire sequence as one unit (e.g. play, pause, reverse, etc.) - Use relative or absolute timings for precise control.
    // 1. Sequential animation: Animations are automatically queued one after another by default. 
    // 2. Overlap: You can overlap animations using offset.
    // 3. Easing and Callbacks: Supports easing functions and callback methods like onStart, onComplete, etc.
    // 4. Labels: Add labels for easier control and navigation. 
    // In this case we are using timeline cause it will allow us to more precisely create a Trigger, a Start and an End.
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        // We are gonna trigger it once the user reaches the clip (which will be the part with the image down here)
        trigger: '#clip',
        start: 'center center', // Define the start of the trigger
        end: '+=800 center', // Define the end of the trigger. It will trigger 800 pixels after it passes the center.
        scrub: 0.5, // Defines how we are moving through the animation on scroll.
        pin: true,
        pinSpacing: true,
      }
    })

    clipAnimation.to('.mask-clip-path', {
      width: '100vw',
      height: '100vh',
      borderRadius: 0
    })
  }) 

  return (
    <div
      id='about'
      // min-h-screen w-screen => In this way it will take the full high and width of the screen.
      className='min-h-screen w-screen'
    >
      {/* The 'relative' positioning is essential when you want to position child elements relative to the element itself 
      When an element is positioned relative, it means that you   can use the top, right, bottom, or left properties to adjust the position of the element relative to irs normal static position */}
      <div className='relative mb-8 mt-36 flex flex-col items-center gap-5'>
        <h2 className='font-general text-sm uppercase md:text-[10px]'> welcome to Zentry</h2>

        {/* Passing the title as a string to the AnimatedTitle component */}
        <AnimatedTitle 
          title="Disc<b>o</b>ver the world's <br /> l<b>a</b>rgest shared adventure" 
          containerClass="mt-5 !text-black text-center"  
        />

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