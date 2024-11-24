// Importing the components that have been exported in the index.jsx
import { CustomerReviews, Footer, Hero, PopularProducts, Services, SpecialOffer, Subscribe, SuperQuality } from "./Sections";
import Nav from './components/Nav';

// Create an App arrow function. Without putting the {} the app is gonna immediately return whatever we want to return. This is used when there are no console.log or other functions within the app. It is just going to be the representation or the jsx.
const App = () => (
  <main className="relative">
    <Nav />
    {/**Padding-r and padding-b have been defined in the index.css */}
    <section className="xl:padding-l wide:padding-r padding-b">
      <Hero />  {/**This is going to be the Hero component */}
    </section>
    {/**Also the padding class has been defined in the index.css */}
    <section className="padding">
      <PopularProducts />
    </section>
    <section className="padding">
      <SuperQuality />
    </section>
    <section className="padding-x py-10">
      <Services />
    </section>
    <section className="padding">
      <SpecialOffer />
    </section>
    <section className=" bg-pale-blue padding">
      <CustomerReviews />
    </section>
    <section className="padding-x sm:py-32 py-16 w-full">
      <Subscribe />
    </section>
    <section className="bg-black padding-x padding-t pb-8">
      <Footer />
    </section>
  </main>
);

export default App;