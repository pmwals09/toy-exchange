import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const OwnedToy = props => {

  const [forSale, setForSale] = useState(props.availability)

  const toggleAvailability = event => {
    fetch(`/api/v1/users/${props.userId}/toyboxes/${props.id}`, {
      credentials: "same-origin",
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if(response.ok){
        setForSale(!forSale)
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  let availabilityButton = forSale ? "Remove availability." : "Put up for grabs!"

  return (
    <div className="grid-x grid-margin-x align-middle">
      <div className="cell small-3">
        <Link to={`/toys/${props.id}`}>{props.name}</Link>
      </div>
      <div className="cell small-3">
        <span className="button" onClick={toggleAvailability}>{availabilityButton}</span>
      </div>
    </div>
  )
}

export default OwnedToy
