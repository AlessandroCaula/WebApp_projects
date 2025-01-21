import React from "react";
import Navbar from "../components/Navbar";

// Creating a new layout file. This means that what we apply to this layout will only be applied to the pages within this route group.
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      {/* Importing the navBar as a self closing component, that will be rendered on top of every other children route of this (root) */}
      <Navbar />

      {/* After the nav bar, that will be rendered on every route page, render all the children of the (root) */}
      { children } 
    </main>
  )
}