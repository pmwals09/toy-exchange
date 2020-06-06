import React from 'react'

import MessagingContainer from './MessagingContainer'
import LocationSelectionContainer from "./LocationSelectionContainer"
import RemoveExchangeButton from "../ui/RemoveExchangeButton"

const ExchangeContainer = ({exchange, match, setShouldRedirect, getExchange}) => {

  return(
    <div className="grid-y grid-padding-y">
      <div className="cell">
        <h1>{exchange.exchange.exchange.toybox.toy.toy_name}</h1>
        <h2>Exchange Details</h2>
      </div>
      <div className="cell">
        <div className="grid-x grid-margin-x">
          <div className="cell small-12 medium-6">
            <div className="grid-y grid-margin-y">
              <div className="cell">
                <h3>Location</h3>
                <ul>
                  <li>Current Location: {`${exchange.exchange.exchange.location_name} | ${exchange.exchange.exchange.address}` || "Select a location!"}</li>
                </ul>
                <h3>Parties</h3>
                <ul>
                  <li>Owner: {exchange.exchange.exchange.toybox.user.username}</li>
                  <li>Buyer: {exchange.exchange.exchange.buyer.username}</li>
                </ul>
                <RemoveExchangeButton
                  exchangeId={match.params.id}
                  setShouldRedirect={setShouldRedirect}
                />
              </div>
              <MessagingContainer
                messages={exchange.messages}
                scope={exchange.exchange.exchange.scope}
                getExchange={getExchange}
              />
            </div>
          </div>
          <div className="cell small-12 medium-6">
            <LocationSelectionContainer
              location={
                {
                  lat: parseFloat(exchange.exchange.exchange.lat),
                  lng: parseFloat(exchange.exchange.exchange.lng)
                }
              }
              exchangeId={match.params.id}
              address={exchange.exchange.exchange.address}
              locationName={exchange.exchange.exchange.location_name}
              getExchange={getExchange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExchangeContainer
