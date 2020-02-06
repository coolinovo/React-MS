import React, { Component } from 'react'

import {
  Button
} from 'antd'

const test = (WrappedComponent) => {
  return class HOCComponent extends Component {
    render() {
      return (
        <>
          <WrappedComponent></WrappedComponent>
          <div>这是高阶组件里的信息</div>
        </>
      )
    }
  }
}

@test
class App extends Component {
  render() {
    return (
      <div>
        <Button type='primary'>click !</Button>
      </div>
    )
  }
}

export default App