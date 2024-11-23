import { arrowRight } from "../assets/icons"
import Button from "../components/Button"
import { statistics } from "../constants"

const Hero = () => {
  return (
    // Section is an HTML semantic element.
    // Give the section an id, so we can easily navigate to it when pressing home in the Navigation bar.
    // min-h-screen => means that is going to occupy the entire height of the screen
    <section 
      id='home'
      className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container"
    >
      {/* relative: is used to position an element according to the normal flow of the document. Any offset are calculated relative to the element's normal position and the element will act as a position reference for absolutely positioned children */}
      {/* On extra-large screen the div is going to occupy the 2/5 of the screen */}
      <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-28">
        <p className="text-xl font-montserrat text-coral-red">Our Winter Colelction</p>
        {/* On Small devices the text will be 72 pixels. Sets the font size to 72px only on screens with a width of 640px or smaller 
        leading-82px => line height*/}
        <h1 className="mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-82px">
          <span>The new Arrival</span>
          <br/>
          <span>Nike</span>Shoes
        </h1>
        <p>Discover stylish Nike arrivals, quality comfort, and innovation for your active life.</p>
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
        <div className="flex justify-start items-start w-full mt-20 gap-16">
          {/* Returning a div for each statistic */}
          {statistics.map((stat) => (
            <div key={stat.label}>
              <p>{stat.value}</p>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>


    </section>
  )
}

export default Hero