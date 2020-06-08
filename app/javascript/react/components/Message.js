import React from "react"

const Message = ({senderId, currentUserId, body}) => {
  let messageClass = "cell small-6 message"
  if (senderId === currentUserId){
    messageClass += " text-right"
  }

  return (
    <div className="cell small-6">
      <p className={messageClass}>{body}</p>
    </div>
  )
}

export default Message
