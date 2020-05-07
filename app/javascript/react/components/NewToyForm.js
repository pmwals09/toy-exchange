import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import ToyForm from "./ToyForm"

const NewToyForm = props => {
  const [newToy, setNewToy] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
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

  if(shouldRedirect) {
    return <Redirect to={`/toys/${newToy.id}`} />
  }

  return (
    <ToyForm
      submitForm={submitForm}
      defaultFormData={defaultFormData}
      />
  )
}

// <form onSubmit={handleSubmit}>
//   <ErrorList
//     errors={errors}
//   />
//
//   <div className="form-field">
//     <label htmlFor="toy_name">Toy Name:</label>
//     <input type="text" id="toy_name" name="toy_name" value={formData.toy_name} onChange={handleChange}/>
//   </div>
//
//   <div className="form-field">
//     <label htmlFor="manufacturer_name">Toy Manufacturer:</label>
//     <input type="text" id="manufacturer_name" name="manufacturer_name" value={formData.manufacturer_name} onChange={handleChange}/>
//   </div>
//
//   <div className="form-field">
//     <label htmlFor="min_age">Minimum Age:</label>
//     <input type="number" id="min_age" name="min_age" value={formData.min_age} onChange={handleChange}/>
//   </div>
//
//   <div className="form-field">
//     <label htmlFor="max_age">Maximum Age:</label>
//     <input type="number" id="max_age" name="max_age" value={formData.max_age} onChange={handleChange}/>
//   </div>
//
//   <Dropzone onDrop={handleFileUpload}>
//     {({getRootProps, getInputProps}) => (
//       <section>
//         <div {...getRootProps()}>
//           <input {...getInputProps()} />
//           <p>Drag 'n' drop files here, or click to select files</p>
//         </div>
//       </section>
//     )}
//   </Dropzone>
//
//   <div className="form-actions">
//     <input type="submit" value="Add Toy to Library" />
//   </div>
//
// </form>
export default NewToyForm
