import React from 'react'

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
      </div>
    </section>
  )
}

export default Features