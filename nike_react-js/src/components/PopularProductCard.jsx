import { star } from "../assets/icons"

const PopularProductCard = ({ imgURL, name, price }) => {
  return (
    // flex-1 => allow a flex item to grow an shrink as needed, ignoring its initial size.
    // max-sm => on devices with a minimum width of sm (640px). Is a responsive breakpoint utility that applies style when the screen width is below the sm breakpoint. 
    <div className="flex flex-1 flex-col w-full max-sm:w-full">
      <img
        src={imgURL} alt={name} className="w-[280px] h-[280px]"
      />
      <div className="mt-8 flex justify-start gap-2.5">
        {/* Ading the star image for the rating. */}
        <img src={star} alt="rating" width={24} height={24} />
        {/* Adding the rating. Randomize it betwen 4 and 5 */}
        <p className="font-montserrat text-xl leading-normal text-slate-gray">({(Math.random() * (5 - 4) + 4).toFixed(1)})</p>
      </div>
      {/* Name of the shoe */}
      <h3 className="mt-2 text-2xl leading-normal font-semibold font-palanquin">{name}</h3>
      {/* Price of the shoe */}
      <p className="mt-2 font-semibold font-montserrat text-coral-red text-2xl leading-normal">{price}</p>
    </div>
  )
}

export default PopularProductCard