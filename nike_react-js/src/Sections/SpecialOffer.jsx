import { arrowRight } from "../assets/icons"
import { offer } from "../assets/images"
import Button from "../components/Button"

const SpecialOffer = () => {
  return (
    // gap => utility class used to set spacing between items in flex or grid container.
    // max-xl:flex-col-reverse 
    // !!!! max-xl: affect screens up to xl.
    // !!!! sm: affects screens starting from sm upwards. 
    // max-xl:flex-col-reverse => when on small screen what it is on the left (on normal screen) it goes on the button of the column.
    <section className="flex flex-wrap items-center max-xl:flex-col-reverse gap-10 max-container border">
      <div className="flex-1">
        {/* Render the image */}
        {/* width={773} => is the fixed width in pixels. w-full => makes the image responsive to the container width, overriding the fixed pixel width */}
        <img src={offer} width={773} height={687} className="object-contain w-full border" />
      </div>

      {/* Div that wraps the text of the section */}
      <div className="flex flex-1 flex-col border">
        <h2 className="mt-10 font-palanquin text-4xl capitalize font-bold lg:max-w-lg border">
          <span className="text-coral-red"> Special </span>Offer</h2>
        {/* info-text => Class name created in the index.css */}
        <p className="mt-4 lg:max-w-lg info-text border">
          Embark on a shopping journey that redefines your experience with unbeatable deals. From premier selections to incredible savings, we offer unparallel value that sets us apart.
        </p>
        <p className="mt-6 lg:max-w-lg info-text border">
          Navigate a realm of possibilities designed to fulfill your unique desires, surpassing the lofties expectations. Your journey with us is nothing short of execptional.
        </p>
        {/* Wrap the two buttons in a div to limit its width */}
        <div className="mt-11 flex flex-wrap gap-4 border">
          {/* This button is going to have two different props */}
          <Button label="Shop now" iconURL={arrowRight} />
          {/* Change the background the border and the text color of this button */}
          <Button label="Learn more" backgroundColor="bg-white" borderColor="border-slate-gray" textColor="text-slate-gray" />
        </div>
      </div>

    </section>
  )
}

export default SpecialOffer