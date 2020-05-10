import React, { useState, useEffect } from "react"

const ExchangeShowContainer = props => {
  const [exchange, setExchange] = useState({
    toybox: {
      toy: {
        toy_name: ""
      },
      user: {
        username: ""
      }
    },
    buyer: {
      username: ""
    }
  })
  // fetch to pull the following data:
  // - buyer_id and username
  // - seller_id and username
  // - all toy data for the item in question
  //   - should this switch the availability of the toy to false so others don't try to initiate?
  // - messaging integration
  // - google maps integration
  // - google calendar integration
  // ? How do I tell what the current user is? The url? Nest under users api path?

  useEffect(() => {
    fetch(`/api/v1/exchanges/${props.match.params.id}`)
    .then(response => {
      if(response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(parsedData => {
      setExchange(parsedData.exchange)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  return(
    <>
    <h1>{exchange.toybox.toy.toy_name}</h1>
    <h2>Exchange Details</h2>
    <h3>Parties</h3>
    <ul>
      <li>Owner: {exchange.toybox.user.username}</li>
      <li>Buyer: {exchange.buyer.username}</li>
    </ul>
    <h3>Time, location</h3>
    <ul>
      <li>Location - confirmed or not, and maps</li>
      <li>Date/time - confirmed or not, and date</li>
    </ul>
    <h3>Conversation</h3>
    <p>Use mailboxer</p>
    </>
  )
}

export default ExchangeShowContainer
