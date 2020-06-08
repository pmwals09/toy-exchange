import React from 'react'
import { Link } from 'react-router-dom'

const ToyTile = ({photo, name, id}) => {
  const toyPhoto = photo.thumb.url

  return (
    <div className="cell small-12 medium-3 toy-tile text-center">
      <Link to={`/toys/${id}`}>
        <div className="img-container">
          <img src={toyPhoto} />
        </div>
        <h6>{name}</h6>
      </Link>
    </div>
  )
}

export default ToyTile
