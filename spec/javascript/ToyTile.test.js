import React from "react"
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

  beforeEach(() => {
    wrapper = mount(
      <ToyTile
        name={"Paw Patrol Toy"}
      />
    )
  })

  it('should render an h3 element of name received via props', () => {
    expect(wrapper.find('h3').text()).toBe('Paw Patrol Toy')
  })

  xit('should render an img of toy received via props', () => {
    expect(wrapper.find('img').props()).toEqual({
      src: '',
      height: '',
      width: ''
    })
  })

  xit("should render a Link to that toy's show page", () => {
    expect(wrapper.find("Link").props()["to"]).toBe("")
  })

})
