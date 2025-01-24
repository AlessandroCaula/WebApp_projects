import Image from "next/image";
import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup <br/> Connect With Entrepreneurs</h1>
        {/* We use the exclamation mark ! to override some other style previously provided to this element (in this case in the sub-heading global class)*/}
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>

        {/* Add the input field functional component */}
        <SearchForm />
      </section>
    </>
  );
}
