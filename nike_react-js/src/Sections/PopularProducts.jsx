import { products } from "../constants"
import PopularProductCard from "../components/PopularProductCard"

const PopularProducts = () => {
  return (
    <section id="products" className="max-container max-sm:mt-12 border">
      <div className="flex flex-col justify-start gap-5 border">
        <h2 className="text-4xl font-palanquin font-bold border">Our <span className="text-coral-red">Popular</span> Products</h2>
        {/* max-w-lg => sets the maximum width of an element to the value defined for the lg size in the tailwind configuration (32rem/512px) */}
        <p className="lg:max-w-lg mt-2 font-montserrat text-slate-gray border">Experience top-notch quality and stule with our sought-after selections. Discover a world of comfort, design and value</p>
      </div>

      {/* Create a new Div that is going to wrap the renders of the popular products images */}
      {/* This is going to be a grid. That is going to have different number of columns based on the screen size */}
      <div className='mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-14 border'>
        {/* Within it, simply loop (map) through all the products and render them as a PopularProductsCard component */}
        {products.map((product) => (
          <PopularProductCard key={product.name} {...product} />
        ))}
      </div>
    </section>
  )
}

export default PopularProducts