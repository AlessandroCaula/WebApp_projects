// Everything that we will apply to this layout, is going to be applied only on the pages within this route group.

import Navbar from "../Components/Navbar";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
      <main className="font-work-sans">
        {/* Rendering a NavBar in all the routes in the (root) route */}
        <Navbar />

        {/* Rendering all the children */}
        { children }
      </main>
    );
}
