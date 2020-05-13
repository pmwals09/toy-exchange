import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

import ShowTop from "./ShowTop"
import UpForGrabs from "./UpForGrabs"
import ToyShowDetails from "./ToyShowDetails"
import AddToLibraryButton from "./AddToLibraryButton"

const ToyShowContainer = props => {
  const [toyData, setToyData] = useState({
    id: null,
    toy_name: "",
    manufacturer_name: "",
    min_age: null,
    max_age: null,
    toy_photo: { hero: { url: null } },
    upc: null,
    description: "",
    toyboxes: [
      {
        user: {
          id: null
        }
      }
    ],
    current_user: {
      id: null
    }
  })
  const [toyAdded, setToyAdded] = useState(false)

  const getToyInfo = () => {
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
    .then(parsedData => {
      setToyData(parsedData.toy)})
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

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

  useEffect(() => {
    getToyInfo()
  }, [])

  const availableList = toyData.toyboxes.map(toybox => {
    if(toybox.for_sale) {
      return(
        <UpForGrabs
          key={toybox.toy.id}
          toybox={toybox}
          getToyInfo={getToyInfo}
          currentUser={toyData.current_user}
        />
      )
    }
  })

  let photo
  if(toyData.toy_photo === undefined || toyData.toy_photo.hero.url === null) {
    photo = "https://toy-exchange-development.s3.amazonaws.com/defaults/default.jpg"
  } else {
    photo = toyData.toy_photo.hero.url
  }

  const details = <ToyShowDetails
                    description={toyData.description}
                    manufacturerName={toyData.manufacturer_name}
                    upc={toyData.upc}
                    minAge={toyData.min_age}
                    maxAge={toyData.max_age}
                  />

  let toyAddedStatus = ""
  if(toyAdded) {
    toyAddedStatus = <p>Toy added to your toy box!</p>
  }

  let toyInLibrary = true
  if (toyData.current_user && toyData.toyboxes.filter(toybox => toybox.user.id === toyData.current_user.id).length === 0){
    toyInLibrary = false
  }

  return (
    <div>
      <ShowTop
        name={toyData.toy_name}
        photo={photo}
        details={details}
      />
      <div className="show-bottom">
        {!toyInLibrary && <AddToLibraryButton addToLibrary={addToLibrary}/>} {toyData.current_user && <Link to={`/toys/${toyData.id}/edit`} className="button">Edit</Link>}
        {toyAddedStatus}
        <h2>Up for Grabs</h2>
        {availableList}
      </div>
    </div>
  )
}

export default ToyShowContainer
