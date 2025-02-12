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


// Main App function component.
const App = () => {

  // Create the Search film component
  const [searchTerm, setSearchTerm] = useState('');
  // In order to display any fetching error in the browser, define a new useState variable
  const [errorMessage, setErrorMessage] = useState('');

  // Defining the function used to fetch those movies. Which will an async function. 
  const fetchMovies = async () => {
    // Open a try catch block if something fails when fetching the data 
    try {
      // Define the exact endpoint that we are trying to call. 
      // That will be equal to a template string, where we put together the API base URL 
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      // Once we have the endpoint we can try to call it.
      // The fetch() is a built in JavaScript function that allows you to make HTTP requests, like get or post to different apis or servers.
      const response = await fetch(endpoint, API_OPTIONS);

      // // To check if the data has been correctly fetched. 
      // alert(response);
      // // Simulating an wrong call while fetching the data by throwing an error
      // throw new Error('Failed to fetch the movies');

    } catch (error) {
      console.log(`Error fetching movies ${error}`);
      // If we catch any error, set the errorMessage state variable
      setErrorMessage("Error fetching data. Please try again later.");
    }
  }

  // Create a useEffect hook for fetching the data. That will only load at the start, by using the empty dependency array [].
  useEffect(() => {
    // Call the fetch movies function to fetch the data as first load of the application
    fetchMovies();
  }, [])

  return (
    <main>
      <div className='pattern' />

      {/* Create the header */}
      <div className='wrapper'>
        <header>
          {/* Rendering the hero-img */}
          <img src='./hero-img.png' alt='Hero Banner' />
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>

          {/* Passing the search term and setSearchTerm to the Search component */}
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {/* To check that while typing the searchTerm is being updated
          <h1 className='text-white'>{searchTerm}</h1> */}
        </header>

        {/* Section about movies */}
        <section className='all-movies'>
          <h2>All Movies</h2>

          {/* If there is an error message then render a <p> tag. Using dynamic rendering */}
          {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        </section>
      </div>
    </main>
  )
}

export default App
