import { useRef, useState } from "react"

const Hero = () => {
  // Define some useState variables that will say when a user has clicked something and we also have to keep track of which video is playing.
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  // Setting the isLoading state to true as initial state, caus usually a video takes some time to load.
  const [isLoading, setIsLoading] = useState(true);
  // Define another useState for the number of video that has loaded.
  const [loadedVideos, setLoadedVideos] = useState(0);
  
  // Define the number of total video which you want to play (in this case we are set it to 4)
  const totalVideo = 4;
  // We also have to define the reference which will allow to then switch between those videos or to target the video player within which will play the videos.
  // In react you use the useRef hook to create a reference to a DOM element.
  // The DOM (Document Object Model) is a programming interface for web documents. It represents the structure of a web page as a tree of objects, where each element (like a <div>, <p>, or <img) is a node in the tree. This structure allows programming languages, like JavaScript, to dynamically interact with and manipulate the content, structure, and styling of a webpage.
  // useRef is a React hook used to create a mutable reference object that persists across renders. It provides access to a .current property where you can store a value that doesn't trigger a re-render when it changes.
  // We are going to use it to target the <div> within which we want to play the videos.
  const nextVideoRef = useRef(null);

  // Define the function for handle the loadedData.
  const handleVideoLoaded = () => {
    setLoadedVideos((prevLoadedVideo) => prevLoadedVideo + 1);
  }

  // Define some new functions that will handle the mini video player. This video player will show different videos when clicking in the middle of the screen.
  const handleMiniVideoClick = () => {
    // When the mini-player is clicked we want to set the hasClicked state to true.
    setHasClicked(true);
    // We also want to set the currentIndex state to be equal to a function where we get the previous index and add 1 to it.
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }

  // Define the source of the videos to be played. As a function that will return the source of the videos, with the index in their name. Givin the path of each video source.
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    // h-dvh => Sets the height of an element to the dynamic viewport height (dvh), which is a CSS unit introduced to handle viewport height changes, especially on mobile devices with UI overlays. 
    // Unlike vh, which uses a static viewport height, dvh dynamically adjusts the height based on the available space in the viewport.
    // w-screen => The width of the screen will be the 100% of the screen width
    <div className="relative h-dvh w-screen overflow-x-hidden">
        {/* Creating a div which will contain the video of the initial screen */}
        {/* z-10 => So that this video will appear above other content */}
        <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
          {/* mask-clip-path => our special css class name */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            {/* Creating another div, which will actually be a mini video player. */}
            <div onClick={handleMiniVideoClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
              {/* Implement the video player as a HTML self-closing video tag */}
              <video 
                ref={nextVideoRef}
                src={getVideoSrc(currentIndex + 1)}
                loop
                muted
                id='current-video'
                className="size-64 origin-center scale-150 object-cover object-center"
                // onLoadedData => is a special function that is called when the data is loaded.
                onLoadedData={handleVideoLoaded} 
              />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Hero