import React, { useState, useEffect } from "react"

import ExchangeTile from "./ExchangeTile"

const UserExchangesContainer = props => {

  const exchangeList = props.exchanges.map(exchange => {
    return(
      <ExchangeTile
        key={exchange.id}
        id={exchange.id}
        toybox={exchange.toybox}
        buyer={exchange.buyer}
        currentUserId={props.currentUserId}
      />
    )
  })


  return(
    <>
      <h3>Exchanges</h3>
      {exchangeList}
    </>
  )
}

export default UserExchangesContainer
