import React from 'react'

const LocationSuggestions = ({exchangeId, getExchange, suggestedLocations}) => {

  const updateExchangeLocation = (coords, name, formatted_address) => {
    let updateData = {
      exchange_id: exchangeId,
      coords: coords,
      name: name,
      formatted_address: formatted_address
    }
    fetch(`/api/v1/exchanges/${exchangeId}`, {
      credentials: "same-origin",
      method: "PATCH",
      body: JSON.stringify(updateData),
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
    .then(parsedData => getExchange())
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const locationList = suggestedLocations.results.map(result => {
    let placeName = null
    if(result.name != "") {
      placeName = `${result.name} | `
    }

    return(
      <div
        key={result.name}
        onClick={() => updateExchangeLocation(result.geometry.location, result.name, result.formatted_address)}
      >
        <a>
          {placeName} {result.formatted_address}
        </a>
      </div>
    )
  })

  return (
    <>
      {locationList}
    </>
  )
}

export default LocationSuggestions
