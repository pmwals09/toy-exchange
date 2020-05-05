import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ToysIndex from "./ToysIndex"
import NewToyForm from "./NewToyForm"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={ToysIndex}/>
        <Route exact path='/toys' component={ToysIndex}/>
        <Route exact path='/toys/new' component={NewToyForm}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
