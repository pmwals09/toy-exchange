import React from 'react'

const AddToToyboxButton = ({addToToybox}) => {
  return (
      <span className="button" onClick={addToToybox}>
        Add to your Toy Box!
      </span>
  )
}

export default AddToToyboxButton
