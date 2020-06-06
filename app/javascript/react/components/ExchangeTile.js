import React from "react"
import { Link } from 'react-router-dom'

const ExchangeTile = ({toybox, buyer, currentUserId, id}) => {
  let [buyerName, sellerName, toyName] = [buyer.username, toybox.user.username, toybox.toy.toy_name]
  let userTransactionType = parseInt(currentUserId) === buyer.id ? `Buying ${toyName} from ${sellerName}` : `Selling ${toyName} to ${buyerName}`

  return(
    <div>
      <Link to={`/exchanges/${id}`}>{userTransactionType}</Link>
    </div>
  )
}

export default ExchangeTile
