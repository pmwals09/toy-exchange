import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import ToyForm from "../components/ToyForm"
import Loading from "../components/Loading"

const ToyNewContainer = props => {
  const [newToy, setNewToy] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [shouldRedirectHome, setShouldRedirectHome] = useState(false)
  const defaultFormData = {
    toy_name: "",
    manufacturer_name: "",
    min_age: "",
    max_age: "",
    toy_photo: "",
    upc: "",
    description: ""
  }

  const submitForm = formPayload => {
    fetch('/api/v1/toys', {
      credentials: "same-origin",
      method: "POST",
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

  return (
    <ToyForm
      submitForm={submitForm}
      defaultFormData={defaultFormData}
    />
  )
}

export default ToyNewContainer
