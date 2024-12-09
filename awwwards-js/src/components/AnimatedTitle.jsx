import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

// This component  will be used for the animated text that will be used in different location of our awwward web application. 
// We can make it reusable by passing various element as props to this component. 
const AnimatedTitle = ({ title, containerClass }) => {

  // Define a new useRef hook. And attach it to the container. 
  const containerRef = useRef(null);

  // Define a new useEffect hook, which will allow us to perform some actions whenever things on the page change.
  // In this case we want to make it happen as soon as the page loads. That's why we put leave the dependency array empty []
  // Now we use a React's useEffect hook to set up a GSAP animation that triggers when the page loads and interacts with an element (referred to as containerRef) based on the user's scroll position.
  useEffect(() => {
    // Within here we can define a gsap context to ensure the animations and selectors are scoped to this instance of a component.
    // gsap.context => Scopes GSAP animations to ensure they are tied to this specific component. This is helpful for cleanup when the component unmounts or re-renders. 
    const ctx = gsap.context(() => {
      // We can now create some animation and timeline animation within this context.
      // gsapTimeline => Creates a sequence of animations that run in order and can be synchronized. 
      const titleAnimation = gsap.timeline({
        // scrollTrigger => A GSAP plugin that triggers animations based on scroll events. 
        scrollTrigger: {
          // - Scrolling trigger options. 
          trigger: containerRef.current, // The elements that activates the animation. The trigger will happen once we reach the containerRef
          start: '100 bottom', // The animation begins when the element is 100px from the bottom of the viewport. 
          end: 'center bottom', // The animation ends when the element reaches the center of the viewport. 
          toggleActions: 'play none none reverse', // Define the actions to take at the start, end, when scrolling back, and when scrolling back past the start. play => Play the animation forward. none => No action on scroll completion. none => No action on scroll reverse. reverse => Reverse the animation when scrolling back past the start.
        },
      });

      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: 'translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)',
          ease: 'power2.inOut',
          stagger: 0.02,
        },
        0
      );
    }, containerRef); // containerRef => The scope or reference to an element that the animations will be applied to. Usually, this is created using React's useRef. 

    // Cleaning up on unmount the useEffect.
    return () => ctx.revert();
  }, []);

  return (
    // The className is wrapped in a template string {`${}`}
    <div
      ref={containerRef} // This allows us to start animating this <div> container
      className={`animated-title ${containerClass}`}
    >
      {/* Split the title based on the <br /> tag */}
      {/* And then we can map over all these pieces of the title, by getting each individual line */}
      {title.split('<br />').map((line, index) => (
        // Return another <div> for each line. 
        <div
          key={index}
          className='flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3'
        >
          {/* Within this we can simply render the line, but also splitting it by spaces and mapping through each individual word */}
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle