import React from 'react'

const RemoveExchangeButton = props => {
  const removeExchange = event => {
    event.preventDefault()
    fetch(`/api/v1/exchanges/${props.exchangeId}`, {
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
    .then(response => props.setShouldRedirect(true))
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return (
    <>
      <p className="button" onClick={removeExchange}>Remove Exchange</p>
    </>
  )
}

export default RemoveExchangeButton
