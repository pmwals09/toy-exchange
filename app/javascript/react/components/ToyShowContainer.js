import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

import ShowTop from "./ShowTop"

const ToyShowContainer = props => {
  const [toyData, setToyData] = useState({})
  const [toyAdded, setToyAdded] = useState(false)

  useEffect(() => {
    fetch(`/api/v1/toys/${props.match.params.id}`)
    .then(response => {
      if(response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(parsedData => setToyData(parsedData.toy))
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const addToLibrary = event => {
    event.preventDefault()
    fetch(`/api/v1/toys/${props.match.params.id}/toyboxes`, {
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

  let photo
  if(toyData.toy_photo === undefined || toyData.toy_photo.hero.url === null) {
    photo = "https://toy-exchange-development.s3.amazonaws.com/defaults/default.jpg"
  } else {
    photo = toyData.toy_photo.hero.url
  }

  const details = <>
    <p><strong>Description: </strong>{toyData.description || "n/a"}</p>
    <p><strong>Manufacturer: </strong>{toyData.manufacturer_name}</p>
    <p><strong>UPC: </strong>{toyData.upc || "n/a"}</p>
    <p><strong>Ages: </strong>{toyData.min_age}-{toyData.max_age}</p>
  </>

  let gameAddedStatus
  if(toyAdded) {
    gameAddedStatus = <p>Toy added to your toy box!</p>
  } else {
    gameAddedStatus = ""
  }

  return (
    <div>
      <ShowTop
        name={toyData.toy_name}
        photo={photo}
        details={details}
      />
      <div className="show-bottom">
        <span className="button" onClick={addToLibrary}>Add to your Library!</span> <Link to={`/toys/${toyData.id}/edit`} className="button">Edit</Link>
        {gameAddedStatus}
        <h2>Up for Grabs</h2>
      </div>
    </div>
  )
}

export default ToyShowContainer
