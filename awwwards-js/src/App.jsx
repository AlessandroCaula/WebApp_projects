import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  return (
    // min-h-screen => The minimum height of the screen will be the 100% of the screen height
    // w-screen => The width of the screen will be the 100% of the screen width
    // overflow-x-hidden => The horizontal scrollbar will be hidden
    <main className="relative min-h-screen w-screen overflow-x-hidden">

      {/* Navigation Bar */}
      <Navbar />

      {/* The HERO section of a Webpage refers to the prominent, introductory area area typically placed at the top of the page */}
      <Hero />
      
      {/* Rendering the About section component */}
      <About />

      {/* Rendering the Feature section component */}
      <Features />

      {/* Rendering the Story section component */}
      <Story />

      {/* Rendering the Contact section component */}
      <Contact />

      {/* Rendering the Footer section component */}
      <Footer />

    </main>
  )
}

export default App