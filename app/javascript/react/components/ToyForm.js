import React, { useState } from "react"
import Dropzone from 'react-dropzone'
import _ from 'lodash'

import ErrorList from "./ErrorList"

const ToyForm = props => {
  const [formData, setFormData] = useState(props.defaultFormData)
  const [errors, setErrors] = useState({})

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

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if(validateForm()){
      let body = new FormData()

      let formattedUpc = formData.upc === null ? "" : formData.upc

      body.append("toy[toy_photo]", formData.toy_photo)
      body.append("toy[toy_name]", formData.toy_name)
      body.append("toy[manufacturer_name]", formData.manufacturer_name)
      body.append("toy[min_age]", formData.min_age)
      body.append("toy[max_age]", formData.max_age)
      body.append("toy[upc]", formattedUpc)
      body.append("toy[description]", formData.description)

      props.submitForm(body)
    }
  }

  return (
    <div className="grid-y grid-padding-y">
      <div className="cell">
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
            <label htmlFor="upc">UPC:</label>
            <input type="number" id="upc" name="upc" value={formData.upc} onChange={handleChange} />
          </div>

          <div className="form-field">
            <label htmlFor="min_age">Minimum Age:</label>
            <input type="number" id="min_age" name="min_age" value={formData.min_age} onChange={handleChange}/>
          </div>

          <div className="form-field">
            <label htmlFor="max_age">Maximum Age:</label>
            <input type="number" id="max_age" name="max_age" value={formData.max_age} onChange={handleChange}/>
          </div>

          <div className="form-field">
            <label htmlFor="description">Toy Description:</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange}/>
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
            <input type="submit" value="Add Toy to Library" className="button"/>
          </div>

        </form>
      </div>
    </div>
  )
}

export default ToyForm
