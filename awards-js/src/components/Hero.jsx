import { useRef, useState } from "react"
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  // Define some useState variables that will say when a user has clicked something and we also have to keep track of which video is playing.
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  // Setting the isLoading state to true as initial state, caus usually a video takes some time to load.
  const [isLoading, setIsLoading] = useState(true);
  // Define another useState for the number of video that has loaded.
  const [loadedVideos, setLoadedVideos] = useState(0);

  // Define the number of total video which you want to play (in this case we are set it to 4)
  const totalVideos = 3;
  // We also have to define the reference which will allow to then switch between those videos or to target the video player within which will play the videos.
  // In react you use the useRef hook to create a reference to a DOM element.
  // The DOM (Document Object Model) is a programming interface for web documents. It represents the structure of a web page as a tree of objects, where each element (like a <div>, <p>, or <img) is a node in the tree. This structure allows programming languages, like JavaScript, to dynamically interact with and manipulate the content, structure, and styling of a webpage.
  // useRef is a React hook used to create a mutable reference object that persists across renders. It provides access to a .current property where you can store a value that doesn't trigger a re-render when it changes.
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

  // Define the source of the videos to be played. As a function that will return the source of the videos, with the index in their name. Givin the path of each video source.
  // In JS, if the function body consists of a single expression, you can omit both the curly braces {} and the return keyword.
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  // In order to animate the page, we will take advantage and use the GSAP (https://gsap.com/) which is a widely used and robust JavaScript animation library.
  // GSAP is a powerful JavaScript library for creating high-performance animations on the web. It's widely used by developers and designers to build smooth, complex, and professional animation with ease. 
  // Once installed, you can use the hook GSAP hook like this:
  useGSAP

  return (
    // h-dvh => Sets the height of an element to the dynamic viewport height (dvh), which is a CSS unit introduced to handle viewport height changes, especially on mobile devices with UI overlays. 
    // Unlike vh, which uses a static viewport height, dvh dynamically adjusts the height based on the available space in the viewport.
    // w-screen => The width of the screen will be the 100% of the screen width
    <div className="relative h-dvh w-screen overflow-x-hidden">
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
            id="next video"
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