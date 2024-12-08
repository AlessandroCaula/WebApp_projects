import React, { useEffect, useRef } from 'react'
import gsap   

// This component  will be used for the animated text that will be used in different location of our awwward web application. 
// We can make it reusable by passing various element as props to this component. 
const AnimatedTitle = ({ title, containerClass }) => {

  // Define a new useRef hook. And attach it to the container. 
  const containerRef = useRef(null);

  // Define a new useEffect hook, which will allow us to perform some actions whenever things on the page change.
  // In this case we want to make it happen as soon as the page loads. That's why we put leave the dependency array empty []
  useEffect (() => {
    // Within here we can define a gsap context to ensure the animations and selectors are scoped to this instance of a component.
    const ctx = gsap.context(() => {}, containerRef);
  }, []);

  return (
    // The className is wrapped in a template string {`${}`}
    <div
      ref={containerRef} // This allows us to start animating this <div> container
      className={`animated-title ${containerClass}`}
    >
      {/* Split the title based on the <br /> tag */}
      {/* And then we can map over all these pieces of the title, by getting each individual line */}
      {title.split('<br />').map((line, index) => {
        // Return another <div> for each line. 
        <div key={index} className='flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3'>
          {/* Within this we can simply render the line, but also splitting it by spaces and mapping through each individual word */}
          {line.split(' ').map((word, i) => {
            <span key={i} className='animated-word' dangerouslySetInnerHTML={{ __html: word }} />
          })}
        </div>
      })}
    </div>
  )
}

export default AnimatedTitle