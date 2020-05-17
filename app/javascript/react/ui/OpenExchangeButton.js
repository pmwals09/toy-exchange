import React from 'react'

const OpenExchangeButton = props => {
  return (
    <div className="cell small-3">
      <span
        className="button"
        onClick={props.openExchange}
      >
        Ready to exchange!
      </span>
    </div>
  )
}

export default OpenExchangeButton
