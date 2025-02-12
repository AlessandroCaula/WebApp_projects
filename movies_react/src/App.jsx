import React, { useEffect, useState } from 'react'
import Search from './components/Search'

// API - Application Programming Interface:
//  - A set of rules that allows one software application to talk to another.
// The following is the URL of the TMDB database for requesting the most popular movies.
const API_BASE_URL = "https://api.themoviedb.org/3";
// Get access to the API key. 
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// Defining the API options. 
const API_OPTIONS = {
  // Defining the method as 'GET', as we want to get the movies.
  method: 'GET',
  header: {
    // We can define what kind of data we accept in our application. 
    accept: 'application/json', // Which means that the API will send back a json object similar to a basic JavaScript object 
    // Authenticate the API. That will verify who is trying to make the request
    Authorization: `Bearer ${API_KEY}`
  }
};

// Defining the 

// Main App function component.
const App = () => {

  // Create the Search film component
  const [searchTerm, setSearchTerm] = useState("");

  // Create a useEffect hook for fetching the data. That will only load at the start, by using the empty dependency array [].
  useEffect(() => {

  }, [])

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
