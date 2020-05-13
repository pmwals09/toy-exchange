import React from 'react'

const ToyShowDetails = props => {
  return (
    <div>
      <p><strong>Description: </strong>{props.description || "n/a"}</p>
      <p><strong>Manufacturer: </strong>{props.manufacturerName}</p>
      <p><strong>UPC: </strong>{props.upc || "n/a"}</p>
      <p><strong>Ages: </strong>{props.minAge}-{props.maxAge}</p>
    </div>
  )
}

export default ToyShowDetails
