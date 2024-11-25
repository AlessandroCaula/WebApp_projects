// Deconstructure the props coming from the services section. 
const ServicesCard = ({ imgURL, label, subtext }) => {
  return (
    // Each one of our subcard, is going to be a div.
    // flex-1 => it expands if needed.
    // w => Sets the exact with of an element. Does not allow resizing below or above the specified value unless explicitly modified by other properties.
    // min-w => Specifies the minimum width an element can shrink to. Overrides the width property when the content inside the element exceeds the specified width.
    // w-full => Sets an element's width to 100% of its parent container. It's equivalent to wisth: 100% in CSS
    // px => padding left and right of the content of the div
    // py => padding top and buttom of the content of the div
    <div className="flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-3xl px-10 py-16 border">
      {/* Creating a div that is going to wrap the image */}
      {/* justify-center and items-center will work only if the div is a flex container */}
      <div className="flex w-11 h-11 justify-center items-center bg-coral-red rounded-full border">
        <img src={imgURL} alt={label} width={24} height={24} />
      </div>
      {/* Render the label */}
      {/* leading-normal => Sets the line height to 1.5 */}
      <h3 className="mt-5 text-3xl leading-normal font-bold border">{label}</h3>
      {/* Render the subtext */}
      {/* break-words => Allows long words to break and wrap onto the next line if they exceed the wisth of their containe. It won't break on the letter within the world */}
      <p className="mt-3 break-words font-montserrat text-lg leading-normal text-slate-gray border">{subtext}</p>
    </div>
  )
}

export default ServicesCard