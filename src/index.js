import React from 'react'
import {render} from 'react-dom'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import App from './app'

import { mainRoute } from "./routes"

import './index.less'

render(
  <Router>
    <Switch>
      <Route
        path='/admin'
        render={(routerProps) => {
        // 登录才能访问 admin
        return <App {...routerProps}/>
      }}/>
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
  </Router>,
  document.getElementById('root')
)