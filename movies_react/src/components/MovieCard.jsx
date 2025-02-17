// Movie Card component. Destructuring the properties from the movie object itself.
const MovieCard = ({ movie, handleOpenMovie }) => {
  // Deconstruct the properties from the movie object
  const { poster_path, title, vote_average, original_language, release_date } = movie;

  return (
    // When the card is clicked, when onClick, call the handleMovieClick function.
    <div className="movie-card" onClick={() => handleOpenMovie(movie)}>
      {/* Render the poster of the movie only if the poster path exists. Else render the no-movie image */}
      <img src={poster_path ? `http://image.tmdb.org/t/p/w500/${poster_path}` : 'no-movie.png'} alt={title} />

      {/* Rendering the title of the movie */}
      <div className="mt-4">
        <h3>{title}</h3>

        {/* Rendering the content of the movie */}
        <div className="content">
          {/* Rendering the rating of the movie */}
          <div className="rating">
            {/* Rendering the star img */}
            <img src="star.svg" />
            {/* Put the average vote (if it exists) for the movie aside the star icon */}
            {/* toFixed(1) => Rounding the number to the first fraction digit. */}
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>
          {/* Put one dot for separation */}
          <span>•</span>
          <p className="lang">{original_language}</p>
          <span>•</span>
          <p className="year">
            {/* Only tendering the year of the release date if it exists */}
            {release_date ? release_date.split('-')[0] : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard