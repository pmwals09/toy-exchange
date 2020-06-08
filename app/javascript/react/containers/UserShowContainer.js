import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import ShowTop from '../components/ShowTop'
import UserExchangesContainer from './UserExchangesContainer'
import Loading from '../components/Loading'
import OwnedToysContainer from './OwnedToysContainer'

const UserShow = ({match}) => {
  const [shouldRedirectHome, setShouldRedirectHome] = useState(false)
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = () => {
    fetch(`/api/v1/users/${match.params.id}`)
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
    .then(parsedData => {
      setUser(parsedData)
      setLoading(false)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  if(shouldRedirectHome) {
    return <Redirect to="/" />
  }

  if(loading){
    return <Loading />
  } else {
    return (
      <div className="grid-y grid-margin-y">
        <div className="cell">
          <ShowTop
            name={user.username}
            photo={user.user.user.profile_photo.profile.url}
          >
            <UserExchangesContainer
              exchanges={user.exchanges.exchanges}
              currentUserId={match.params.id}
            />
          </ShowTop>
        </div>
        <div className="cell text-center">
          <a href="/users/edit" className="button">Edit My Profile</a>
        </div>
        <div className="cell">
          <OwnedToysContainer
            toyboxes={user.toyboxes.toyboxes}
            getUser={getUser}
            match={match}
          />
        </div>
      </div>
    )
  }

}

export default UserShow
