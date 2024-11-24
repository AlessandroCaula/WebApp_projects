const PopularProductCard = ({ imgURL, name, price }) => {
  return (
    // flex-1 => allow a flex item to grow an shrink as needed, ignoring its initial size.
    // max-sm => on devices with a minimum width of sm (640px). Is a responsive breakpoint utility that applies style when the screen width is below the sm breakpoint. 
    <div className="flex flex-1 flex-col w-full max-sm:w-full">
      <img 
        src={imgURL} alt={name} className="w-[280px] h-[280px]"
      />
    </div>
  )
}

export default PopularProductCard