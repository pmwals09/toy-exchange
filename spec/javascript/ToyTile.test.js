import React from "react"
import { BrowserRouter } from 'react-router-dom'
import Enzyme, { mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
Enzyme.configure({ adapter: new Adapter() })

import ToyTile from "../../app/javascript/react/components/ToyTile"

// Presentational components should:
// [ ] receive props from the parent
// [ ] display an image if needed, based on props if applicable
// [x] display text with appropriate styling, based on props if applicable
// [ ] Run any functions/onClick/etc., based on props if applicable, via event listener
//
// This component should:
// [ ] Each toy displays an image of the toy
// [x] Each toy displays the name of the toy
// [ ] Render a link to the toy's show page


describe("ToyTile", () => {
  let wrapper
  let photo_obj = {
    hero: {
      url: "https://toy-exchange-development.s3.amazonaws.com/uploads/toy/toy_photo/1/hero_test-toy-image.jpg"
    },
    thumb: {
      url: "https://toy-exchange-development.s3.amazonaws.com/uploads/toy/toy_photo/1/thumb_test-toy-image.jpg"
    },
    url: "https://toy-exchange-development.s3.amazonaws.com/uploads/toy/toy_photo/1/test-toy-image.jpg"
  }

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <ToyTile
          name={"Paw Patrol Toy"}
          photo={photo_obj}
        />
      </BrowserRouter>
    )
  })

  it('should render an h3 element of name received via props', () => {
    expect(wrapper.find('h6').text()).toBe('Paw Patrol Toy')
  })

  xit('should render an img of toy received via props', () => {
    expect(wrapper.find('img').props()).toEqual({
      height: '202',
      width: '202',
      src: "https://toy-exchange-development.s3.amazonaws.com/uploads/toy/toy_photo/1/thumb_test-toy-image.jpg"
    })
  })

  xit("should render a Link to that toy's show page", () => {
    expect(wrapper.find("Link").props()["to"]).toBe("")
  })

})
