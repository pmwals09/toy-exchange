import React, { useState, useEffect } from "react"

import ExchangeTile from "../components/ExchangeTile"

const UserExchangesContainer = ({exchanges, currentUserId}) => {

  const exchangeList = exchanges.map(exchange => {
    return(
      <ExchangeTile
        key={exchange.id}
        id={exchange.id}
        toybox={exchange.toybox}
        buyer={exchange.buyer}
        currentUserId={currentUserId}
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
