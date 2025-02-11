import React, { useState } from 'react'
import Search from './components/Search'

const App = () => {

  // Create the Search film component
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <main>
      <div className='pattern'/>

      {/* Create the header */}
      <div className='wrapper'>
        <header>
          {/* Rendering the hero-img */}
          <img src='./hero-img.png' alt='Hero Banner'/>
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
        </header>
        
        {/* Passing the search term and setSearchTerm to the Search component */}
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {/* To check that while typing the searchTerm is being updated
        <h1 className='text-white'>{searchTerm}</h1> */}
      </div>
    </main>
  )
}

export default App
