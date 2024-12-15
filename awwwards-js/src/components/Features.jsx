import React, { useRef, useState } from 'react'
import { TiLocationArrow } from 'react-icons/ti'

// Adding the tilt effect to the BentoCards, when hover over the cards, they will move (tilt) like if they you are interacting with them.
// For this purpose we are gonna create a new BentoTilt component.
// We are then gonna wrap each of the BentoCard in the BentoTilt component, instead of the <div> element. 
// The children in this way will be the BentoCard.
// In React, the children prop is a special prop automatically passed to components. It represents any elements or components nested inside the opening and closing tags of that component. 
// In our case, the BentoCard is passed as the children prop to the BentoTilt component. 
const BentoTilt = ({ children, className = '' }) => {
  // Implement the tilt itself.
  // useState variable
  const [transformStyle, setTransformStyle] = useState('');

  // We also need a ref in order to be able to move those elements around
  // useRef is a React Hook that provides a way to directly access and manipulate DOM elements or persist value across renders without causing re-renders.
  const itemRef = useRef();
  // Function used to handle mouse move, which will give us the move event. And it will be executed once we move our mouse on top of that element.
  // This function creates a 3D tilt effect for a card when the mouse over it. 
  const handleMouseMove = (event) => {
    // When the mouse goes over a Card, we want first to figure out which card we are interacting with. 
    // If there is no card, we want to exit the function without modifying anything. 
    // itemRef is a reference to the card DOM element. The current property points to the DOM node. If the card doesn't exist or the reference is null, the function exits to avoid errors.
    if (!itemRef.current) return;
    // Get the properties of the position of the card. By destructuring the left, top, width and the height of the card. Using the getBoundingClientRect method.
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    // Get the relative X and Y position of the mouse relative to the card. The event.clientX is the position of the mouse.
    // event.clientX and event.clientY provide the mouse's current position on the screed.
    // Subtracting left and top gives the position of the mouse relative to the card. Dividing by width and height normalizes the position to a range of [0, 1].
    const relativeX = (event.clientX - left) / width; // Horizontal mouse position within the card.
    const relativeY = (event.clientY - top) / height; // Vertical mouse position within the card.
    
    // Calculate the tilt angles.
    // Now that we have the relative position of the mouse on the Card. We can do the same for the tilt.
    // Subtract 0.5 to center the range around 0 (from [-0.5, 0.5]). Multiply by 20 to define the maximum tilt angles in degree.
    const tiltX = (relativeY - 0.5) * 5; // Vertical tilt, affected by the vertical mouse position.
    const tiltY = (relativeX - 0.5) * -5; // Horizontal tilt, affected by the horizontal mouse position.
    
    // Setting the new transformation.
    // perspective(700px) => Adds depth to the 3D effect.
    // rotate(${tiltX}deg) => Tilts the card up/down based on the vertical.
    // rotate(${tiltY}deg) => Tilts the card left/right based on the horizontal position. 
    // scale3d(0.95, 0.95, 0.95) => Shrink the card slightly for a subtle zoom effect.
    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;

    // Apply the transformation.
    // Updates the CSS transform style of the card using the calculated newTransform. The setTransformStyle is a useState function that dynamically updates the card's style. 
    setTransformStyle(newTransform);
  };
  //  And we will have the same thing for handle mouse leave, which will happen once we leave the card
  const handleMouseLeave = () => {
    // This is when we want to set the transformStyle back to an empty string. 
    setTransformStyle('');
  };

  return (
    // Pass all the function and the element to this <div>. So for example, it is a nice practice as will have our handler function (handleMouseMove) attached to the specific on event (onMouseMove) functionality.
    <div 
      className={className} 
      ref={itemRef} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

// Here we can create the BentoCard component, since we will not use it anywhere if not in this class.
const BentoCard = ({ src, title, description, isComingSoon }) => {
  return (
    <div className='relative size-full text-blue-50'>
      {/* Within this, we can immediately play the video */}
      <video
        src={src}
        loop
        muted
        autoPlay
        className='absolute left-0 top-0 size-full object-cover object-center'
      />
      <div className='relative z-10 flex size-full flex-col justify-between p-5 text-blue-50'>
        <div>
          <h1 className='bento-title special-font'>{title}</h1>
          {/* Check if the description exists for the current card. Some cards don't have the description */}
          {description &&
            <p className='mt-3 max-w-64 text-xs md:text-base'>{description}</p>
          }
        </div>
      </div>
    </div>
  )
}

const Features = () => {
  return (
    // Padding: creates space inside the element, between the content and its border. Expands the element's size by adding space within the boundaries of the element. 
    // Margin: creates space outside the element, between the element's border and neighboring elements. Creates separation between elements without changing the size of the element itself.
    <section className='bg-black pb-52'>
      <div className='container mx-auto px-3 md:px-10'>
        <div className='px-5 py-32'>
          <p className='font-circular-web text-lg text-blue-50'>
            Into the Metagame Layer
          </p>
          <p className='max-w-md font-circular-web text-lg text-blue-50 opacity-50'>
            Immerse yourself in a rich and ever-expanding universe where vibrant array of products converge into an interconnected overlay experience on your world.
          </p>
        </div>
        {/* Start of our Bento grid */}
        <BentoTilt className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'> {/* border-hsla => custom class, which only gives the white color to the property */}
          {/* Withing this div, we want to render different Bento cards */}
          <BentoCard
            src="videos/feature-1.mp4" // The source of the video we want to play in the BentoCard
            title={<>rad<b>n</b>t</>}
            description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
            isComingSoon // By default, if we don't specify the value of this property, it is set to True.
          />
        </BentoTilt>

        {/* vh-[153vh] => Sets the height of the element to 135vh (vh stands for the "viewport height") */}
        {/* grid-cols-2 => Defines the number of columns in the grid. Creates a grid with 2 column``s. Each column will take up an equal amount of space by default unless otherwise specified. */}
        {/* grid-rows-3 => Defines the number of rows in the grid. Creates a grid with 3 rows. Similar to columns, each row will take up equal space default. */}
        {/* gap-7 => Adds space (fap) between rows and columns in the grid.  */}
        <div className='grid h-[135vh] grid-cols-2 grid-rows-3 gap-7'> {/* border border-red-500 */}
          {/* row-span-1 => Defines how many rows this element should span within the grid layout. The element will occupy 1 row in the grid. */}
          {/* md:col-span-1 => md: a responsive breakpoint that applies the style starting at the md (medium) screen size, typically 768px or larger. On medium-sized screens and larger, the element will span 1 column. */}
          <BentoTilt className='bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2'>
            {/* Visualize another BentoCard component inside this cell of the grid. Passing the right props. */}
            <BentoCard
              src="videos/feature-2.mp4"
              // The empty react fragment <></> serves as a lightweight wrapper that allows you to group multiple elements without adding an extra node to the DOM. 
              title={<>zig<b>m</b>a</>}
              description="An anime gaming-inspired NFT collection - the IP primed for expansion."
            />
          </BentoTilt>

          <BentoTilt className='bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0'>
            <BentoCard
              src="videos/feature-3.mp4"
              title={<>n<b>e</b>xus</>}
              description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            />
          </BentoTilt>

          <BentoTilt className='bento-tilt_1 me-14 md:col-span-1 md:me-0'>
            <BentoCard
              src="videos/feature-4.mp4"
              title={<>az<b>u</b>l</>}
              description="A cross-world Ai Agent - elevating your gameplay to be more fun and productive."
            />
          </BentoTilt>

          <div className='bento-tilt_2'>
            <div className='flex size-full flex-col justify-between bg-violet-300 p-5'>
              <h1 className='bento-title special-font max-w-64 text-black'>
                M<b>o</b>re co<b>m</b>ing so<b>o</b>n
              </h1>
              <TiLocationArrow className='m-5 scale-[5] self-end' />
            </div>
          </div>

          <div className='bento-tilt_2'>
            <video
              src='videos/feature-5.mp4'
              loop
              muted
              autoPlay
              className='size-full object-cover object-center'
            />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Features