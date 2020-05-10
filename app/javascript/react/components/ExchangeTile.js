import React from "react"
import { Link } from 'react-router-dom'

const ExchangeTile = props => {
  let userTransactionType = `Buying ${props.toybox.toy.toy_name} from ${props.toybox.user.username}`
  if(parseInt(props.currentUserId) === props.buyer.id) {
    userTransactionType = `Buying ${props.toybox.toy.toy_name} from ${props.toybox.user.username}`
  } else {
    userTransactionType = `Selling ${props.toybox.toy.toy_name} to ${props.buyer.username}`
  }

  return(
    <div>
      <Link to={`/exchanges/${props.id}`}>{userTransactionType}</Link>
    </div>
  )
}

export default ExchangeTile
