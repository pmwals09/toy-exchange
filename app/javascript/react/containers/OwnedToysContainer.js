import React from 'react'

import OwnedToy from '../components/OwnedToy'

const OwnedToysContainer = ({toyboxes, getUser, match}) => {
  const ownedToysList = toyboxes.map(toybox => {
    return(
      <OwnedToy
        key={toybox.toy.id}
        id={toybox.toy.id}
        name={toybox.toy.toy_name}
        userId={match.params.id}
        availability={toybox.for_sale}
        getUser={getUser}
      />
    )
  })

  return (
    <>
      <h3>My Toy Box</h3>
      {ownedToysList}
    </>
  )
}

export default OwnedToysContainer
