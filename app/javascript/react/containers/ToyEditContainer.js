import React, { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'

import ToyForm from "../components/ToyForm"

const ToyEditContainer = props => {
  const [newToy, setNewToy] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [shouldRedirectHome, setShouldRedirectHome] = useState(false)
  const [defaultFormData, setDefaultFormData] = useState({})

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
    .then(parsedData => {
      setDefaultFormData(parsedData.toy)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const submitForm = formPayload => {
    fetch(`/api/v1/toys/${props.match.params.id}`, {
      credentials: "same-origin",
      method: "PATCH",
      body: formPayload
    })
    .then(response => {
      if(response.ok) {
        return response
      } else {
        setShouldRedirectHome(true)
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(parsedData => {
      if(parsedData.errors) {
        console.error(parsedData.errors)
      } else {
        setNewToy(parsedData.toy)
        setShouldRedirect(true)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  if(shouldRedirect) {
    return <Redirect to={`/toys/${newToy.id}`} />
  }

  if(shouldRedirectHome) {
    return <Redirect to="/" />
  }

  if(defaultFormData.id === undefined){
    return (
      <h1>Loading...</h1>
    )
  } else {
    return (
      <ToyForm
        submitForm={submitForm}
        defaultFormData={defaultFormData}
        />
    )
  }
}

export default ToyEditContainer
