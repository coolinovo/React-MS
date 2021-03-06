import React, {Component} from "react"
import { Layout, Menu, Icon, Dropdown, Avatar, Badge } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllNotice } from '../../actions/notice'
import { logout } from '../../actions/user'
import logo from './logo.png'
import './frame.less'

const { Header, Content, Sider } = Layout
const mapState = state => {
  return {
    noticeCount: state.notice.list.filter(item => item.hasRead === false).length,
    avatar: state.userInfo.avatar,
    displayName: state.userInfo.displayName
  }
}

@connect(mapState, {getAllNotice, logout})
@withRouter
class Frame extends Component {
  componentDidMount() {
    this.props.getAllNotice()
  }
  menuClick = ({ key }) => {
    this.props.history.push(key)
  }
  dropDown = ({ key }) => {
    if (key === '/logout') {
      this.props.logout()
    } else {
      this.props.history.push(key)
    }
  }
  // 下拉菜单
  renderDrop = () => (
    <Menu onClick={this.dropDown}>
      <Menu.Item key='/admin/notice'>
        <Badge dot={this.props.noticeCount !==0 ?true:false}>通知中心</Badge>
      </Menu.Item>
      <Menu.Item key='/admin/profile'>
        个人设置
      </Menu.Item>
      <Menu.Item key='/logout'>
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
            <Dropdown overlay={this.renderDrop}>
              <div className='lin-link'>
                <span>欢迎你! {this.props.displayName} </span>
                <Avatar src={this.props.avatar}/>
                <Badge count={this.props.noticeCount} offset={[-7, -10]}>
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