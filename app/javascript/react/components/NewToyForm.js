import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import _ from 'lodash'

import ErrorList from "./ErrorList"

const NewToyForm = props => {
  const defaultFormData = {
    toy_name: "",
    manufacturer_name: "",
    min_age: "",
    max_age: "",
    toy_photo: ""
  }
  const [formData, setFormData] = useState(defaultFormData)
  const [errors, setErrors] = useState({})
  const [newToy, setNewToy] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const validateForm = () => {
    let newErrors = {}
    const requiredFields = ["toy_name", "manufacturer_name"]
    requiredFields.forEach(field => {
      if(formData[field].trim() === "") {
        field = field.replace(/_/g, " ")
        newErrors = {
          ...newErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(newErrors)
    return _.isEmpty(newErrors)
  }

  const handleFileUpload = acceptedFiles => {
    setFormData({
      ...formData,
      toy_photo: acceptedFiles[0]
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    let body = new FormData()
    body.append("toy[toy_photo]", formData.toy_photo)
    body.append("toy[toy_name]", formData.toy_name)
    body.append("toy[manufacturer_name]", formData.manufacturer_name)
    body.append("toy[min_age]", formData.min_age)
    body.append("toy[max_age]", formData.max_age)

    if(validateForm()) {
      fetch('/api/v1/toys', {
        credentials: "same-origin",
        method: "POST",
        body: body
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
      .then(parsedData => {
        if(parsedData.errors) {
          console.error(parsedData.errors)
        } else {
          setNewToy(parsedData.toy)
          setShouldRedirect(true)
        }
      })
    }
  }

  if(shouldRedirect) {
    return <Redirect to={`/toys/${newToy.id}`} />
  }

  return (
    <form onSubmit={handleSubmit}>
      <ErrorList
        errors={errors}
      />

      <div className="form-field">
        <label htmlFor="toy_name">Toy Name:</label>
        <input type="text" id="toy_name" name="toy_name" value={formData.toy_name} onChange={handleChange}/>
      </div>

      <div className="form-field">
        <label htmlFor="manufacturer_name">Toy Manufacturer:</label>
        <input type="text" id="manufacturer_name" name="manufacturer_name" value={formData.manufacturer_name} onChange={handleChange}/>
      </div>

      <div className="form-field">
        <label htmlFor="min_age">Minimum Age:</label>
        <input type="number" id="min_age" name="min_age" value={formData.min_age} onChange={handleChange}/>
      </div>

      <div className="form-field">
        <label htmlFor="max_age">Maximum Age:</label>
        <input type="number" id="max_age" name="max_age" value={formData.max_age} onChange={handleChange}/>
      </div>

      <Dropzone onDrop={handleFileUpload}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>

      <div className="form-actions">
        <input type="submit" value="Add Toy to Library" />
      </div>

    </form>
  )
}

export default NewToyForm
