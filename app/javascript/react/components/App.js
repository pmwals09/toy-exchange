import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ToysIndex from "./ToysIndex"
import NewToyForm from "./NewToyForm"
import ToyShowContainer from "./ToyShowContainer"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={ToysIndex} />
        <Route exact path='/toys' component={ToysIndex} />
        <Route exact path='/toys/new' component={NewToyForm} />
        <Route exact path='/toys/:id' component={ToyShowContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
