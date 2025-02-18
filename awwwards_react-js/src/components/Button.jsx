// Deconstructing all the properties that are passed to this Button component.
const Button = ({ title, id, rightIcon, leftIcon, containerClass }) => {
  return (
    // Create out custom button inside a button tag.
    // Make the className dynamic (transforming it to a dynamic template string), so that we can add the containerClass classes to the button, in order in this way to be able to style it from the outside.
    <button id={id} className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}>
      {/* Rendering the leftIcon */}
      {leftIcon}
      {/* Creating a span in this button */}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        <div>
          {title}
        </div>
      </span>
      {/* Rendering the Right Icon */}
    {rightIcon}
    </button>
  )
}

export default Button