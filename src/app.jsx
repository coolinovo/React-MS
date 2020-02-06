import React, { Component } from 'react'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import {
  adminRouter
} from "./routes";

class App extends Component {
  render() {
    return (
      <div>
        <div>public</div>
        <Switch>
          {
            adminRouter.map(route =>
              <Route
                key={route.pathname}
                path={route.pathname}
                exact={route.exact}
                render={(routerProps) => <route.component {...routerProps}/>}
              />)
          }
          <Redirect to={adminRouter[0].pathname} from='/admin' exact/>
          <Redirect to='/404' exact/>
        </Switch>
      </div>
    )
  }
}

export default App