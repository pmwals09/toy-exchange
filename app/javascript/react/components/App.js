import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ToysIndex from "./ToysIndex"
import NewToyForm from "./NewToyForm"
import ToyShowContainer from "./ToyShowContainer"
import ToyEditForm from "./ToyEditForm"
import UserShow from "./UserShow"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={ToysIndex} />
        <Route exact path='/toys' component={ToysIndex} />
        <Route exact path='/toys/new' component={NewToyForm} />
        <Route exact path='/toys/:id' component={ToyShowContainer} />
        <Route exact path='/toys/:id/edit' component={ToyEditForm} />
        <Route exact path='/users/:id' component={UserShow} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
