import React, { Component } from 'react'
import { Card, Button, Table, Tag } from 'antd'
import moment from 'moment'

import { getArticles } from "../../requests/ajax"

const formatTitle = {
  id: 'id',
  title: '标题',
  author: '作者',
  createAt: '创建时间',
  amount: '阅读量'
}

export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      columns: [],
      total: 0
    }
  }
  // 列格式
  createCol = (keys) => {
    return keys.map((key) => {
      // 条件渲染
      if (key === 'amount') {
        return {
          title: formatTitle[key],
          key,
          render: (text, record) => {
            const { amount } = record
            return <Tag color={amount>3500?'red':'blue'}>{amount}</Tag>
          }
        }
      }
      // 格式化时间
      if (key === 'createAt') {
        return {
          title: formatTitle[key],
          key,
          render: (text, record) => {
            const { createAt } = record
            return <span>{moment(createAt).format('YYYY年MM月DD日 HH:mm:ss')}</span>
          }
        }
      }
      return {
        title: formatTitle[key],
        dataIndex: key,
        key
      }
    })
  }
  // 请求数据方法
  getData = async  () => {
    const res = await getArticles()
    // 获取对象的属性数组
    const keys = Object.keys(res.list[0])
    const columns = this.createCol(keys)
    // 更新状态
    // columns 格式必须要一样
    this.setState({
      total: res.total,
      data: res.list,
      columns
    })
  }
  componentDidMount() {
    this.getData()
  }

  render() {
    const {data, columns} = this.state
    return (
      <Card title='文章列表' bordered={false} extra={<Button>导出excel</Button>}>
        <Table
          rowKey={record => record.id}
          dataSource={data}
          columns={columns}
          pagination={{
            total: this.state.total,
            hideOnSinglePage: true
          }}
        />
      </Card>
    )
  }
}