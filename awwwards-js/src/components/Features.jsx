import React from 'react'
import { TiLocationArrow } from 'react-icons/ti'

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
        <div className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'> {/* border-hsla => custom class, which only gives the white color to the property */}
          {/* Withing this div, we want to render different Bento cards */}
          <BentoCard
            src="videos/feature-1.mp4" // The source of the video we want to play in the BentoCard
            title={<>rad<b>n</b>t</>}
            description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
            isComingSoon // By default, if we don't specify the value of this property, it is set to True.
          />
        </div>

        {/* vh-[153vh] => Sets the height of the element to 135vh (vh stands for the "viewport height") */}
        {/* grid-cols-2 => Defines the number of columns in the grid. Creates a grid with 2 column``s. Each column will take up an equal amount of space by default unless otherwise specified. */}
        {/* grid-rows-3 => Defines the number of rows in the grid. Creates a grid with 3 rows. Similar to columns, each row will take up equal space default. */}
        {/* gap-7 => Adds space (fap) between rows and columns in the grid.  */}
        <div className='grid h-[135vh] grid-cols-2 grid-rows-3 gap-7'> {/* border border-red-500 */}
          {/* row-span-1 => Defines how many rows this element should span within the grid layout. The element will occupy 1 row in the grid. */}
          {/* md:col-span-1 => md: a responsive breakpoint that applies the style starting at the md (medium) screen size, typically 768px or larger. On medium-sized screens and larger, the element will span 1 column. */}
          <div className='bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2'>
            {/* Visualize another BentoCard component inside this cell of the grid. Passing the right props. */}
            <BentoCard 
              src="videos/feature-2.mp4"
              // The empty react fragment <></> serves as a lightweight wrapper that allows you to group multiple elements without adding an extra node to the DOM. 
              title={<>zig<b>m</b>a</>}
              description="An anime gaming-inspired NFT collection - the IP primed for expansion."
            />
          </div>

          <div className='bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0'>
            <BentoCard 
              src="videos/feature-3.mp4"
              title={<>n<b>e</b>xus</>}
              description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            />
          </div>

          <div className='bento-tilt_1 me-14 md:col-span-1 md:me-0'>
            <BentoCard 
              src="videos/feature-4.mp4"
              title={<>az<b>u</b>l</>}
              description="A cross-world Ai Agent - elevating your gameplay to be more fun and productive."
            />
          </div>

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

          {/* <div className='border border-blue-500'></div>
          <div className='border border-green-500'></div>
          <div className='border border-violet-500'></div>
          <div className='border border-yellow-500'></div> */}
        </div>

      </div>
    </section>
  )
}

export default Features