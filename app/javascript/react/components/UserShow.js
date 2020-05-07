import React, { useState, useEffect } from 'react'

import ShowTop from './ShowTop'
import OwnedToy from './OwnedToy'

const UserShow = props => {
  const [user, setUser] = useState({
    id: "",
    emaiil: "",
    username: "",
    profile_photo: {
      profile: { url: "" }
    },
    toys: []
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
    .then(parsedData => setUser(parsedData.user))
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const ownedToysList = user.toys.map(toy => {
    return(
      <OwnedToy
        key={toy.id}
        id={toy.id}
        name={toy.toy_name}
        userId={props.match.params.id}
      />
    )
  })

  let photo
  if(user.profile_photo === undefined) {
    photo = ""
  } else {
    photo = user.profile_photo.profile.url
  }

  let details = <h3>Open Exchanges</h3>

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