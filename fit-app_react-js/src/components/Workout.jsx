import React from 'react'
import SectionWrapper from './SectionWrapper';
import ExerciseCard from './ExerciseCard';

// Function component used to display the Generated Workout.
export default function Workout(props) {
  // Destructuring the props.
  const { workout } = props;

  return (
    // Using the sectin wrapper
    <SectionWrapper id={'workout'} header={"welcome to"} title={["The", "DANGER", "zone"]}>
      {/*Designing the workout layuot*/}
      <div className='flex flex-col gap-4'>
        {/*Looping through all the elements (exercises) of the workout and create an Exercise Card for each of them.*/}
        {workout.map((exercise, i) => {
          // Return the Exercise Card.
          return (
            // Rendering the Exercise Card. 
            // !! Always define a unique key (equal to the index) for each component that has been created iteratively.
            <ExerciseCard exercise={exercise} i={i} key={i}/>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
