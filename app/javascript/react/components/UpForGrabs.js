import React from 'react'

const UpForGrabs = props => {
  const openExchange = event => {
    event.preventDefault()
  }

  let openExchangeInfo = "Ready to exchange!"

  return(
    <div className="grid-x grid-margin-x align-middle">
      <div className="cell small-3 align-middle">
        <p>{props.name}</p>
      </div>
      <div className="cell small-3">
        <span className="button" onClick={openExchange}>{openExchangeInfo}</span>
      </div>
    </div>
  )
}

export default UpForGrabs
