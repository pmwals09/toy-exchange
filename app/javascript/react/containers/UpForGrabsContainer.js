import React from 'react'

import UpForGrabs from "../components/UpForGrabs"

const UpForGrabsContainer = ({toyboxes, getToyInfo, currentUser}) => {
  const availableList = toyboxes.map(toybox => {
    if(toybox.for_sale) {
      return(
        <UpForGrabs
          key={toybox.toy.id}
          toybox={toybox}
          getToyInfo={getToyInfo}
          currentUser={currentUser}
        />
      )
    }
  })

  return (
    <>
      <h2>Up for Grabs</h2>
      {availableList}
    </>
  )
}

export default UpForGrabsContainer
