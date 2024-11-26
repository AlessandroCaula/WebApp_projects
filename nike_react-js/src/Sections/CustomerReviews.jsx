import ReviewCard from "../components/ReviewCard"
import { reviews } from "../constants"

const CustomerReviews = () => {
  return (
    <section className="max-caontainer border-green-500 border">
      <h3 className="font-palanquin text-center text-4xl font-bold border ">
        What our
        <span className="text-coral-red"> Customer </span>
        Say?
      </h3>
      <p className="info-text  m-auto mt-4 max-w-lg text-center border">
        Here geniune stories from our satisfied customer about their exceptional experience with us.
      </p>
      {/* justify-evenly: evenly distributes items along the horizontal axis in a flex container. Each item has equal space on both sides, including the space between items and the container edges */}
      {/* items-center: vertically center in a flex container. */}
      {/* gap-14 => gap between the elements. */}
      <div className="mt-16 flex flex-1 justify-evenly items-center border max-lg:flex-col gap-14">
        {/* Importing the reviews and render them */}
        {reviews.map((review) => (
          <ReviewCard 
            key={review.customerName}
            imgURL={review.imgURL}
            customerName={review.customerName}
            rating={review.rating}
            feedback={review.feedback}
          />
        ))}
      </div>
    </section>
  )
}

export default CustomerReviews