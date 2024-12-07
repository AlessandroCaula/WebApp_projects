import Hero from "./components/Hero"
import About from "./components/About"

const App = () => {
  return (
    // min-h-screen => The minimum height of the screen will be the 100% of the screen height
    // w-screen => The width of the screen will be the 100% of the screen width
    // overflow-x-hidden => The horizontal scrollbar will be hidden
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Hero />
      
      <About />

      {/* Creating a section just to test the scrolling of the main page */}
      {/* The min-h-screen is a utility class that sets the minimum heigh of an element to be equal to the height of the viewport */}
      <section className="z-0 min-h-screen bg-blue-500"/>
    </main>
  )
}

export default App