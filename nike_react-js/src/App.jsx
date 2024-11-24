// Importing the components that have been exported in the index.jsx
import { CustomerReviews, Footer, Hero, PopularProducts, Services, SpecialOffer, Subscribe, SuperQuality } from "./Sections";
import Nav from './components/Nav';

// Create an App arrow function. Without putting the {} the app is gonna immediately return whatever we want to return. This is used when there are no console.log or other functions within the app. It is just going to be the representation or the jsx.
const App = () => (
  <main className="relative">
    <Nav />
    {/**Padding-r and padding-b have been defined in the index.css */}
    <section className="xl:padding-l wide:padding-r padding-b border border-black">
      <Hero />  {/**This is going to be the Hero component */}
    </section>
    {/**Also the padding class has been defined in the index.css */}
    <section className="padding border-3 border border-black">
      <PopularProducts />
    </section>
    <section className="padding border-3 border border-black">
      <SuperQuality />
    </section>
    <section className="padding-x py-10 border-3 border border-black">
      <Services />
    </section>
    <section className="padding border-3 border border-black">
      <SpecialOffer />
    </section>
    <section className=" bg-pale-blue padding border-3 border border-black">
      <CustomerReviews />
    </section>
    <section className="padding-x sm:py-32 py-16 w-full border-3 border border-black">
      <Subscribe />
    </section>
    <section className="bg-black padding-x padding-t pb-8">
      <Footer />
    </section>
  </main>
);

export default App;