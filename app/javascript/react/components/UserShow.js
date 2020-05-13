import React, { useState, useEffect } from 'react'

import ShowTop from './ShowTop'
import OwnedToy from './OwnedToy'
import UserExchangesContainer from './UserExchangesContainer'

const UserShow = props => {
  const [user, setUser] = useState({
    user: {
      user: {
        id: "",
        email: "",
        username: "",
        profile_photo: {
          profile: {
            url: ""
          }
        }
      }
    },
    toyboxes: { toyboxes: [] },
    exchanges: { exchanges: [] }
  })

  useEffect(() => {
    fetch(`/api/v1/users/${props.match.params.id}`)
    .then(response => {
      if(response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(parsedData => setUser(parsedData))
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const ownedToysList = user.toyboxes.toyboxes.map(toybox => {
    return(
      <OwnedToy
        key={toybox.toy.id}
        id={toybox.toy.id}
        name={toybox.toy.toy_name}
        userId={props.match.params.id}
        availability={toybox.for_sale}
      />
    )
  })

  let photo
  if(user.user.user.profile_photo === undefined) {
    photo = ""
  } else {
    photo = user.user.user.profile_photo.profile.url
  }

  let details
  if(user.id != ""){
    details = <UserExchangesContainer
                exchanges={user.exchanges.exchanges}
                currentUserId={props.match.params.id}
              />
  } else {
    details = ""
  }

  return (
    <div>
      <ShowTop
        name={user.username}
        photo={photo}
        details={details}
      />
      <div className="show-bottom">
        <a href="/users/edit" className="button">Edit My Profile</a>
        <h3>My Toy Box</h3>
          {ownedToysList}
      </div>
    </div>
  )
}

export default UserShow
