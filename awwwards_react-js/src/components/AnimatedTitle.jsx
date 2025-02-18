import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

// This component  will be used for the animated text that will be used in different location of our awwward web application. 
// We can make it reusable by passing various element as props to this component. 
const AnimatedTitle = ({ title, containerClass }) => {

  // Define a new useRef hook. And attach it to the container. 
  // ContainerRef is a reference created using the useRef hook in React. It provides a way to directly access the DOM element associated with the React component. 
  // - useRef(null): Initializes the reference with a null value. This is because the DOM element isn't available yet during the initial render. When the component mounts, React updates containerRef.current to point to the actual DOM node of the <div> element that has the ref={containerRef} attribute.
  // Why is containerRef used? To target the DOM element for animation:
  //  - GSAP animations are applied to real DOM elements. 
  //  - React abstracts away direct DOM manipulation, so you can't access the DOM directly in the React component without using a ref.
  //  - containerRef.current => Gives GSAP direct access to the DOM element so it can trigger animations on it.
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
        // scrollTrigger => A GSAP plugin that triggers animations based on scroll events. This means the animation will activate when the containerRef element comes into view. 
        scrollTrigger: {
          // - Scrolling trigger options. 
          trigger: containerRef.current, // The elements that activates the animation. The trigger will happen once we reach the containerRef
          start: '100 bottom', // The animation begins when the element is 100px from the bottom of the viewport. 
          end: 'center bottom', // The animation ends when the element reaches the center of the viewport. 
          toggleActions: 'play none none reverse', // Define the actions to take at the start, end, when scrolling back, and when scrolling back past the start. play => Play the animation forward. none => No action on scroll completion. none => No action on scroll reverse. reverse => Reverse the animation when scrolling back past the start.
        },
      });

      // The to() method defines an animation that modifies the specified properties of the target elements over time. 
      titleAnimation.to(
        // Target: ".animated-word" => This is a CSS selector that specifies which elements should be animated. In this case, it targets all elements with the class .animated-word.
        ".animated-word",
        // This second argument is an object that specifies the properties to animate and their final values. 
        {
          opacity: 1, // Makes the element fully visible by animating its opacity from its current value to 1. 
          transform: 'translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)', // This resets the position and rotation of the elements. translate(0, 0, 0) => Moves the element to its original position in 3D space (no offset in X, Y or Z axis). rotateY(0deg) rotateX(0deg) => Ensure the element is not rotated around the Y or X axis. 
          ease: 'power2.inOut', // inOut => creates a smooth effect where the animation starts slowly, speeds up in the middle, and slows down at the end. 
          stagger: 0.02, // Creates a delay of 0.02 seconds between animations for each .animated-word. This results in a "staggered" or sequential animation effect, where words animate one after the other. 
        },
        0 // This third argument specifies where in the timeline this animation should start. 
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