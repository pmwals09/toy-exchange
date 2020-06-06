import React, { useState, useEffect } from "react"

import ShowTop from "../components/ShowTop"
import ToyShowDetails from "../components/ToyShowDetails"
import Loading from '../components/Loading'
import UpForGrabsContainer from './UpForGrabsContainer'
import ToyButtonsContainer from './ToyButtonsContainer'

const ToyShowContainer = props => {
  const [toyData, setToyData] = useState({})
  const [loading, setLoading] = useState(true)

  const getToyInfo = () => {
    fetch(`/api/v1/toys/${props.match.params.id}`)
    .then(response => {
      if(response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(parsedData => {
      setToyData(parsedData.toy)
      setLoading(false)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  useEffect(() => {
    getToyInfo()
  }, [])

  if(loading){
    return <Loading />
  } else {
    return (
      <div className="grid-y grid-margin-y">
        <div className="cell">
          <ShowTop
            name={toyData.toy_name}
            photo={toyData.toy_photo.hero.url}
          >
            <ToyShowDetails
              description={toyData.description}
              manufacturerName={toyData.manufacturer_name}
              upc={toyData.upc}
              minAge={toyData.min_age}
              maxAge={toyData.max_age}
            />
          </ShowTop>
        </div>
        <div className="cell text-center">
          <ToyButtonsContainer toyData={toyData} match={props.match}/>
        </div>
        <div className="cell">
          <UpForGrabsContainer
            toyboxes={toyData.toyboxes}
            getToyInfo={getToyInfo}
            currentUser={toyData.current_user}
          />
        </div>
      </div>
      )
  }
}

export default ToyShowContainer
