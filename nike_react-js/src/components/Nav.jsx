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
import { navLinks } from '../constants';

const Nav = () => {
  return (
    // Header semantinc HTML element. Use the 'absolute' utility to position an element outside of the normal flow of the document, causing neighboring elements to act as if the element doesn't exist.
    // All this classes are going to make it appear on top of the other elements.  
    <header className='padding-x py-8 absolute z-10 w-full border'>
      {/* Navigation semantic HTML element */}
      {/* max-container is an additional style that we have added in the index.css */}
      {/* It is a flex container */}
      <nav className='flex justify-between items-center max-container border'>
        {/* The <a> (anchor tag) element is used to define hyperlinks, which are fundamental way to navigate between web pages or sections within a page, as well as to link to external resources. 
        <a href="URL" target="_target">Link Text</a> */}
        <a href="/">
          <img
            src={headerLogo}
            alt='Logo'
            width={129}
            height={29}
            className='m-0 w-[129px] h-[29px]'
          />
        </a>
        {/* Creating the link near the nike logo. Just with an unordered list. With max-lg:hidden means that it is only going to visible on desktop devices */}
        {/* max-lg:hidden => hides the element only when the screen width is less than or equal to the lg brackpoint (1024px in this case) */}
        <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden border'>
          {/* Mapping through the navLinks and put them as items in the unordered list */}
          {/* When you use => () it is an immediate returns, rather then when using => {} */}
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className='font-montserrat leading-normal text-lg text-slate-gray border'
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        {/* The haburger is only going to be visible on mobile, small screens. Usually is hidden but on max-lg is going to be block (so visible)*/}
        <div className='hidden max-lg:block border'>
          <img
            src={hamburger}
            alt='Hamburger'
            width={25}
            height={25}
          />  
        </div>
      </nav>
    </header>
  )
}

export default Nav