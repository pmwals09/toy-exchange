import React from "react"

const Message = props => {
  let messageClass = "cell small-6"
  if (props.senderId === props.currentUserId){
    messageClass += " text-right"
  }

  return (
    <div className="cell small-6">
      <p className={messageClass}>{props.body}</p>
    </div>
  )
}

export default Message
