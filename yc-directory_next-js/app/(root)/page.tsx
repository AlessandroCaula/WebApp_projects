import Image from "next/image";
import SearchForm from "../components/SearchForm";

// Access the query from the search parameter to the prop. On every single nextJS page you have access to the search params
export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }>}) {
  
  // Extract the query
  const query = (await searchParams).query;

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup <br/> Connect With Entrepreneurs</h1>
        {/* We use the exclamation mark ! to override some other style previously provided to this element (in this case in the sub-heading global class)*/}
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>

        {/* Add the input field functional component */}
        {/* Pass the query to the search form */}
        <SearchForm query={query}/>
      </section>
    </>
  );
}
