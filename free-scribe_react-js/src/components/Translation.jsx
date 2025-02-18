import React from 'react'
import { LANGUAGES } from '../utils/presets';

// Component that is rendered when the Translation button is clicked. 
export default function Translation(props) {
  // Deconstruct the props. 
  const { textElement, toLanguage, setToLanguage, translating, generateTranslation } = props;

  return (
    <div className='flex flex-col gap-2 max-w-[400px] w-full mx-auto'>
      {/*Consitionally render what to display*/}
      {!translating && (<div className='flex flex-col gap-2'>
        <p className='text-sm sm:text-sm font-medium text-slate-500 mr-auto'>To language</p>
        <div className='flex items-stretch gap-2'>
          {/*The <select> element is a form control that lets users choose from a list of options. It's the HTML equivalent of a dropdown menu, and it can be implemented and controlled in React to reflect the chosen value in the application's state.*/}
          {/*onChange take the event and we are going to setToLanguage to the selected language of the drop down.*/}
          <select className='flex-1 outline-none bg-white focus:outline-none border border-solid border-transparent hover:border-blue-300 duration-200 p-2 rounded' value={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
            {/*In the <select> element, an <option> represent each item that users can choose from within the dropdown.*/}
            <option value={'Select language'}>Select language</option>
            {/*Map (iterate) through all the languages stored in the presets*/}
            {Object.entries(LANGUAGES).map(([key, value]) => {
              return (
                <option key={key} value={value}>{key}</option>
              )
            })}
          </select>
          <button onClick={generateTranslation} className='specialBtn px-3 py-2 rounded-large text-blue-400 hover:text-blue-600 duration-200'>Translate</button>
        </div>
      </div>)}
      {/*If there is the textElement, render the textElement*/}
      {textElement && !translating && (
        <p>{textElement}</p>
      )}
      {/*If the translating exists then render the wait spinner*/}
      {translating && (
        <div className='grid place-items-center'>
          <i className="fa-solid fa-spinner animate-spin"></i>
        </div>
      )}



    </div>
  )
}
