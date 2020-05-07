import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

import ShowTop from "./ShowTop"

const ToyShowContainer = props => {
  const [toyData, setToyData] = useState({})

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
  }, [])

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

  return (
    <div>
      <ShowTop
        name={toyData.toy_name}
        photo={photo}
        details={details}
      />
      <div className="show-bottom">
        <a className="button">Add to your Library!</a> <Link to={`/toys/${toyData.id}/edit`} className="button">Edit</Link>
        <h2>Up for Grabs</h2>
      </div>
    </div>
  )
}

export default ToyShowContainer
