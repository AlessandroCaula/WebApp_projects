import { useRef } from "react"
import AnimatedTitle from "./AnimatedTitle"
import gsap from "gsap";
import RoundedCorners from "./RoundedCorners";

const Story = () => {

  // Create the frameRef that will point to the image HTML tag, so that we can access it and animate it on mouse hover. 
  // Use Ref will allow us to access the <img> DOM element.
  const frameRef = useRef('null');

  // Define a new function that will handle the events when the mouse leave. But in our case also when it enters the image.
  const handleMouseLeave = () => {
    // Get the element, the image Ref, on which the mouse is hovering. 
    const element = frameRef.current;
    // Now if we are gonna leave the element, we are going to reset the positioning. 
    gsap.to(element, {
      duration: 0.3,
      rotateX: 0, 
      rotateY: 0,
      ease: 'power1.inOut'
    });
  }
  // Define a function that will handle the mouse move event, when the mouse is hovering and moving on the <img> DOM element.
  const handleMouseMove = (e) => {
    // Destructure the client X and Y position. 
    const { clientX, clientY } = e;
    // Get the element, the image Ref, on which the mouse is hovering. 
    const element = frameRef.current;
    // If there is no element, we are gonna simply exit from the function. 
    if (!element) return;

    // If we do have it, we are going to take its rectangular properties.
    const rect = element.getBoundingClientRect();
    // Now we can extract its X position and Y position. 
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Calculate the center of the rectangle client. 
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Finally we can calculate the rotation values based on the mouse position relative to the center.
    const rotateX = ((y - centerY) / centerY) * -10; // -10 => This is used as a magnifier.
    const rotateY = ((x - centerX) / centerX) * 10;

    // Finally we can use gsap to animate it, passing the element and the properties for the animation. 
    gsap.to(element, {
      duration: 0.3,
      rotateX, rotateY,
      transformPerspective: 500, // This is gonna give a 3D effect
      ease: 'power1.inOut'
    });
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
                  // We are gonna call the same handleMouseLeave function for entering, leaving and up the mouse from the image. 
                  onMouseLeave={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  // The only one that will be different, will be onMouseMove
                  onMouseMove={handleMouseMove}
                  src="/img/entrance.webp"
                  // The alt tag is an attribute used in the <img> HTML tah to provide a textual description of an image. 
                  // 1. The alt text is read by screen readers to describe the image for visually impaired users. 
                  // 2. If an image fails to load, the alt text is displayed in its place.
                  alt="entrance"
                  className="object-contain"
                />
              </div>
            </div>
            {/* Component used to apply a SVG filter on the current image. */}
            <RoundedCorners />
            
          </div>
        </div>
        {/* Adding the text and the bottom at the end of this section */}
        {/* -mt-80 => the negative sign indicates that the margin will be applied in the opposite direction, effectively pulling the element closer to its parent or sibling element. */}
        {/* md:-mt-64 => on medium and larger devices, sets the top margin to -16rem. me => margin-end */}
        <div className="-mt-80 w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div>
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default Story