import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';

// API - Application Programming Interface:
//  - A set of rules that allows one software application to talk to another.
// The following is the URL of the TMDB database for requesting the most popular movies.
const API_BASE_URL = 'https://api.themoviedb.org/3';
// Get access to the API key. 
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// Defining the API options. 
const API_OPTIONS = {
  // Defining the method as 'GET', as we want to get the movies.
  method: 'GET',
  headers: {
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
  // Create the state in which we will store all the movies that have been fetched. An empty list will be the initial value.
  const [moviesList, setMoviesList] = useState([]);
  // Defining the loading state variable. 
  // Because when you are fetching something from an API, it takes time, so while that data is loading, you want to show some kind of loader to the user.
  const [isLoading, setIsLoading] = useState(false);

  // Defining the function used to fetch those movies. Which will an async function. 
  // The fetchMovies will accept the a query, that will be the film searched by the user, otherwise an empty string.
  const fetchMovies = async (query = '') => {
    // Turn on the loading
    setIsLoading(true);
    // Set the errorMessage to nothing, cause it does not exist yet.
    setErrorMessage('');

    // Open a try catch block if something fails when fetching the data 
    try {
      // Define the exact endpoint that we are trying to call. 
      // That will be equal to a template string, where we put together the API base URL.
      // Change the endpoint based on whether the user query is present or not. 
      // The encodeURIComponent ensures that special character (such as spaces, punctuation, and other non-ASCII characters) are properly encoded so that they can be safety transmitted over the internet. 
      const endpoint = query 
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      // Once we have the endpoint we can try to call it.
      // The fetch() is a built in JavaScript function that allows you to make HTTP requests, like get or post to different apis or servers.
      const response = await fetch(endpoint, API_OPTIONS);

      // Parse the response into a json object 
      if (!response.ok) {
        // Trowing an error if the data has not been fetched. 
        throw new Error('Failed to fetched movies.');
      }
      // If the response is ok, we can get the data. 
      const data = await response.json();
      // Console log the data, to see what we have.
      console.log(data);

      if (data.Response === 'False') {
        // If it fails to load.
        setErrorMessage(data.Error || 'Failed to fetch movies');
        // Set the movieList to an empty list
        setMoviesList([]);
        return;
      }
      // If everything went smooth, and you succeed set the movieList and populate it with all the movie data. 
      setMoviesList(data.results || []);

      // // To check if the data has been correctly fetched. 
      // alert('Data Fetching Completed');
      // // Simulating an wrong call while fetching the data by throwing an error
      // throw new Error('Failed to fetch the movies');

    } catch (error) {
      console.log(`Error fetching movies ${error}`);
      // If we catch any error, set the errorMessage state variable
      setErrorMessage("Error fetching data. Please try again later.");
    } finally {
      // No matter if we succeed in loading the data or not, but we want to stop the loading. 
      setIsLoading(false);
    }
  }

  // Create a useEffect hook for fetching the data. That load at the start, and whenever the searchTerm is changed (cause the user input a film), recall the fetch data. Therefore add it to the dependency array
  useEffect(() => {
    // Call the fetch movies function to fetch the data as first load of the application. 
    // Passing the search term, that will be equal to the film searched by the user (when searched)
    fetchMovies(searchTerm);
  }, [searchTerm])

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

          <h2 className='mt-[40px]'>All Movies</h2>

          {/* Conditional rendering */}
          {/* First check if we are currently loading. And open up a ternary operator */}
          {/* If we are not loading, check if an error message exist */}
          {/* If we are not loading and there is no error message, then show an unordered list. */}
          {isLoading ? (
            // Showing if it is loading the Spinner component
            <Spinner />
            // <p className='text-white'>Loading...</p>
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {/* Inside the unordered list, we are gonna map over the movie list and render them */}
              {/* If after the => you put the {} you then have to return(element) something, while you can use the immediate return by using directly => () */}
              {moviesList.map((movie) => (
                // Provide a key to each one of the elements. This is needed especially if you're deleting some of these elements from the list, cause react might "confuse" the two elements together and not be sure of what to render. 

                // Render the movie card. Give it the movie.id as key and passing the movie as the prop to the component. 
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
          {/* If there is an error message then render a <p> tag. Using dynamic rendering */}
          {/* {errorMessage && <p className='text-red-500'>{errorMessage}</p>} */}
        </section>
      </div>
    </main>
  )
}

export default App
