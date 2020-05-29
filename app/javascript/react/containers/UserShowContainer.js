import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import ShowTop from '../components/ShowTop'
import OwnedToy from '../components/OwnedToy'
import UserExchangesContainer from './UserExchangesContainer'

const UserShow = props => {
  const [shouldRedirectHome, setShouldRedirectHome] = useState(false)
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
    getUser()
  }, [])

  const getUser = () => {
    fetch(`/api/v1/users/${props.match.params.id}`)
    .then(response => {
      if(response.ok) {
        return response
      } else {
        setShouldRedirectHome(true)
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(parsedData => setUser(parsedData))
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  const ownedToysList = user.toyboxes.toyboxes.map(toybox => {
    return(
      <OwnedToy
        key={toybox.toy.id}
        id={toybox.toy.id}
        name={toybox.toy.toy_name}
        userId={props.match.params.id}
        availability={toybox.for_sale}
        getUser={getUser}
      />
    )
  })

  let details = ""
  if(user.id != ""){
    details = <UserExchangesContainer
                exchanges={user.exchanges.exchanges}
                currentUserId={props.match.params.id}
              />
  }

  if(shouldRedirectHome) {
    return <Redirect to="/" />
  }

  return (
    <div className="grid-y grid-margin-y">
      <div className="cell">
        <ShowTop
          name={user.username}
          photo={user.user.user.profile_photo.profile.url}
          details={details}
          />
      </div>
      <div className="cell text-center">
        <a href="/users/edit" className="button">Edit My Profile</a>
      </div>
      <div className="cell">
        <h3>My Toy Box</h3>
        {ownedToysList}
      </div>
    </div>
  )
}

export default UserShow
