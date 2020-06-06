import React, { useState, useEffect } from "react"
import { Redirect } from 'react-router-dom'

import Loading from "../components/Loading"
import ExchangeContainer from "./ExchangeContainer"

const ExchangeContainerLogic = props => {
  const [shouldRedirectHome, setShouldRedirectHome] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [exchange, setExchange] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getExchange()
  }, [])

  const getExchange = () => {
    fetch(`/api/v1/exchanges/${props.match.params.id}`)
    .then(response => {
      if(response.ok) {
        return response
      } else {
        if(response.status === 404){
          setShouldRedirect(true)
        } else {
          let errorMessage = `${response.status} (${response.statusText})`
          let error = new Error(errorMessage)
          throw(error)
        }
      }
    })
    .then(response => response.json())
    .then(parsedData => {
      setExchange(parsedData)
      setLoading(false)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  if(shouldRedirectHome) {
    return <Redirect to="/" />
  }

  if(shouldRedirect) {
    return <Redirect to={`/users/${exchange.exchange.exchange.scope.id}`} />
  }

  if(loading){
    return <Loading />
  } else {
    return (
      <ExchangeContainer
        exchange={exchange}
        match={props.match}
        setShouldRedirect={setShouldRedirect}
        getExchange={getExchange}
      />
    )
  }
}

export default ExchangeContainerLogic
