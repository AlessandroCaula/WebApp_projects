import React, { useState } from 'react'
import SectionWrapper from './SectionWrapper'
import { WORKOUTS } from '../utils/swoldier';

// Creating a new compoenent as an arrow function. 
const Header = (props) => {
  // Deconstruct the props.
  const { index, title, description } = props;
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-center gap-2'>
        <p className='text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400'>{index}</p>
        <h4 className='text-xl sm:text-2xl md:text-3xl'>{title}</h4>
      </div>
      <p className='text-sm sm:text-base mx-auto'>{description}</p>
    </div>
  )
};

export default function Generator() {

  // The state that condition when the "drop down" of the "Select muscle group" button is visible or not.
  // !!!! The States are the only things that makes the React app interactive to user interaction (when a variable changes and consequently we expect something to change in the screen)!!!!! When the State variable, the screen is repainted. 
  const [showModal, setShowModal] = useState(false);
  // Function that is called when the "Select muscle group" is clicked, for turning showModal to true.
  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    // Here for the SectionWrapper component we have the opening and close tags, and the reason we are doing that is because we want children content within the SectionWrapper. 
    // So for example, when just created, if you write something between the SectionWrapper tags, it won't be rendered on the webpage. Only the things inside the SectionWrapper tag will be rendered.
    // The way that we can then get the childre contet to display is via props. !!! So the children content is just anything that is in the parent components wrapped between the tags of the children component. 
    // We are also gonna pass some content via attribute style props (in this case for some banners, like the header one). Passing some values as JavaScript code, some variables. For the header a string, for the title an array fo strings.
    <SectionWrapper header={"generate your workout"} title={["It's", "Huge", "o'clock"]}>
      {/*If you put something here, it will be passed as props to the (children) SectionWrapper component*/}
      {/*Render the Header component from the SectionWrapper component. The Header component will be "passed" and rendered from the SectionWrapper*/}
      <Header index={'01'} title={'Pick your poison'} description={'Select the workout you whish to endure.'} />
      {/*Now in this section there will be some buttons. Instead of creating 4 different buttons, or create a button component to render them 4 times, we are gonna map out the different 
       type of wourkout that are present in the swoldiers file (WORKOUT: individual - bro_split - bodybuilder_split - upper_lower).*/}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        {/*With the following code, a button will be created every single type of workout.*/}
        {/*The Object.keys(WORKOUTS).map((type, typeIndex) is mapping over the keys of the WORKOUTS objects, which contains various workout categories. 
        The Object.keys() method returns an array of the keys from the WORKOUT object, and map() is used to iterate over that array.
        1.  Object.keys(WORKOUTS) => returns an arry of the keys drom the WOURKOUT object. ['individual', 'bro_split', 'bodybuilder_split', 'upper_lower']
        2.  map() => iterates over the array of keys returned by Object.keys(). 
            type => is each key in the array (e.g. 'individual', 'bro_spli', ect.)
            typeIndex => is the index of the current key in the array (e.g., 0 for 'individual', 1 for 'bro_split', etc.).*/}
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          {/*With the map, whenever you render content like we are doing, we have to give the parent element within the return statement a key tht is unique, that's why we are given the index of the key (typeIndex)*/}
          return (
            <button className='bg-slate-950 border border-blue-400 duration-200 hover:border-blue-600 py-3 rounded-lg' key={typeIndex}>
              <p className='capitalize'>{type.replaceAll('_', ' ')}</p>
            </button>
          )
        }
        )}
      </div>
      
      {/*Replicate another Header section*/}
      <Header index={'02'} title={'Lock on targets'} description={'Select the muscle judge for annihilation.'} />
      <div className='bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col'>
        {/*Adding the onClick event on this button, so that when it is clicked, the showModal comes true and the modals are displayed.*/}
        <button onClick={toggleModal} className='relative p-3 flex items-center justify-center'>
          <p>Select muscle group</p>
          <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down"></i>
        </button>
        {/*Show the "drop down" menu if the showModal is true. It is not a drop down, it is just a button, that gets filled with buttons of the muscles when the showModal is true.*/}
        {showModal && (
          <div className='px-3'>modal</div>
        )}
      </div>

    </SectionWrapper>
  )
}
