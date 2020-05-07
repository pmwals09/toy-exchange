import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

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
  return (
    <div>
      <h1>{toyData.toy_name}</h1>
      <div className="toy-show-top">
        <div className="img-container">
          <img src={photo} />
        </div>
        <p><strong>Description: </strong>{toyData.description}</p>
        <p><strong>Manufacturer: </strong>{toyData.manufacturer_name}</p>
        <p><strong>UPC: </strong>{toyData.upc}</p>
        <p><strong>Ages: </strong>{toyData.min_age}-{toyData.max_age}</p>
      </div>
      <div className="toy-show-bottom">
        <a className="button">Add to your Library!</a> <Link to={`/toys/${toyData.id}/edit`} className="button">Edit</Link>
        <h2>Up for Grabs</h2>
      </div>
    </div>
  )
}

export default ToyShowContainer
