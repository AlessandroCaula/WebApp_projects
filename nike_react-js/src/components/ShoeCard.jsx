// Deconstruct the props coming from the Hero Section. 
const ShoeCard = ({ index, imgURL, changeBigShoeImage, bigShoeImg }) => {

  // The handleClick arrow function.
  const handleClick = () => {
    // If the curent bigShoeImage is not the selected bigShoe (imgURL.bigShoe), we are gonna change changeBigShoeImage() the big shoe image.
    if (bigShoeImg !== imgURL.bigShoe) {
      changeBigShoeImage(imgURL.bigShoe)
    }
  }

  return (
    // Conditionally highlight the border of the selected shoe in red. 
    // max-sm:flex-1 => The flex-1 style is applied only when the screen size is smaller than the sm (640px) breakpoint.
    <div className={`border-2 rounded-xl ${bigShoeImg === imgURL.bigShoe
        ? `border-coral-red`
        : `border-transparent`
      } cursor-pointer max-sm:flex-1`}
      onClick={handleClick}
    >
      {/* Creating a wrapping div which will contain the image */}
      <div className="flex justify-center items-center bg-card bg-center bg-cover sm:w-40 sm:h-40 rounded-xl max-sm:p-4">
        <img 
          src={imgURL.thumbnail}
          alt="shoe collection"
          width={127}
          height={103.34}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default ShoeCard