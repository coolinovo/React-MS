import React, {Component} from "react"
import { Layout, Menu, Icon, Dropdown, Avatar, Badge } from 'antd'
import { withRouter } from 'react-router-dom'
import logo from './logo.png'
import './frame.less'

const { Header, Content, Sider } = Layout

@withRouter
class Frame extends Component {
  menuClick = ({ key }) => {
    this.props.history.push(key)
  }
  dropDown = ({ key }) => {
    this.props.history.push(key)
  }
  menu = (
    <Menu onClick={this.dropDown}>
      <Menu.Item key='/admin/notice'>
        <Badge dot>通知中心</Badge>
      </Menu.Item>
      <Menu.Item key='/admin/settings'>
        个人设置
      </Menu.Item>
      <Menu.Item key='/login'>
        退出
      </Menu.Item>
    </Menu>
  )
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
          <div>
            <Dropdown overlay={this.menu}>
              <div className='lin-link'>
                <span>欢迎你!</span>
                <Avatar src=''/>
                <Badge count={10} offset={[-7, -10]}>
                  <Icon type='down'/>
                </Badge>
              </div>
            </Dropdown>
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