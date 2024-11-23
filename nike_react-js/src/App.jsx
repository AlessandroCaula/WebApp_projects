// Create an App arrow function. Without putting the {} the app is gonna immediately return whatever we want to return. This is used when there are no console.log or other functions within the app. It is just going to be the representation or the jsx.
const App = () => (
  <main className="relative">
    Nav Component {/**This is going to be the Nav component */}
    {/**Padding-r and padding-b have been defined in the index.css */}
    <section className="xl:padding-1 wide:padding-r padding-b">
      Hero Component {/**This is going to be the Hero component */}
    </section>
    {/**Also the padding class has been defined in the index.css */}
    <section className="padding">
      PopularProduct Component
    </section>
    <section className="padding">
      SuperQuality Component
    </section>
    <section className="padding-x py-10">
      Services Component
    </section>
    <section className="padding">
      SpecialOffer Component
    </section>
    <section className=" bg-pale-blue padding">
      CustomerReviews Component
    </section>
    <section className="padding-x sm:py-32 py-16 w-full">
      Subscribe Component
    </section>
    <section className="bg-black padding-x padding-t pb-8">
      Fotter Component
    </section>
  </main>
);

export default App;