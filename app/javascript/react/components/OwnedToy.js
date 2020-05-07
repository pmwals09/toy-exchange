import React from 'react'
import { Link } from 'react-router-dom'

const OwnedToy = props => {
  return (
    <div className="grid-x grid-margin-x align-middle">
      <div className="cell small-3">
        <Link to={`/toys/${props.id}`}>{props.name}</Link>
      </div>
      <div className="cell small-3">
        <a className="button">Put up for grabs!</a>
      </div>
    </div>
  )
}

export default OwnedToy
