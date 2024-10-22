import React from 'react'

// Props are parameters from a parent (Generator) component that are passed as props to the children (SectionWrapper) component.
export default function SectionWrapper(props) {
  // Destructuring the props. !!! Order of props does not matter. !!! Prop names in the child component must match what the parent provides. !!! If you don't know all the props, you can use the rest operator (...rest) to capture any extra props.
  const { children, header, title } = props;
  // Another way of accessing the props can be: props.children - props.header - propr.title 
  return (
    // Now we can render the children contents. // The flex alone is for the display: flex
    <section className='min-h-screen flex flex-col gap-10'>
      {/*At the top we are going to have a div*/}
      <div className='bg-slate-950 py-10 flex flex-col gap-4 justify-center items-center'>
        <p>{header}</p>
      </div>
    </section>
  )
}
