import { copyrightSign } from "../assets/icons"
import { footerLogo } from "../assets/images"
import { footerLinks, socialMedia } from "../constants"

const Footer = () => {
  return (
    // Defining an HTML footer semantic tab
    <footer className="max-container">
      {/* max-lg:flex-col => Apply flex-col (flex container with a column direction) to the element when the screen width is smaller than the lg breakpoint (below 1024px by default) */}
      <div className="flex justify-between items-start gap-20 flex-wrap max-lg:flex-col border">
        {/* div that will contain the link (the nike logo) to the start of the page */}
        <div className="flex flex-col items-start border">
          {/* The <a> tag in HTML defines a hyperlink, used to link to another page, resource, or section. */}
          {/* href="/" => means home */}
          <a href="/">
            {/* Inside the <a> tag I'm gonna place an image */}
            <img
              src={footerLogo}
              width={150}
              height={46}
            />
          </a>
          {/* max-w-sm => setst the maximum width of an element to the predefined value for the sm size, which is typically 24rem. */}
          <p className="text-white-400 mt-6 text-base font-montserrat leading-7 sm:max-w-sm border">
            Get shoes ready for the new term at your nearest Nike store. Find your perfect size in store. Get rewards
          </p>
          <div className="flex items-center gap-5 mt-8 border">
            {/* Map over the social media icons */}
            {socialMedia.map((icon) => (
              // render a div for each social media icon.
              <div className="flex justify-center items-center w-12 h-12 border rounded-full bg-white">
                <img
                  src={icon.src}
                  alt={icon.alt}
                  width={24}
                  height={24}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Create a new section for the products, help and get in touch */}
        <div className="flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap border">
          {/* Loop(ing through the footer links */}
          {footerLinks.map((section) => (
            // create a div 
            <div key={section} className="border">
              <h4 className="text-white font-montserrat text-2xl leading-normal font-medium mb-6 border">{section.title}</h4>
              {/* Creating an unordered list <ul> */}
              <ul className="border">
                {section.links.map((link) => (
                  // For each link render a list item <li>
                  <li key={link.name} className="mt-3 font-montserrat text-base leading-normal text-white hover:text-slate-gray cursor-pointer border">
                    {/* that is going to have an <a> tag */}
                    <a>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Create a final div wrapping for the copyright */}
      <div className='flex justify-between text-white-400 mt-24 max-sm:flex-col max-sm:items-center border'>
        <div className='flex flex-1 justify-start items-center gap-2 font-montserrat cursor-pointer border'>
          <img
            src={copyrightSign}
            alt="copyright sign"
            width={20}
            height={20}
            className="rounded-full m-0 border"
          />
          <p className="border">Copyright. All rights reserved.</p>
        </div>
        <p className="font-montserrat border">Terms & Conditions</p>
      </div>
    </footer>
  )
}

export default Footer