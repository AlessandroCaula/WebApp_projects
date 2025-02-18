// Search function component. The props could also the destructured in the function call ({searchTerm, setSearchTerm}) => {}
const Search = (props) => {
  // Destructuring the props.
  // !! Props should never be changed by the child component, they are read-only.
  const { searchTerm, setSearchTerm } = props;
  return (
    <div className="search">
      <div>
        {/* Rendering the search svg image */}
        <img src="./search.svg" alt="search" />
        {/* Input element */}
        {/* It's very often handled in this way. The value is equal searchTerm and when clicking any key, the onChange handler, will set the searchTerm to the text in the input element that the user it typing. */}
        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchTerm}
          // When you search for something, then with the onChange handler set the new searchTerm.
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Search