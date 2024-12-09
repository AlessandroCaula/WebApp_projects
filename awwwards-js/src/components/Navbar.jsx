import React, { useEffect, useRef, useState } from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';

// Defining out Nav Items that we will then map through and display in the Right side of the Nav bar. 
const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];

const Navbar = () => {

  // Creating a useState that indicates whether the audio is playing or not.
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  // Define another useState for the audio indicator to check whether is active or not. 
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // Providing a way to directly access the DOM element associated with the React Component. The <div> element which has the ref={navContainerRef}
  const navContainerRef = useRef(null);
  // Creating a new Ref that will allow us to attach audio to the <audio> element which as the audioElementRef as ref. 
  const audioElementRef = useRef(null);

  // Create a new function that will allow to play the music when the button is clicked. 
  const toggleAudioIndicator = () => {
    // Set the isAudioPlaying to the opposite of the previous value of that state.
    setIsAudioPlaying((prev) => !prev);
    // We do the same thing with the isIndicatorActive variable.
    setIsIndicatorActive((prev) => !prev);
  }

  // Creating a useEffect, to which we have to pass a callback function and a dependency array. We want to recall it every time the isAudioPlaying variable changes. 
  useEffect(() => {
    if (isAudioPlaying) {
      // audioElementRef is a useRef object that holds a reference to the <audio> element in the DOM. this allows direct interaction with the DOM element without re-rendering the component. 
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying])

  return (
    <div
      ref={navContainerRef}
      className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'
    >
      <header className='absolute top-1/2 w-full -translate-y-1/2'>
        {/* Adding a Nav element */}
        <nav className='flex size-full items-center justify-between p-4'>
          {/* Creating the left side of the nav bar */}
          <div className='flex items-center gap-7'>
            <img
              src='/img/logo.png'
              alt='logo'
              className='w-10'
            />

            {/* Rendering the custom Button */}
            <Button
              id={"product-button"}
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* Right side of the Nav Bar */}
          <div className='flex h-full items-center'>
            {/* The following <div> will be typically hidden (not visible) in smaller devices, but it will be visible on medium and larger devices (block) */}
            <div className='hidden md:block'>
              {/* Within it we can map over out nav items and return an anchor tag <a> for each item */}
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  // nav-hover-btn => Special style class.
                  className='nav-hover-btn'
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Create the button that will allow to play the audio */}
            {/* For this button, we will use a regular button, not the custom one */}
            <button
              className='ml-10 flex items-center space-x-0.5'
              onClick={toggleAudioIndicator}
            >
              {/* Render the audio element */}
              <audio
                ref={audioElementRef}
                className='hidden'
                src='/audio/loop.mp3'
                loop // Loop the audio when it finishes to play.
              >
                {/* While the audio is playing we also want to show some audio lines that move up and down to indicate that the audio is playing */}
                {/* In order to achieve that we can map over an array */}
                {[1, 2, 3, 4].map((bar) => (
                  // For each bar we will return a div.
                  <div
                    key={bar}
                    className={`indicator-line ${isIndicatorActive ?
                        'active' :
                        ' '
                      }`} 
                    style={{animationDelay: `${bar * 0.1}s`}} // The value of bar is multiplied by 0.1 to calculate the animation delay. I.e. If the bar is 1, the delay is 0.1s. If the bar is 2 the delay is 0.2s.
                  />
                ))}
              </audio>
            </button>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar