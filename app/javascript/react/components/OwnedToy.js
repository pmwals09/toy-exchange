import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const OwnedToy = ({availability, userId, id, getUser, name}) => {
  const [forSale, setForSale] = useState(availability)

  const toggleAvailability = event => {
    fetch(`/api/v1/users/${userId}/toyboxes/${id}`, {
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

  const deleteToybox = event => {
    fetch(`/api/v1/users/${userId}/toyboxes/${id}`, {
      credentials: "same-origin",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if(response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(response => getUser())
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  let availabilityButton = forSale ? "Remove availability." : "Put up for grabs!"

  return (
    <div className="grid-x align-middle">
      <div className="cell small-3">
        <Link to={`/toys/${id}`}>{name}</Link>
      </div>
      <div className="cell small-6">
        <span className="button" onClick={deleteToybox}>Remove from Toy Box</span> <span className="button" onClick={toggleAvailability}>{availabilityButton}</span>
      </div>
    </div>
  )
}

export default OwnedToy
