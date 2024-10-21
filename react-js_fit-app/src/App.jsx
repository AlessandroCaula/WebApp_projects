import { useState } from 'react'
import Generator from './components/Generator'
import Hero from './components/Hero'
import Workout from './components/Workout'

// !!! We are gonna use Tailwind to style our project. What Tailwind allows us to do is: !! to build custom designs directly in your HTML without writing traditional CSS !!

function App() {

  // Importing the components inside the Hub of our application
  return (
    <main className='min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base'>
      From the App Hub Component
      <Generator />
      <Hero />
      <Workout />
    </main>
  )
}

export default App
