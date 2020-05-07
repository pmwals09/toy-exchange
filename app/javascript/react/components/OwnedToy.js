import React from 'react'
import { Link } from 'react-router-dom'

const OwnedToy = props => {

  const putUpForGrabs = event => {
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
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return (
    <div className="grid-x grid-margin-x align-middle">
      <div className="cell small-3">
        <Link to={`/toys/${props.id}`}>{props.name}</Link>
      </div>
      <div className="cell small-3">
        <a className="button" onClick={putUpForGrabs}>Put up for grabs!</a>
      </div>
    </div>
  )
}

export default OwnedToy
