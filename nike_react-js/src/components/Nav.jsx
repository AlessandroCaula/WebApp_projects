// This component is going to be the Navigation bar. 

// When creating the HTML element, try to always use the Semantic Elements !! 
// A semantic element clearly describes its meaning to both the browser and the developer. 
// - Example of NON-SEMANTIC elements: <div> and <span> - Tells nothing about its content. 
// - Example of SEMANTIC elements: <form>, <table> and <article> - Clearly defines its content. 
//
// In HTML there are some semantic elements that can be used to define different parts of a web page:
/* 
- <header>: Introductory content or navigational links.
- <nav>: Section containing navigation links.
- <main>: The main content of the document.
- <section>: A thematic grouping of content, typically with a heading.
- <article>: A self-contained composition in a document (e.g., blog post).
- <aside>: Content indirectly related to the main content (e.g., sidebars).
- <footer>: Footer for its nearest sectioning content.
- <figure> and <figcaption>: Self-contained content like images with captions.
- <details> and <summary>: Interactive disclosure widgets.
- <dialog>: Dialog boxes or interactive overlays.
- <mark>: Highlighted text. 
*/

import { headerLogo } from '../assets/images';
import { hamburger } from '../assets/icons';

const Nav = () => {
  return (
    // Header semantinc HTML element
    <header className='padding-x py-8 absolute '>
      {/* Navigation semantic HTML element */}
      <nav>
        {/* The <a> element is used to define hyperlinks, which are fundamental way to navigate between web pages or sections within a page, as well as to link to external resources. 
        <a href="URL" target="_target">Link Text</a> */}
        <a href="/">
          <img
            src={headerLogo}
            alt='Logo'
            width={130}
            height={29}
          />
        </a>
      </nav>
    </header>
  )
}

export default Nav