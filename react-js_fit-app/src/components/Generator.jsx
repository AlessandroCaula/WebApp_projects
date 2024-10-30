import React, { useState } from 'react'
import SectionWrapper from './SectionWrapper'
import { SCHEMES, WORKOUTS } from '../utils/swoldier';
import Button from './Button';

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

export default function Generator(props) {

  // Deconstruct all the useState variables that are passed through the parent App component down to this component.
  const { poison, setPoison, muscles, setMuscles, goal, setGoal, updateWorkout } = props;

  // The state that condition when the "drop down" of the "Select muscle group" button is visible or not.
  // !!!! The States are the only things that makes the React app interactive to user interaction (when a variable changes and consequently we expect something to change in the screen)!!!!! When the State variable, the screen is repainted. 
  const [showModal, setShowModal] = useState(false);
  // Function that is called when the "Select muscle group" is clicked, for turning showModal to true.
  function toggleModal() {
    setShowModal(!showModal);
  }

  // Define a function used to update the selection of the muscles. 
  function updateMuscles(muscleGroups) {
    console.log(muscles.length + 1);
    // Check if the muscles group is already present in the muscles list.
    // In case the user clicked a second time, always means that we have to remove it from the list.
    if (muscles.includes(muscleGroups)) {
      // When the user click the second time the same muscle groups, which is then already inserted in the list, it means that the user want to remove this muscle group.
      // Filtering out the muscle group that we want to remove. 
      setMuscles(muscles.filter(val => val !== muscleGroups));
      return;
    }
    // We will limit the number of muscles that they can train each time to three in this case. You won't be able to select more than 3 muscles at the time. No muscles overload ;)
    if (muscles.length > 2) {
      return;
    }
    // if the poison selected (the workout) is not the individual one, we are going to set the muscleGroups list.  
    if (poison !== 'individual') {
      setMuscles([muscleGroups]);
      // When selecting a muscles group not from the individual one, we will close the showModal.
      setShowModal(false);
      return;
    }
    // If it is none of the above cases, we will add it to the muscleGroups list.
    setMuscles([...muscles, muscleGroups]);

    if (muscles.length === 2) {
      setShowModal(false)
    }
  }

  return (
    // Here for the SectionWrapper component we have the opening and close tags, and the reason we are doing that is because we want children content within the SectionWrapper. 
    // So for example, when just created, if you write something between the SectionWrapper tags, it won't be rendered on the webpage. Only the things inside the SectionWrapper tag will be rendered.
    // The way that we can then get the childre contet to display is via props. !!! So the children content is just anything that is in the parent components wrapped between the tags of the children component. 
    // We are also gonna pass some content via attribute style props (in this case for some banners, like the header one). Passing some values as JavaScript code, some variables. For the header a string, for the title an array fo strings.
    // !! In the generator SectionWrapper, define the id that will be used to auto-scroll the page when the Accept & Begin button is clicked. 
    <SectionWrapper id={'generate'} header={"generate your workout"} title={["It's", "Huge", "o'clock"]}>
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
          {/*With the map, whenever you render content like we are doing, we have to give the parent element within the return statement a key tht is unique, that's why we are given the index of the key (typeIndex)*/ }
          return (
            // Instead of calling a function on the onClick event (what we do in the muscles selection with the toggleModal function, which is called on click) here we are gonna define an arrow function.
            // We are also giving some dynamic styling to the className of the button, by adding the {} and the + => when the condition is true (when the style is equal to the poison useState variable), the styles after the + will apply. Setting the border to border-blue-400 when the button is not clicked, and the permanent boder-blu-600 when it is clicked.
            <button onClick={() => {
              // When changing workout (poison) set as an empty array the muscles collection. 
              setMuscles([]);
              // Setting the useState poison variable with the value of the button, which is the type variable in this case. 
              setPoison(type);
            }} className={'bg-slate-950 px-4 border duration-200 hover:border-blue-900 py-3 rounded-lg' + (type === poison ? ' border-blue-900' : ' border-blue-400')} key={typeIndex}>
              <p className='capitalize'>{type.replaceAll('_', ' ')}</p>
            </button>
          )
        }
        )}
      </div>

      {/*02 Header Selection. For the Muscle groups.*/}
      <Header index={'02'} title={'Lock on targets'} description={'Select the muscle judge for annihilation.'} />
      <div className='bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col'>
        {/*Adding the onClick event on this button, so that when it is clicked, the showModal comes true and the modals are displayed.*/}
        <button onClick={toggleModal} className='relative p-3 flex items-center justify-center'>
          {/*Adding some conditional formatting based on the number of selected muscles*/}
          <p className='capitalize'>{muscles.length === 0 ? 'Select muscle group' : muscles.join(' - ')}</p>
          <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2  fa-caret-down"></i>
        </button>
        {/*Show the "drop down" menu if the showModal is true. It is not a drop down, it is just a button, that gets filled with buttons of the muscles when the showModal is true.*/}
        {/*Here we have to map all the muscles available for the selected workout object key (individual, bro_split, bodybuilder_split, upper_lowe). !!! We have to pay attention, sincle only the 'individual' keys return an entire array, not the others, which they have other objects, dict, inside.*/}
        {showModal && (
          <div className='flex flex-col pb-1 pl-3'>
            {/*In this way, only when individual is selected is going to return the entire array of the muscles, otherwise the keys of the other objects inside the WORKOUTS object. We then map each of the elements and create a button for each one.*/}
            {(poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison])).map((muscleGroups, muscleGroupsIndex) => {
              return (
                // Keep in mind that you have to have the unique key for these buttons. 
                // Define some conditional styling as well for the muscle selected.
                <button onClick={() => {
                  updateMuscles(muscleGroups);
                }} key={muscleGroupsIndex} className={'hover:text-blue-400 duration-200' + (muscles.includes(muscleGroups) ? ' text-blue-400' : ' ')} >
                  <p className='uppercase'>{muscleGroups.replaceAll('_', ' ')}</p>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/*03 Header Selection. For the Scheme Goals*/}
      <Header index={'03'} title={'Become Juggernaut'} description={'Select your ultimate object.'} />
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
          // As we did in the workout selection we are gonna create an arrow functin to set the goals useState function and we are gonna conditionally style the buttons when they are clicked and selected. 
          return (
            <button onClick={() => {
              // Set the setGoal useState variable with the scheme values, which is the value of the clicked button. 
              setGoal(scheme)
            }} className={'bg-slate-950 px-4 border duration-200 hover:border-blue-900 py-3 rounded-lg' + (scheme === goal ? ' border-blue-900' : ' border-blue-400')} key={schemeIndex}>
              <p className='capitalize'>{scheme.replaceAll('_', ' ')}</p>
            </button>
          )
        }
        )}
      </div>

      {/*Calling the Button component. The updateWorkout is passed then as a props to the Button compoentns, and when the Formulate button is clicked, the updateWorkout is called and the workout built.*/}
      <Button func={updateWorkout} text={'Formulate'}></Button>

    </SectionWrapper>
  )
}