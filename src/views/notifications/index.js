import React, { Component } from 'react'
import {Card, Button, List, Avatar, Badge, Spin} from 'antd'
import { connect } from 'react-redux'

import { markNotice, markAllNotice } from '../../actions/notice'

// 把状态解构，通过 connect 注入挂载到 props
const mapState = state => {
  const { list, isLoading } = state.notice
  return {
    list,
    isLoading
  }
}

@connect(mapState, { markNotice, markAllNotice })
class Notice extends Component {
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
          <Spin spinning={this.props.isLoading}>
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
          </Spin>
        </Card>
      </div>
    )
  }
}

export default Notice