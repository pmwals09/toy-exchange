import React from 'react'
import { Link } from 'react-router-dom'

const ToyTile = props => {
  const photo = props.photo.thumb.url
  
  return (
    <div className="cell small-12 medium-3 toy-tile text-center">
      <Link to={`/toys/${props.id}`}>
        <div className="img-container">
          <img src={photo} />
        </div>
        <h6>{props.name}</h6>
      </Link>
    </div>
  )
}

export default ToyTile
