import React from 'react'

const AddToLibraryButton = props => {
  return (
      <span className="button" onClick={props.addToLibrary}>
        Add to your Library!
      </span>
  )
}

export default AddToLibraryButton
