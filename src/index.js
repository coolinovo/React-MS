import React from 'react'
import {render} from 'react-dom'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './app'

import store from './store'

import { mainRoute } from "./routes"

import './index.less'

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route
          path='/admin'
          component={App}
        />
        {
          mainRoute.map(route => <Route
            key={route.pathname}
            path={route.pathname}
            component={route.component}
          />)
        }
        {/* 从开始页来，跳转到登录页 */}
        <Redirect to='/admin' from='/' exact/>
        {/* 访问不存在的页面，重定向 404 */}
        <Redirect to='/404'/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)