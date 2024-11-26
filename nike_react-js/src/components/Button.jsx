// Destructuring the props that are arriving from the Hero component. 
const Button = ({ label, iconURL, backgroundColor, borderColor, textColor, fullWidth }) => {
  return (
    // justify-center => center them horizonatlly 
    // items-center => center them vertically
    // Conditionally color the the button border, background and text colors of the button
    <button className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none rounded-full 
      ${fullWidth && `w-full`}
      ${backgroundColor ? backgroundColor : ` bg-coral-red `} 
      ${textColor ? textColor : ` text-white `}
      ${borderColor ? borderColor : ` border-coral-red`}`}
    >
      {label}
      {/* Render the icon image only if there is */}
      {iconURL && <img
        src={iconURL}
        alt="arrow right icon"
        className="ml-2 rounded-full w-5 h-5"
      />}
    </button>
  )
}

export default Button