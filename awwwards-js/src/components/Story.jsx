import { useRef } from "react"
import AnimatedTitle from "./AnimatedTitle"

const Story = () => {

  // Create the frameRef that will point to the image HTML tag, so that we can access it and animate it on mouse hover. 
  // Use Ref will allow us to access the <img> DOM element.
  const frameRef = useRef('null');

  // Define a new function that will handle the events when the mouse leave. But in our case also when it enters the image.
  const handleMouseLeave = () => {
    
  }

  return (
    <section
      id='story'
      className='min-h-dvh w-screen bg-black text-blue-50'
    >
      {/* flex-col => The element will appear, one below the other. */}
      <div className='flex size-full flex-col items-center py-10 pb-24'>
        <p className='font-general text-sm uppercase md:text-[10px]'>
          The multiversal ip world
        </p>
        {/* Create the animated title */}
        <div className='relative size-full'>
          <AnimatedTitle 
            title="The st<b>o</b>ry of <br /> a hidden real<b>m</b>"
            // Give a section ID so we can scroll to it. 
            sectionId="#story"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />
          {/* Render the container of the image that will appear here */}
          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img 
                  // Give to the img the ref, so that we will be able to animate if on mouse hover.
                  ref={frameRef}
                  src="/img/entrance.webp"
                  // The alt tag is an attribute used in the <img> HTML tah to provide a textual description of an image. 
                  // 1. The alt text is read by screen readers to describe the image for visually impaired users. 
                  // 2. If an image fails to load, the alt text is displayed in its place.
                  alt="entrance"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Story