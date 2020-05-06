import React from 'react'

const ToyTile = props => {

  return (
    <div className="cell small-12 medium-3 toy-tile text-center">
      <div className="img-container">
        <img src={props.photo.thumb.url} />
      </div>
      <h6>{props.name}</h6>
    </div>
  )
}

export default ToyTile
