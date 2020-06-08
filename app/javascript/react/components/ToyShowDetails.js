import React from 'react'

const ToyShowDetails = ({description, manufacturerName, upc, minAge, maxAge}) => {
  return (
    <div>
      <p><strong>Description: </strong>{description || "n/a"}</p>
      <p><strong>Manufacturer: </strong>{manufacturerName}</p>
      <p><strong>UPC: </strong>{upc || "n/a"}</p>
      <p><strong>Ages: </strong>{minAge}-{maxAge}</p>
    </div>
  )
}

export default ToyShowDetails
