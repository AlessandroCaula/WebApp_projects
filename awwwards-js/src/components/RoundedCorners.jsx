// This component is used in the Story component image in order to make the borders of the card smoother, by using an SVG filter.
const RoundedCorners = () => {
  return (
    // Apply the SVG filter. (Found on the internet)
    <svg
      className="invisible absolute size-0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="flt_tag">
          <feGaussianBlur 
            in="SourceGraphic"
            stdDeviation="8"
            result="blur"
          />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="flt_tag"
          />
          <feComposite 
            in="SourceGraphic"
            in2="flt_tag"
            operator="atop"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default RoundedCorners