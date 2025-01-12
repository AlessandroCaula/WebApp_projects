// Use the "use client" directive since it is a component rendered on the client side.
"use client"

import { X } from "lucide-react";
import Link from "next/link";

const SearchFormReset = () => {
  // create the reset function. 
  const reset = () => {
    // Accessing the form
    const form = document.querySelector('.search-form') as HTMLFormElement;
    // If the form exists
    if (form) {
      form.reset();
    }
  }
  
  return (
    <button type="reset" onClick={reset}>
      <Link href="/" className="search-btn text-white">
        <X className="size-5" />
      </Link>
    </button>
  )
}

export default SearchFormReset