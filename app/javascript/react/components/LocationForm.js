import React, { useState } from "react"

const LocationForm = props => {
  const [formFields, setFormFields] = useState({location: ""})

  const handleChange = event => {
    setFormFields({
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    props.searchLocation(formFields.location)
  }


  return(
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="location">Search for a meetup location</label>
        <input
          type="text"
          id="location"
          name="location"
          onChange={handleChange}
          value={formFields.location}
        />
      </div>

      <div className="form-actions">
        <input
          type="submit"
          value="Submit"
          className="button"
        />
      </div>
    </form>
  )
}

export default LocationForm
