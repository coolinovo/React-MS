import React, {Component} from "react"
import { Layout, Menu, Icon } from 'antd'
import { withRouter } from 'react-router-dom'
import logo from './logo.png'
import './frame.less'

const { Header, Content, Sider } = Layout

@withRouter
class Frame extends Component {
  menuClick = ({ key }) => {
    this.props.history.push(key)
  }
  render() {
    const selectedKeys = this.props.location.pathname.split('/')
    // 截取字段
    selectedKeys.length = 3
    return (
      <Layout style={{minHeight: '100%'}}>
        <Header className="header lin-header">
          <div className="lin-logo">
            <img src={logo} alt="coolin"/>
          </div>
        </Header>
        <Layout>
          <Sider width={200} style={{background: '#fff'}}>
            <Menu
              mode="inline"
              selectedKeys={[selectedKeys.join('/')]}
              onClick={this.menuClick}
              style={{height: '100%', borderRight: 0}}
            >
              {
                this.props.menus.map(item => {
                  return (
                    <Menu.Item key={item.pathname}>
                      <Icon type={item.icon}/>
                      {item.title}
                    </Menu.Item>
                  )
                })
              }
            </Menu>
          </Sider>
          <Layout style={{padding: '16px'}}>
            <Content
              style={{
                background: '#fff',
                margin: 0
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Frame