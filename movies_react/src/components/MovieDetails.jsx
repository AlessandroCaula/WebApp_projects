const MovieDetails = ({ selectedMovie }) => {
  return (
    <div className='movie-detail'>
      {/*  className='movie-detail' */}
      <div>
        {/* Adding the title on the card */}
        <h2 className='text-white mb-10'>{selectedMovie.title}</h2>
        {/* Body of the Movie Detail */}
        <div className="flex">
          {/* Left section: Poster, Rating, Year */}
          <div className="flex flex-col">
            {/* Rendering the movie poster if it is present */}
            <img
              src={selectedMovie.poster_path
                ? `http://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`
                : 'no-movie.png'}
              alt={selectedMovie.title}
              className="w-82 h-auto mb-4"
            />
            {/* Adding the rating of the film */}
            <p className="text-white">Rating: </p>
            <p className="text-white">Year: </p>
          </div>
          
          {/* Right section */}
          <div className="flex">
            <p className="text-white">Description</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails