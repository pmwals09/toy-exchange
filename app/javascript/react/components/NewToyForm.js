import React, { useState } from 'react'

const NewToyForm = props => {
  const defaultFormData = {
    toy_name: "",
    manufacturer_name: "",
    min_age: "",
    max_age: "",
    product_image_url: ""
  }
  const [formData, setFormData] = useState(defaultFormData)

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    fetch('/api/v1/toys', {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(formData),
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
    .then(parsedData => {
      console.log(parsedData.errors) // follow-up from here
    })
  }

  return (
    <form onSubmit={handleSubmit}>
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

      <div className="form-field">
        <label htmlFor="product_image_url">Product Image:</label>
        <input type="file" id="product_image_url" name="product_image_url" value={formData.product_image_url} onChange={handleChange}/>
      </div>

      <div className="form-actions">
        <input type="submit" value="Add Toy to Library" />
      </div>

    </form>
  )
}

export default NewToyForm
