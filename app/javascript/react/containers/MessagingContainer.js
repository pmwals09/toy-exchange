import React from 'react'

import Message from '../components/Message'
import MessageForm from '../components/MessageForm'

const MessagingContainer = ({messages, scope, getExchange}) => {
  const messageList = messages.map(message => {
    return (
      <Message
        key={message.id}
        body={message.body}
        senderId={message.sender_id}
        currentUserId={scope.id}
      />
    )
  })

  return (
    <>
      <div className="cell">
        <h3>Conversation</h3>
        <MessageForm
          conversationId={messages[0].conversation_id}
          getExchange={getExchange}
        />
      </div>
      <div className="cell">
        {messageList}
      </div>
    </>
  )
}

export default MessagingContainer
