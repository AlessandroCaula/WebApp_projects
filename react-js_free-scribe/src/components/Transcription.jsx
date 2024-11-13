import React from 'react'

export default function Transcription(props) {
  // Deconstructuring the props. The output. And show and render it.
  const { output } = props;

  const finalText = output.map(val => val.text);

  return (
    <div>{finalText}</div>
  )
}
