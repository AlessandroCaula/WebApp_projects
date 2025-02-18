import React from 'react'

export default function Transcription(props) {
  // Deconstructuring the props. The textElement in this case. And show and render it.
  const { textElement } = props;

  return (
    <div>{textElement}</div>
  )
}
