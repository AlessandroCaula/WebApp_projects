import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* The pink_container is defined in the global.css file. */}
      <section className="pink_container">
        {/* The heading class is defined in the global.css file as a custom style class */}
        <h1 className="heading">Pitch Your Startup, <br/> Connect With Entrepreneurs</h1>

        {/* !max-w-3xl => the ! will force the max-w-3xl to override what it is the style in the sub-heading class of the global.css */}
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
        </p>

      </section>
    </>
  );
}
