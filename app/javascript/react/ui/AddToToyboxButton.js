import React from 'react'

const AddToToyboxButton = props => {
  return (
      <span className="button" onClick={props.addToToybox}>
        Add to your Toy Box!
      </span>
  )
}

export default AddToToyboxButton
