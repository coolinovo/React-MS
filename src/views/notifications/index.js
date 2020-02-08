import React, { Component } from 'react'
import {Card, Button, List, Avatar, Badge} from 'antd'
import { connect } from 'react-redux'

import { markNotice, markAllNotice } from '../../actions/notice'

const mapState = state => {
  const { list } = state.notice
  return {
    list
  }
}

@connect(mapState, { markNotice, markAllNotice })
class Notice extends Component {
  componentDidMount() {
    console.log(this.props)
  }
  // 全部按扭
  markAll = () => {
    this.props.markAllNotice()
  }
  // 子按钮
  markSingle = (id) => {
    // 调用 props 传进来的异步 action （dispatch）
    this.props.markNotice(id)
  }

  render() {
    return (
      <div>
        <Card
          title='通知中心'
          bordered={false}
          extra={
            <Button
              type='primary'
              ghost
              disabled={this.props.list.every(item => item.hasRead === true)}
              onClick={this.markAll}
            >
              全部标记为已读
          </Button>}>
          <List itemLayout='horizontal' dataSource={this.props.list} renderItem={item => (
            <List.Item extra={
              <Badge dot={!item.hasRead}>
                <Button
                  disabled={item.hasRead}
                  onClick={this.markSingle.bind(this, item.id)}>
                  {item.hasRead?'已读':'未读'}
                </Button>
              </Badge>}>
              <List.Item.Meta
                avatar={<Avatar src=''/>}
                title={<span>{item.title}</span>}
                description={item.desc}
              />
            </List.Item>
          )}/>
        </Card>
      </div>
    )
  }
}

export default Notice