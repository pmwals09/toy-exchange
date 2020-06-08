import React from 'react'

const OpenExchangeButton = ({openExchange}) => {
  return (
    <div className="cell small-3">
      <span
        className="button"
        onClick={openExchange}
      >
        Ready to exchange!
      </span>
    </div>
  )
}

export default OpenExchangeButton
