import React from 'react'
import SectionWrapper from './SectionWrapper';

// Function component used to display the Generated Workout.
export default function Workout(props) {
  // Destructuring the props.
  const { workout } = props;

  return (
    // Using the sectin wrapper
    <SectionWrapper header={"welcome to"} title={["The", "DANGER", "zone"]}>
      {/*Designing the workout layuot*/}
      <div className='flex flex-col gap-4'>
        {workout.map((exercise, i) => {
          // Return the Exercise Card.
          // return (

          // )
        })}
      </div>
    </SectionWrapper>
  )
}
