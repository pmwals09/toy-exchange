import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import AddToToyboxButton from "../ui/AddToToyboxButton"

const ToyButtonsContainer = ({toyData, match}) => {
  const [toyAdded, setToyAdded] = useState(false)

  const addToToybox = event => {
    event.preventDefault()
    fetch(`/api/v1/toys/${match.params.id}/toyboxes`, {
      credentials: "same-origin",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if(response.ok) {
        setToyAdded(true)
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  let toyInToybox = !(toyData.current_user && toyData.toyboxes.filter(toybox => toybox.user.id === toyData.current_user.id).length === 0)

  let toyAddedStatus = toyAdded ? <p>Toy added to your toy box!</p> : null

  return(
    <>
      {!toyInToybox && <AddToToyboxButton addToToybox={addToToybox}/>}{' '}
      {toyData.current_user && <Link to={`/toys/${toyData.id}/edit`} className="button">Edit</Link>}
      {toyAddedStatus}
    </>
  )
}

export default ToyButtonsContainer
