import React, {useState} from 'react'

import OpenExchangeButton from '../ui/OpenExchangeButton'

const UpForGrabs = props => {
  const [exchangeAdded, setExchangeAdded] = useState(false)

  const openExchange = event => {
    event.preventDefault()
    fetch(`/api/v1/toys/${props.toybox.toy.id}/toyboxes/${props.toybox.id}/exchanges`, {
      credentials: "same-origin",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if(response.ok) {
        setExchangeAdded(true)
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  let openExchangeInfo
  if(props.currentUser && props.currentUser.id != props.toybox.user.id){
    openExchangeInfo = <OpenExchangeButton openExchange={openExchange} />
  }

  let exchangeAddedText
  if(exchangeAdded) {
    exchangeAddedText = "Exchange opened! Go to your profile for more!"
  }

  return(
    <div className="grid-x grid-margin-x align-middle">
      <div className="cell small-3 align-middle">
        <p>{props.toybox.user.username}</p>
      </div>
      {openExchangeInfo}
      <div className="cell small-3 align-middle text-center">
        <p>{exchangeAddedText}</p>
      </div>
    </div>
  )
}

export default UpForGrabs
