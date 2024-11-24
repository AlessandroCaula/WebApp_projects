import { shoe8 } from "../assets/images"
import Button from "../components/Button"

const SuperQuality = () => {
  return (
    // justify-between => To have some space between the left and right.
    // items-center => Center vertically
    // max-lg:flex-col => On devices smaller than the 1024 it will have a column arrangment
    // max-container => is going to ensure that everything is contained within full width.
    <section id="about-us" className="flex justify-between items-center max-lg:flex-col gap-10 w-full max-container border border-yellow-500">
      {/* div to wrap the text and the bottom on the left */}
      <div className="flex flex-1 flex-col border">
        {/* On Small devices the text will be 72 pixels. Sets the font size to 72px only on screens with a width of 640px or smaller 
        leading-82px => line height*/}
        <h2 className="mt-10 font-palanquin text-4xl capitalize font-bold lg:max-w-lg border">
          We provide you
          <span className="text-coral-red"> Super </span>
          <span className="text-coral-red">Quality </span>
          Shoes
        </h2>
        {/* info-text => Class name created in the index.css */}
        <p className="mt-4 lg:max-w-lg info-text border">
          Ensuring premium comfort and style, our meticulously crafted footwear is designed to elevate your experience, providing you with unmatched quality, innovation, and touch of elegance.
        </p>
        <p className="mt-6 lg:max-w-lg info-text border">
          Our dedication to detail and excellence ensures your satisfaction.
        </p>
        {/* Wrap the button in a div to limit its width */}
        <div className="mt-11 border">
          {/* This button is going to have two different props */}
          <Button label="View Details" />
        </div>
      </div>

      {/* Create the rigth side, the image of this section, which is contained in a div */}
      <div className="flex flex-1 justify-center items-center border">
        <img 
          src={shoe8}
          alt="shoe8"
          width={570}
          height={522}
          className="object-contain"
        />
      </div>
    </section>
  )
}

export default SuperQuality