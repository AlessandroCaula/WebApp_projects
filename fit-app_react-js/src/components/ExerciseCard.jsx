import React, { useState } from 'react'

export default function ExerciseCard(props) {

    // Deconstructure the props.
    const { exercise, i } = props;
    // Define the useState variable for the setsCompleted. The default value is 0.
    const [setsCompleted, setSetsCompleted] = useState(0);

    // Define the function that increment the Sets Counts. 
    function handleSetIncrement() {
        // Setting the setsCount by incrementing it by one UP to 5 (5 is the maximum).  
        setSetsCompleted((setsCompleted + 1) % 6);
    }

    return (
        // Define the style of the Exercise Card.
        <div className='p-4 rounded-md flex flex-col gap-4 bg-slate-950 sm:flex-wrap'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-x-4'>
                <h4 className='text-3xl hidden sm:inline sm:text-4xl md:text-5cl font-semibold text-slate-400'>
                    0{i + 1}
                </h4>
                <h2 className='capitalize whitespace-nowrap truncate max-w-full text-lg sm:text-xl md:text-2xl flex-1 sm:text-center'>{exercise.name.replaceAll("_", " ")}</h2>
                <p className='text-sm text-slate-400 capitalize'>{exercise.type}</p>
            </div>
            <div className='flex flex-col'>
                <h3 className='text-slate-400 text-sm'>Muscle Group</h3>
                <p className='capitalize'>{exercise.muscles.join(' & ')}</p>
            </div>

            <div className='flex flex-col bg-slate-950 rounded gap-2'>
                {exercise.description.split('___').map((val) => {
                    return (
                        <div className='text-sm'>
                            {/*Rendering out the description of the exercise to do*/}
                            {val}
                        </div>
                    )
                })}
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-4 sm:place-items-center gap-2'>
                {/*We are gonna map out this array as info*/}
                {['reps', 'rest', 'tempo'].map((info) => {
                    return (
                        <div key={info} className='felex flex-col p-2 rounded border-[1.5px] border-solid border-slate-900 w-full'>
                            <h3 className='capitalize text-slate-400 text-sm'>{info === "reps" ? `${exercise.unit}` : info}</h3>
                            <p className='font-medium'>{exercise[info]}</p>
                        </div>
                    )
                })}
                <button onClick={handleSetIncrement} className='flex flex-col p-2 rounded border-[2px] duration-200 border-solid border-blue-900 hover:border-blue-600 w-full'>
                    <h3 className='text-slate-400 text-sm capitalize'>Sets completed</h3>
                    <p className='font-medium'>{setsCompleted} / 5</p>
                </button>
            </div>
        </div>
    )
}
