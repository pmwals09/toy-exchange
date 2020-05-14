import React from 'react'

import OpenExchangeButton from './OpenExchangeButton'

const UpForGrabs = props => {
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
        return response
        props.getToyInfo()
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

  return(
    <div className="grid-x grid-margin-x align-middle">
      <div className="cell small-3 align-middle">
        <p>{props.toybox.user.username}</p>
      </div>
      {openExchangeInfo}
    </div>
  )
}

export default UpForGrabs
