const Hero = () => {
  return (
    // h-dvh => Sets the height of an element to the dynamic viewport height (dvh), which is a CSS unit introduced to handle viewport height changes, especially on mobile devices with UI overlays. 
    // Unlike vh, which uses a static viewport height, dvh dynamically adjusts the height based on the available space in the viewport.
    // w-screen => The width of the screen will be the 100% of the screen width
    <div className="relative h-dvh w-screen overflow-x-hidden">
        {/* Creating a div which will contain the video of the initial screen */}
        {/* z-10 => So that this video will appear above other content */}
        <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
          {/* mask-clip-path => our special css class name */}
          <div className="mask-clip-path">

          </div>
        </div>
    </div>
  )
}

export default Hero