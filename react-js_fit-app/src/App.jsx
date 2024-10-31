import { useEffect, useState } from 'react'
import Generator from './components/Generator'
import Hero from './components/Hero'
import Workout from './components/Workout'
import { generateWorkout } from './utils/functions';

// !!! We are gonna use Tailwind to style our project. What Tailwind allows us to do is: !! to build custom designs directly in your HTML without writing traditional CSS !!
function App() {
    // Creating the workout component as a useState and assign a default of null to it. 
    const [workout, setWorkout] = useState(null);
    // To actually create the workout at the app level, we somehow need to access to all of the different preferences that we set in the Generator component. And there actually no way 
    // to pass state up through components. You can only pass them down (from parent to children). 
    // Therefore we neet to put all the useState variables that are defined and used in the Generator component here in the App (parent) component, and pass them to the Generator component as props.
    // Define a new useState which will be changed when the buttons in the "Pick your poison" is selected/clicked. The default value for this useState is going to be 'individual'
    const [poison, setPoison] = useState('individual');
    // Define a useState variable for teh muscle group button. The default value of this useState is an empty array, that will be then filled with the different muscles groups available for the type of poson (workout) you select
    const [muscles, setMuscles] = useState([]);
    // Define a useState for the goals. The default value is one of the SCHEME of the swoldier.js file.
    const [goal, setGoal] = useState('strength_power');
    // Define the useState for rendering the Generation section. 
    const [isAccepted, setIsAccepted] = useState(false);
    // Define a useState which will change its value in order to autoscroll the page when the Accept & BEgin is clicked. 
    const [isToScroll, setIsToScroll] = useState(false);

    // Create the function which will update the workout, with all the information gained from the Generator component and store in the above useState variables.
    function updateWorkout() {
        // Check if the the muscles array contains something. If everything has been correctly selected by the user.
        if (muscles.length < 1) {
            return;
        }
        console.log('Generating the workout');
        // Calling the generateWorkout function in the Function.js here. 
        let newWorkout = generateWorkout({ poison, muscles, goal });
        // Set the workout.
        setWorkout(newWorkout);
    }
    // Define the function that will set the isAccepted variable which will turn to true when is Accepted the first time. This function will be passed through the button component.
    function updateAcceptedDisclaimer() {
        if (!isAccepted) {
            setIsAccepted(true);
        }
        // Change the isToScroll variable in order to scroll the page when the Accept & Begin button is clicked. 
        setIsToScroll(!isToScroll);
    }

    // Define a useEffect that will ensure that the rendering of the page is finished when the Accept & Begin button is clicked, so that it will then change the id in order to auto-scroll to the Generator Section.
    // Sometimes, when setIsAccepted(true) updates the state, the page scroll happens before the React re-render completes. To ensure window.location.href executes after the state change, try using the useEffect hook to observe isAccepted changes
    useEffect(() => {
        // Set the id which will be used for autoscrolling the page when the Accept & Begin button is clicked.
        window.location.href = '#generate';
        // DO THIS WHEN THE isAccepted Variable is changed. 
    }, [isToScroll]);
    
    // Define another useEffect so to auto-scroll to the workout page. 
    useEffect(() => {
        // Set the id which will be used for autoscrolling the page when the Workout Button is clicked.
        window.location.href = '#workout';
    }, [workout]);

    // Importing the components inside the Hub of our application
    return (
        <main className='min-h-screen flex flex-col bg-gradient-to-r from-slate-800 to-slate-950 text-white text-sm sm:text-base'>
            <Hero updateAcceptedDisclaimer={updateAcceptedDisclaimer} />
            {/*Passing all the useStates to the Generator component. as well as the updateWorkout function, which is used to build the workout given the parameters chose in the Generator component*/}
            {/*Conditionally render the generator*/}
            {isAccepted && <Generator
                poison={poison} setPoison={setPoison}
                muscles={muscles} setMuscles={setMuscles}
                goal={goal} setGoal={setGoal}
                updateWorkout={updateWorkout}
            />}
            {/*Conditionally render the workout. Only when it exist we are going to render it.*/}
            {workout && (<Workout workout={workout} />)}
        </main>
    )
}

export default App
