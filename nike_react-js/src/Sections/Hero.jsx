import { arrowRight } from "../assets/icons"
import Button from "../components/Button"
import ShoeCard from "../components/ShoeCard"
import { shoes, statistics } from "../constants"
import { bigShoe1 } from "../assets/images"
import { useState } from "react"

const Hero = () => {

  // The selected shoe
  const [bigShoeImg, setBigShoeImg] = useState(bigShoe1);

  return (
    // Section is an HTML semantic element.
    // Give the section an id, so we can easily navigate to it when pressing home in the Navigation bar.
    // min-h-screen => means that is going to occupy the entire height of the screen
    // xl:flex-row => it applies the CSS property flex-direction: row; when the size matches the xl breakpoint or larger. It means the flex container's childred will be arranged in an horizontal woe instead of a vertical column for thos screen sizes. 
    <section
      id='home'
      className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container"
    >
      {/* Left side of the section, the one containing the writtens */}

      {/* relative: is used to position an element according to the normal flow of the document. Any offset are calculated relative to the element's normal position and the element will act as a position reference for absolutely positioned children */}
      {/* On extra-large screen the div is going to occupy the 2/5 of the screen */}
      <div className='relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-28'>
        <p className="text-xl font-montserrat text-coral-red">
          Our Winter Colelction
        </p>
        {/* On Small devices the text will be 72 pixels. Sets the font size to 72px only on screens with a width of 640px or smaller 
        leading-82px => line height*/}
        <h1 className="mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold">
          {/* z-10 => It will appear above the background */}
          <span className="xl:bg-white xl:whitespace-nowrap relative z-10 pr-10">The new Arrival</span>
          <br />
          <span className="text-coral-red inline-block mt-3">Nike</span> Shoes
        </h1>
        <p className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm">
          Discover stylish Nike arrivals, quality comfort, and innovation for your active life.
        </p>

        {/* This button is going to have two different props */}
        <Button label="Shop now" iconURL={arrowRight} />

        {/* Creating the part with the statistics */}
        {/* flex 
            justify-start => Elements are to the left
            items-start => Element are at the top 
            flex-wrap => When the screen is smaller they start to collapse slowly for smaller devices
            w-full => They take 100% of the screen
            mt-20 => Margin top of 5rem (80px)
        */}
        <div className="flex justify-start items-start flex-wrap w-full mt-20 gap-16">
          {/* Returning a div for each statistic */}
          {statistics.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-palanquin font-bold">{stat.value}</p>
              <p className="leading-7 font-montserrat text-slate-gray">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right side part of the section, the one containing the shoe image */}
      <div className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-primary bg-hero bg-cover bg-center">
        {/* Render an image */}
        <img
          src={bigShoeImg}
          alt="shoe collection"
          width={610}
          height={500}
          className="object-contain relative z-10"
        />

        {/* Create the three small images below the big shoe image that we can switch between */}
        <div className='flex sm:gap-6 gap-4 absolute -bottom-[5%] sm:left-[10%] max-sm:px-6'>
          {/* Map through all the shoes and render them with a new component */}
          {shoes.map((image, index) => (
            <div key={index}>
              {/* To the ShoeCard component we are passing the URL of the image, a function to change the image selected and the bigShoeImage that we are currently displaying  */}
              <ShoeCard
                index={index}
                imgURL={image}
                changeBigShoeImage={(shoe) => setBigShoeImg(shoe)}
                bigShoeImg={bigShoeImg}
              />
            </div>
          ))}
        </div>
      </div>
    </section >
  )
}

export default Hero