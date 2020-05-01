import React, { useState, useEffect } from "react"

import ToyTile from './ToyTile'

const ToysIndex = props => {
  const [toys, setToys] = useState([])

  useEffect(() => {
    fetch('/api/v1/toys.json')
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
    .then(parsedData => setToys(parsedData))
    .catch(error => console.error(`Error in fetch: (${error.message})`))
  }, [])

  const toyList = toys.map(toy => {
    return (
      <ToyTile
        key={toy.id}
        name={toy.toy_name}
      />
    )
  })
  return (
    <div>
      {toyList}
    </div>
  )
}

export default ToysIndex
