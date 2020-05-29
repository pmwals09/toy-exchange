import React, { useState } from "react"

import LocationMap from '../components/LocationMap'
import LocationForm from '../components/LocationForm'
import LocationSuggestions from '../components/LocationSuggestions'

const LocationSelectionContainer = props => {
  const [isMarkerShown, setIsMarkerShown] = useState(true)
  const [markerLocation, setMarkerLocation] = useState({
    lat: 42.3611,
    lng: -71.0570
  })
  const [suggestedLocations, setSuggestedLocations] = useState({
    results: [
      {
        formatted_address: "",
        geometry: {
          location: {
            lat: "",
            lng: ""
          }
        },
        name: ""
      }
    ]
  })

  const searchLocation = formPayload => {
    fetch(`/api/v1/exchanges/${props.exchangeId}/search?query=${formPayload}`)
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
    .then(parsedData => {
      setSuggestedLocations(parsedData)})
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return (
    <>
      <LocationMap
        isMarkerShown
        markerLocation={props.location}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAx4lk-3qP0pWqzMmE-91Mhx5jOD9c0Coc&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%`}} />}
      />
      <LocationForm
        searchLocation={searchLocation}
      />
      <LocationSuggestions
        setMarkerLocation={setMarkerLocation}
        suggestedLocations={suggestedLocations}
        exchangeId={props.exchangeId}
        getExchange={props.getExchange}
      />
    </>
  )
}

export default LocationSelectionContainer
