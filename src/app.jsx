import React, { Component } from 'react'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { connect } from 'react-redux'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import { adminRoute } from "./routes"
import { Frame } from "./component/"

const menus = adminRoute.filter(route => route.isNav === true)

const mapState = state => ({
  isLogin: state.userInfo.isLogin,
  role: state.userInfo.role
})

@connect(mapState)
class App extends Component {

  render() {
    return (
      <ConfigProvider locale={zhCN}>
        {this.props.isLogin ?
          <Frame menus={menus}>
            <Switch>
              {
                adminRoute.map(route =>
                  <Route
                    key={route.pathname}
                    path={route.pathname}
                    exact={route.exact}
                    render={(routerProps) => {
                      const hasPermission = route.roles.includes(this.props.role)
                      return hasPermission?<route.component {...routerProps}/> : <Redirect to='/admin/noauth'/>}}
                  />)
              }
              <Redirect to={adminRoute[0].pathname} from='/admin' exact/>
              <Redirect to='/404' exact/>
            </Switch>
          </Frame>
          : <Redirect to='/login'/>
        }
      </ConfigProvider>
    )
  }
}

export default App