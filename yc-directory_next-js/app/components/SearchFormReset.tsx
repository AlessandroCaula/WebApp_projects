// Using the "use client" directive to turn only this small part of the UI into a client component
"use client"

import Link from "next/link";

const SearchFormReset = () => {
  // Define the reset function that will be called when the user click the button in the input space for resetting its value
  const reset = () => {
    // First getting access to the form
    const form = document.querySelector(".search-form") as HTMLFormElement;

    // Then if the form exist, we are simply gonna reset it.
    if(form) form.reset();
  };

  return (
    <button type="reset" onClick={reset}>
      <Link href="/" className="search-btn text-white">
        X
      </Link>
    </button>
  );
};

export default SearchFormReset;
