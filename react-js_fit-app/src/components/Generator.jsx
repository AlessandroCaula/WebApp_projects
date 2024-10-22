import React from 'react'
import SectionWrapper from './SectionWrapper'

export default function Generator() {
  return (
    // Here for the SectionWrapper component we have the opening and close tags, and the reason we are doing that is because we want children content within the SectionWrapper. 
    // So for example, when just created, if you write something between the SectionWrapper tags, it won't be rendered on the webpage. Only the things inside the SectionWrapper tag will be rendered.
    // The way that we can then get the childre contet to display is via props. !!! So the children content is just anything that is in the parent components wrapped between the tags of the children component. 
    // We are also gonna pass some content via attribute style props (in this case for some banners, like the header one). Passing some values as JavaScript code, some variables. For the header a string, for the title an array fo strings.
    <SectionWrapper header={"generate your workout"} title={["It's", "Huge", "o'clock"]}>
      {/*If you put something here, it will be passed as props to the (children) SectionWrapper component*/}
      SectionWrapper Text
    </SectionWrapper>
  )
}
