import React from 'react'
import { FaDiscord, FaGithub, FaTwitch, FaTwitter } from 'react-icons/fa'

// Create an array which will contain all the different links. This will be an array of objects, each one with a href (pointing to the link) and an icon.
const links = [
  { href: 'http://discord.com', icon: <FaDiscord /> },
  { href: 'http://twitter.com', icon: <FaTwitter /> },
  { href: 'http://github.com', icon: <FaGithub /> },
  { href: 'http://twitch.com', icon: <FaTwitch /> },
]

const Footer = () => {
  return (
    // Using a semantic footer tag
    <footer
      className='w-screen bg-violet-300 py-4 text-black'
    >
      {/* Within the footer, render a div */}
      <div className='container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row'>
        <p className='text-center text-sm md:text-left'>
          &copy; Nova 2024 All rights reserved
        </p>

        {/* Create the links to the actual socials and different platforms */}
        {/* This <div> will be the container of all these links */}
        <div className='flex justify-center gap-4 md:justify-start'>
          {/* Map over the array of links and render them */}
          {links.map((link) => (
            // Return an <a> (anchor) tag
            <a key={link} href={link.href} target='_blank' rel='noopener noreferrer' className='text-black transition-colors duration-500 ease-in-out hover:text-white'>
              {link.icon}
            </a>
          ))}
        </div>
        {/* Create a final anchor tag */}
        <a href='#privacy-policy' className='text-center text-sm hover:underline md:text-right'>
          Privacy Policy
        </a>
      </div>
    </footer>
  )
}

export default Footer