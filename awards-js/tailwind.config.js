/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Extending our themes 
    extend: {
      // Adding the font families imported. 
      fontFamily: {
        zentry: ['zentry', 'sans-serif'],
        general: ['general', 'sans-serif'],
        'circular-web': ['circular-web', 'sans-serif'],
        'robert-medium': ['robert-medium', 'sans-serif'],
        'robert-regular': ['robert-regular', 'sans-serif']
      },
      // Extend the colors used in the out project.
      colors: {
        // Create different shades of blue.
        blue: {
          // Color code are picked from the color picker.
          50: '#dfdff0',
          75: '#dfdff2',
          100: '#f0f2fa',
          200: '#010101',
          300: '#4fb7dd',
        },
        // Create a variation of violet.
        violet: {
          300: '#5724ff',
        },
        // Variation of yellow
        yellow: {
          100: '#8e983f',
          300: '#edff66',
        }
      }
    },
  },  
  plugins: [],
}