import { useEffect, useRef, useState } from "react"
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/all";

// gsap scrollTrigger is a plugin that we have to enable it here at the top to be able to use it. 
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // Define some useState variables that will say when a user has clicked something and we also have to keep track of which video is playing.
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  // Setting the isLoading state to true as initial state, caus usually a video takes some time to load.
  const [loading, setLoading] = useState(true);
  // Define another useState for the number of video that has loaded.
  const [loadedVideos, setLoadedVideos] = useState(0);

  // Define the number of total video which you want to play (in this case we are set it to 4)
  const totalVideos = 3;
  // We also have to define the reference which will allow to then switch between those videos or to target the video player within which will play the videos.
  // In react you use the useRef hook to create a reference to a DOM element.
  // The DOM (Document Object Model) is a programming interface for web documents. It represents the structure of a web page as a tree of objects, where each element (like a <div>, <p>, or <img) is a node in the tree. This structure allows programming languages, like JavaScript, to dynamically interact with and manipulate the content, structure, and styling of a webpage.
  // useRef is a React hook used to create a mutable reference object that persists across renders. It provides access to a current property where you can store a value that doesn't trigger a re-render when it changes.
  // We are going to use it to target the <div> within which we want to play the videos.
  const nextVideoRef = useRef(null);

  // Define the function for handle the loadedData.
  const handleVideoLoad = () => {
    // (prevLoadedVideo) => prevLoadedVideo + 1 => is the callback function. 
    // The arrow function ((prevLoadedVideo) => prevLoadedVideo + 1) inside setLoadedVideo works because React's setState function provides an optional function form. This functional form takes a callback function as an argument, and React automatically passes the current state value (or "previous state") as the parameter to this function. 
    // React automatically passes the most recent value of loadedVideos as the argument (prevLoadedVideo) to the arrow function.
    setLoadedVideos((prevLoadedVideo) => prevLoadedVideo + 1);
  }

  // Since there are only 4 videos, we can only try to go up to three but then it is more than that we need to go back to 0 (the first video). This is the perfect use case for the Modulo Operator.
  // The modulo operator (%) returns the remainder of the division of two numbers. 7 % 3 = 1 (3*2 + 1). 15 % 4 = 3 (4*3 + 3).
  // 0 % 4 = 0 then + 1 => 1
  // 1 % 4 = 1 then + 1 => 2
  // 2 % 4 = 2 then + 1 => 3
  // 3 % 4 = 3 then + 1 => 4
  // 4 % 4 = 0 then + 1 => 1 (and then at this point we start from the beginning)
  // In this case, the upcomingVideoIndex variable does not automatically updates itself because it is a regular constant, not tied to React's state system. It is only calculated onces when the component renders. However, when you click the mini video player, the handleMiniVideoClick function triggers a state update (setCurrentIndex), which causes the component to re-render. During this re-render, the upcomingVideoIndex is recalculated because it depends on the update value of currentIndex.
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  // Define some new functions that will handle the mini video player. This video player will show different videos when clicking in the middle of the screen.
  const handleMiniVideoClick = () => {
    // When the mini-player is clicked we want to set the hasClicked state to true.
    setHasClicked(true);
    // We also want to set the currentIndex equal to the upcomingVideoIndex which uses the modulo operator to avoid to go beyond the total number of videos.
    setCurrentIndex(upcomingVideoIndex);
  }

  // useEffect hook used to check if the video has loaded. 
  // Whenever loadedVideo changes this useEffect is recall. And check if loaded video is equal to the total number of videos.
  useEffect (() => {
    if (loadedVideos === totalVideos - 1) {
      //  Set the loading to false
      setLoading(false);
    }
  }, [loadedVideos])

  // Define the source of the videos to be played. As a function that will return the source of the videos, with the index in their name. Givin the path of each video source.
  // In JS, if the function body consists of a single expression, you can omit both the curly braces {} and the return keyword.
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;


  // In order to animate the page, we will take advantage and use the GSAP (https://gsap.com/) which is a widely used and robust JavaScript animation library.
  // GSAP is a powerful JavaScript library for creating high-performance animations on the web. It's widely used by developers and designers to build smooth, complex, and professional animation with ease. 
  // This block of code uses the GSAP animation library in a React environment to animate elements when a video changes.
  // Once installed, you can use the hook GSAP hook like this:
  // the useGSAP hook is a wrapper for initializing GSAP animations in React. It allows you to manage the animations within React's lifecycle. 
  // The callback function () => {} Executes when dependencies change.
  // Options:
  //  - dependencies: React state or props that trigger the animation (here, currentIndex)
  //  - revertOnUpdate: Ensures previous animations are undone when dependencies update.
  useGSAP(() => {
    // If it is clicked, it means that we have entered the this new world video.
    // The animation logic: The callback function animates two video elements (#next-video and #current-video) when the hasClicked state is true.
    // Checking if the video was clicked. Ensures the animation logic only runs after the user clicks on the mini video. 
    if (hasClicked) {
      // Call the gsap (which is the base library imported from gsap)
      // The first parameter to the set you pass the ID or the identifier to the element that you want to animate. In this case we want to animate the next video. By setting the visibility to visible.  
      // Makes sure the video element appears on the page before animations begin. 
      gsap.set('#next-video', {visibility: "visible"});
      // We are going to animate the next video to the following set of animations (also called twins).
      // Animates the target element to a specific final state. 
      gsap.to("#next-video", {
        transformOrigin: 'center center', // Animation originates from the center
        scale: 1, // Scales the video to its original size.
        width: '100%', // Animates to cover 100% of the container width.
        height: '100%', // Animates to cover 100% of the container height.
        duration: 1, // Animation lasts 1 second.
        ease: 'power1.inOut', // Smoothing function for animations. 
        onStart: () => nextVideoRef.current.play(), // Callback that starts the video playback.
      })

      // The current-video animates from a shrunken (invisible) state to full size.
      gsap.from('#current-video', {
        transformOrigin: 'center center', // Animation starts from the center. 
        scale: 0, // Starts scaled down to 0 (invisible) and scales up.
        duration: 1.5, // Lasts 1.5 seconds for a smoother effect.
        ease: 'power1.inOut' // Uses a similar easing function as #next-video
      })
    }
  }, {dependencies: [currentIndex], revertOnUpdate: true}) // The code will be executed every time the currentIndex value changes. RevertOnUpdate: automatically undoes the current animation before applying a new one, ensure smooth transitions. 

  // In order to achieve another smooth animation of the video when scrolling the page down, we can use another GSAP hook.
  // Within this hook we don't have to add any dependency.
  useGSAP(() => {
    gsap.set('#video-frame', {
      // A clip-path in CSS is a property that defines a clipping region for an element, effectively determining which parts of the element are visible and which part are hidden. The clipping acts as a mask, allowing you to display only a specific portion of an element while hiding the rest. 
      // You can create your custom clip-path with a clip-path maker online (https://bennettfeely.com/clippy/)
      // In GSAP, the clipPath property allows you to animate the clipping of elements, similar to how clip-path works on CSS, but with more control and ease for complex animations. With GSAP, you can animate the clipping region, enabling effects like revealing or hiding parts of an element over time. 
      clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)', // We only want to apply this clipPath on scroll. 
      borderRadius: '0 0 40% 10%', // Add rounded corners at the bottom. 40% on the bottom right, 10% on the bottom left. 
    })

    // Animate the gsap.from. So the ting animation. From where we want to start. 
    gsap.from('#video-frame', {
      // And we wanna start from a full polygon, we don't want to have any cut corners yet.
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // Start with a full rectangle (no clipping)
      borderRadius: '0 0 0 0', // Start with no rounded corners
      ease: 'power1.inOut', // Easing function for smoothing animation
      scrollTrigger: { // Trigger animation based on scrolling
        trigger: "#video-frame", // Element that triggers the animation
        start: "center center", // Animation starts when the trigger is at the center of the viewport
        end: "bottom center", // Animation ends when the trigger reaches the bottom center of the viewport
        scrub: true, // Smoothly ties the animation to scrolling
      }
    })
  })

  return (
    // h-dvh => Sets the height of an element to the dynamic viewport height (dvh), which is a CSS unit introduced to handle viewport height changes, especially on mobile devices with UI overlays. 
    // Unlike vh, which uses a static viewport height, dvh dynamically adjusts the height based on the available space in the viewport.
    // w-screen => The width of the screen will be the 100% of the screen width
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* If isLoading is true we can render a div */}
      {loading && (
        // This div will be a loading div
    <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
      {/* The three-body is a special class defined in the index.css file. It will be three little dots that are spinning around each other  */}
      {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
      <div className="three-body">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      {/* Creating a div which will contain the video of the initial screen */}
      {/* z-10 => So that this video will appear above other content */}
      <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"> { /* border border-red-600 */}
        <div>  {/*  className="border border-blue-700" */}
          {/* mask-clip-path => our special css class name */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg"> {/* border border-green-700 */}
            {/* Creating another div, which will actually be a mini video player. */}
            <div onClick={handleMiniVideoClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
              {/* Implement the video player as a HTML self-closing video tag */}
              {/* This video player will have the zoom effect. */}
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id='current-video'
                // scale-150 => utility class used to apply a scale transformation to an element, increasing or decreasing its size relative to its original size. It scales the element 150% of its original size.
                className="size-64 origin-center scale-150 object-cover object-center"
                // onLoadedData => is a special function that is called when the data is loaded.
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
          {/* Create another video component, which will be the primary video on the background */}
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          {/* Define another video player. */}
          <video
            // Checking if we are at the last video, in that case re-set it equal to 1.
            src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            autoPlay // This allows the video to loop and play. 
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>A</b>MING
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          {/* sm:px-10 => is a responsive utility class that applies horizontal padding based on the screen size. sm => activates this rule when the screen size is small or larger, based on the sm breakpoint (default 640px width or greater) */}
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">redefi<b>n</b>e</h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">Enter the Metagame Layer <br />Unleash the Play Economy</p>

            {/* For the left icon, we can install a package that allows to use many different icons. Which is React-icons (https://react-icons.github.io/react-icons/) */}
            {/* Since in the style className of the button in the Button component, already defines a background color (bg-violet-50) the yellow background (bg-yellow-300) that we are passing in the containerClass does not "override"/"takes over" on the bg-violet-50.
            In order to make the bg-yellow-300 class more important we add a ! in front of it. */}
            <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow />} containerClass="!bg-yellow-300 flex-center gap-1" />
          </div>
        </div>
      </div>
      {/* Add the same <div> with the GAMING with a black color, under the white same text. It is under it because it does not have the z-40. When scrolling the page then the write will come out. */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>MING
      </h1>
    </div>
  )
}

export default Hero