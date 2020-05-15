import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ToysIndex from "./containers/ToysIndex"
import ToyNewContainer from "./containers/ToyNewContainer"
import ToyShowContainer from "./containers/ToyShowContainer"
import ToyEditContainer from "./containers/ToyEditContainer"
import UserShowContainer from "./containers/UserShowContainer"
import ExchangeShowContainer from "./containers/ExchangeShowContainer"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={ToysIndex} />
        <Route exact path='/toys' component={ToysIndex} />
        <Route exact path='/toys/new' component={ToyNewContainer} />
        <Route exact path='/toys/:id' component={ToyShowContainer} />
        <Route exact path='/toys/:id/edit' component={ToyEditContainer} />
        <Route exact path='/users/:id' component={UserShowContainer} />
        <Route exact path='/exchanges/:id' component={ExchangeShowContainer} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
