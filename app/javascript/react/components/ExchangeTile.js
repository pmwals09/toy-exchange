import React from "react"
import { Link } from 'react-router-dom'

const ExchangeTile = props => {

  let userTransactionType
  if(props.buyer.id === props.currentUserId){
    userTransactionType = `Buying ${props.toy.toy_name} from ${props.seller.username}`
  } else {
    userTransactionType = `Selling ${props.toy.toy_name} to ${props.buyer.username}`
  }

  return(
    <div>
      <Link to={`/exchanges/${props.id}`}>{userTransactionType}</Link>
    </div>
  )
}

export default ExchangeTile
