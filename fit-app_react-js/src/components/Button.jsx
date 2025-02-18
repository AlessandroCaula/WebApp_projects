import React from 'react'

// This button component, is created in order to avoid repeating the same botton for the "Accept & Begin" and the button at the end of the page. 
// The text that the button should display is then passed within the props.
export default function Button(props) {
	const { text, func } = props;
	return (
		//*When the Formulate button is clicked, then call the updateWorkout or updateAcceptedDisclaimer function to generate the workout or accept the disclaimer.
		<button onClick={func} className='px-8 py-4 mx-auto rounded-md border-[2px] bg-slate-950 border-blue-400 border-solid blueShadow duration-200'>
			<p>{text}</p>
		</button>
	)
}
