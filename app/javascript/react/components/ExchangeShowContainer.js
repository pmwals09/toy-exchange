import React from "react"

const ExchangeShowContainer = props => {
  // fetch to pull the following data:
  // - buyer_id and username
  // - seller_id and username
  // - all toy data for the item in question
  //   - should this switch the availability of the toy to false so others don't try to initiate?
  // - messaging integration
  // - google maps integration
  // - google calendar integration
  // ? How do I tell what the current user is? The url? Nest under users api path?

  const tempData = {
    buyer: {
      id: 1,
      username: "first_buyer_username"
    },
    seller: {
      id: 2,
      username: "first_seller_username"
    },
    toy: {
      id: 1,
      toy_name: "Settlers of Catan",
      manufacturer_name: "Catan",
      min_age: 3,
      max_age: 100,
      toy_photo: {
        url: null,
        thumb: {
          url: null
        },
        hero: {
          url: null
        }
      },
      upc: null,
      description: "Usually I enjoy playing this, but sometimes I'm just too tired to wheel and deal."
    }
  }
  return(
    <>
    <h1>You would like to [buy/sell] a [toy]</h1>
    <div>
      <h2>Key transaction details will go here</h2>
      <ul>
        <li>Toy info</li>
        <li>Location - confirmed or not, and maps</li>
        <li>Date/time - confirmed or not, and date</li>
      </ul>
    </div>
    <div>
      <h2>Messages will go here</h2>
      <p>Use mailboxer - how to limit visibility to just these users?</p>
    </div>
    </>
  )
}

export default ExchangeShowContainer
