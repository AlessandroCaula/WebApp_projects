// This will be the function component used for the input "like search bar"
// !! If this is going to be a form (and it will) can we ensure that this will be rendered on the server side and not in the client side? Up to this point that would have been impossible, but with react 19 forms, the new form elements now provide prefetching and UI loading, client side navigation on submission and progressive enhancement.
// In simple NextJS now supports a new form component which is used to automatically update URL search parameters and reduce the boilerplate code to achieve the anything.
// https://nextjs.org/docs/app/api-reference/components/form
import Form from "next/form";
import SearchFormReset from "./SearchFormReset";

const SearchForm = ({ query }: { query?: string }) => {

  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search Startups"
      />

      {/* If the user has typed something into it, we can the provide a button to reset the form */}
      <div className="flex gap-2">
        {/* If we have an active query we want to render a button that would allow us to reset it */}
        {/* !! Even if the form itself will be a serve side component the button and the onClick are still client side, so we have to extract it into a new component and simply render it here. */}
        {query && <SearchFormReset />}

        <button type="submit" className="search-btn text-white">
          S
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
