import React, { useState, useEffect } from "react"

import Message from "./Message"
import MessageForm from "./MessageForm"

const ExchangeShowContainer = props => {
  const [exchange, setExchange] = useState({
    "exchange": {
      "exchange": {
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
    getMessages()
  }, [])

  const getMessages = () => {
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

  return(
    <>
    <h1>{exchange.exchange.exchange.toybox.toy.toy_name}</h1>
    <h2>Exchange Details</h2>
    <h3>Parties</h3>
    <ul>
      <li>Owner: {exchange.exchange.exchange.toybox.user.username}</li>
      <li>Buyer: {exchange.exchange.exchange.buyer.username}</li>
    </ul>
    <h3>Time, location</h3>
    <ul>
      <li>Location - confirmed or not, and maps</li>
      <li>Date/time - confirmed or not, and date</li>
    </ul>
    <h3>Conversation</h3>
    <div className="grid-x grid-margin-x">
      <div className="cell small-6">
        <MessageForm
          conversationId={exchange.messages[0].conversation_id}
          getMessages={getMessages}
        />
        {messageList}
    </div>
    </div>
    </>
  )
}

export default ExchangeShowContainer
