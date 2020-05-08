import React from 'react'

const ShowTop = props => {
  return (
    <>
      <h1>{props.name}</h1>
      <div className="show-top">
        <div className="img-container">
          <img src={props.photo} />
        </div>
        {props.details}
      </div>
    </>
  )
}

export default ShowTop
