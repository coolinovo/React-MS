import React, { Component } from 'react'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import { adminRoute } from "./routes"
import { Frame } from "./component/"

const menus = adminRoute.filter(route => route.isNav === true)

class App extends Component {
  render() {
    return (
      <Frame menus={menus}>
        <Switch>
          {
            adminRoute.map(route =>
              <Route
                key={route.pathname}
                path={route.pathname}
                exact={route.exact}
                render={(routerProps) => <route.component {...routerProps}/>}
              />)
          }
          <Redirect to={adminRoute[0].pathname} from='/admin' exact/>
          <Redirect to='/404' exact/>
        </Switch>
      </Frame>
    )
  }
}

export default App