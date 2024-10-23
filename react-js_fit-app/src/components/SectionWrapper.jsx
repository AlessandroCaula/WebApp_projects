import React from 'react'

// Props are parameters from a parent (Generator) component that are passed as props to the children (SectionWrapper) component.
export default function SectionWrapper(props) {
  // Destructuring the props. !!! Order of props does not matter. !!! Prop names in the child component must match what the parent provides. !!! If you don't know all the props, you can use the rest operator (...rest) to capture any extra props.
  // The children is the Header component passed from the Generator component. 
  const { children, header, title } = props;
  // Another way of accessing the props can be: props.children - props.header - propr.title 
  return (
    // Now we can render the children contents. // The flex alone is for the display: flex
    <section className='min-h-screen flex flex-col gap-10'>
      {/*At the top we are going to have a div, which is going to be the banner at the top of the section*/}
      <div className='bg-slate-950 py-10 flex flex-col gap-2 justify-center items-center p-4'>
        <p className='uppercase font-medium'>{header}</p>
        {/*Differently color the central title*/}
        {/*Teh sm:text-3xl means that the text size will be set to 3xl (extra large) when teh viewport (screen width) reaches the sm breakpoint or larger (which is typically equal to 640pxls). 
        !!! Basically, on screens smaller than 640px, the text size will remain aat the default. On screens 640px or wider, the text size will become 3xl*/}
        {/* - sm (small) breakpoint at 640. - md (medium) breakpoint at 768px. - lg (large) breakpoint at 1024px. - xl (extra-large) breakpoint at 1280px */}
        <h2 className='font-semibold text-3xl sm:text-3xl md:text-5xl lg:text-7xl'>{title[0]} <span className='uppercase text-blue-400'>{title[1]}</span> {title[2]}</h2>
      </div>
      <div className='max-w-[800px] w-full flex flex-col mx-auto gap-10 p-4'>
        {children}
      </div>
    </section>
  )
}
