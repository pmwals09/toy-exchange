import React from "react"

import ExchangeTile from "./ExchangeTile"

const UserExchangesContainer = props => {

  // fetch to pull all exchanges associated with this user, using props.currentUserId
  // must include the following data to render tiles:
  // - exchange id to link to exchange show page
  // - toy name from toybox
  // - buyer_id, username
  // - seller_id, username
  
  const tempData = [
    {
      id: "1",
      toy: {
        id: "1",
        toy_name: "The First Toy",
      },
      buyer: {
        id: "1",
        username: "first_username"
      },
      seller: {
        id: "2",
        username: "other_first_username"
      }
    },
    {
      id: "2",
      toy: {
        id: "2",
        toy_name: "The Second Toy"
      },
      buyer: {
        id: "1",
        username: "second_username"
      },
      seller: {
        id: "3",
        username: "other_second_username"
      }
    },
    {
      id: "3",
      toy: {
        id: "3",
        toy_name: "The Third Toy"
      },
      buyer: {
        id: "4",
        username: "third_username"
      },
      seller: {
        id: "1",
        username: "other_third_username"
      }
    }
  ]

  const exchangeList = tempData.map(exchange => {
    return(
      <ExchangeTile
        key={exchange.id}
        id={exchange.id}
        toy={exchange.toy}
        buyer={exchange.buyer}
        seller={exchange.seller}
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
