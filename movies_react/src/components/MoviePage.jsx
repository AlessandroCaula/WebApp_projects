const MoviePage = ({ selectedMovie }) => {
  return (
    <div className='movie-page'>
      {/*  className='movie-detail' */}
      <div className='movie-page-content overflow-auto'>
        {/* Adding the title on the card */}
        <h2 className='text-white mb-10'>{selectedMovie.title}</h2>
        {/* Body of the Movie Detail */}
        <div className="flex flex-row max-md:flex-col">
          {/* Left section: Poster, Rating, Year */}
          <div className="flex flex-col items-start">
            {/* Rendering the movie poster if it is present */}
            <img
              src={selectedMovie.poster_path
                ? `http://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`
                : 'no-movie.png'}
              alt={selectedMovie.title}
              className="w-77 h-auto mb-4"
            />
            {/* Adding the rating and year of the film */}
            <div className="flex mt-3 items-center flex-wrap gap-2">
              {/* Adding the rating of the year */}
              <div className="flex flex-row items-center gap-1">
                {/* Add the star image for the rating */}
                <img src="star.svg" className="size-4 object-contain" />
                {/* Add the rating */}
                <p className="text-white font-bold text-base">
                  {selectedMovie.vote_average ? selectedMovie.vote_average.toFixed(1) : 'N/A'} &nbsp;
                  <span className="text-gray-100 font-medium text-base">({selectedMovie.vote_count ? selectedMovie.vote_count : 'N/A'})</span>
                </p>
              </div>
              {/* Put one dot for separation */}
              <span className="text-sm text-gray-100">•</span>
              <p className="capitalize text-gray-100 font-medium text-base">
                {selectedMovie.original_language ? selectedMovie.original_language : 'N/A'}
              </p>
              <span className="text-sm text-gray-100">•</span>
              <p className="text-gray-100 font-medium text-base">{selectedMovie.release_date}</p>
            </div>
          </div>

          {/* Right section */}
          <div className="flex-1 max-md:mt-5 ml-10 max-md:ml-0">
            <p className="text-white">Description</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoviePage