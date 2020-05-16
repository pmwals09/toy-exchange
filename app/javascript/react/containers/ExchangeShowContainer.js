import React, { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'

import Message from "../components/Message"
import MessageForm from "../components/MessageForm"
import LocationSelectionContainer from "./LocationSelectionContainer"

const ExchangeShowContainer = props => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [exchange, setExchange] = useState({
    "exchange": {
      "exchange": {
        "address": "",
        "lat": null,
        "lng": null,
        "location_name": "",
        "scope": {
          "id": ""
        },
        "toybox": {
          "toy": {
            "toy_name": "",
          },
          "user": {
            "username": ""
          }
        },
        "buyer": {
          "username": "tester",
        }
      }
    },
    "messages": [
      {
        "id": "",
        "conversation_id": "",
        "body":"",
        "sender_id":""
      }
    ]
  })

  useEffect(() => {
    getExchange()
  }, [])

  const getExchange = () => {
    fetch(`/api/v1/exchanges/${props.match.params.id}`)
    .then(response => {
      if(response.ok) {
        return response
      } else {
        if(response.status === 404){
          setShouldRedirect(true)
        } else {
          let errorMessage = `${response.status} (${response.statusText})`
          let error = new Error(errorMessage)
          throw(error)
        }
      }
    })
    .then(response => response.json())
    .then(parsedData => {
      setExchange(parsedData)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }


  const messageList = exchange.messages.map(message => {
    return (
      <Message
        key={message.id}
        body={message.body}
        senderId={message.sender_id}
        currentUserId={exchange.exchange.exchange.scope.id}
      />
    )
  })

  if(shouldRedirect) {
    return <Redirect to="/" />
  }

  return(
    <div className="grid-y grid-padding-y">
      <div className="cell">
        <h1>{exchange.exchange.exchange.toybox.toy.toy_name}</h1>
        <h2>Exchange Details</h2>
      </div>
      <div className="cell">
        <div className="grid-x grid-margin-x">
          <div className="cell small-12 medium-6">
            <div className="grid-y grid-margin-y">
              <div className="cell">
                <h3>Parties</h3>
                <ul>
                  <li>Owner: {exchange.exchange.exchange.toybox.user.username}</li>
                  <li>Buyer: {exchange.exchange.exchange.buyer.username}</li>
                </ul>
                <h3>Location</h3>
                <ul>
                  <li>Current Location: {`${exchange.exchange.exchange.location_name} | ${exchange.exchange.exchange.address}` || "Select a location!"}</li>
                </ul>
              </div>
              <div className="cell">
                <h3>Conversation</h3>
                <MessageForm
                  conversationId={exchange.messages[0].conversation_id}
                  getExchange={getExchange}
                  />
              </div>
              <div className="cell">
                {messageList}
              </div>
            </div>
          </div>
          <div className="cell small-12 medium-6">
            <LocationSelectionContainer
              location={
                {
                  lat: parseFloat(exchange.exchange.exchange.lat),
                  lng: parseFloat(exchange.exchange.exchange.lng)
                }
              }
              exchangeId={props.match.params.id}
              address={exchange.exchange.exchange.address}
              locationName={exchange.exchange.exchange.location_name}
              getExchange={getExchange}
              />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExchangeShowContainer
