import { star } from "../assets/icons"

const ReviewCard = ({ imgURL, customerName, rating, feedback }) => {
  return (
    <div className='flex justify-center items-center flex-col border'>
      {/* Rendering the image */}
      <img
        src={imgURL}
        alt="customer"
        className="rounded-full object-cover w-[120px] h-[120px] border"
      />
      <p className="mt-6 text-center info-text border">{feedback}</p>
      <div className="mt-3 flex justify-center items-center gap-2.5 border">
        <img
          src={star}
          width={24}
          height={24}
          // margin: 0
          className="object-contain m-0 border"
        />
        <p className="text-xl font-montserrat text-slate-gray border">({rating})</p>
      </div>
      <h3 className="mt-1 font-palanquin text-3xl text-center font-bold border">{customerName}</h3>
    </div>
  )
}

export default ReviewCard