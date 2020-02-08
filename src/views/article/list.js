import React, { Component } from 'react'
import { Card, Button, Table, Tag, Modal, Typography, message, Tooltip } from 'antd'
import moment from 'moment'
import XLSX from 'xlsx'

import { getArticles, delArticle } from "../../requests/ajax"

const ButtonGroup = Button.Group
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
      total: 0,
      isLoading: false,
      offset: 0,
      limited: 10,
      delArticleId: null
    }
  }
  // 列格式
  createCol = (keys) => {
    const columns = keys.map((key) => {
      // 条件渲染
      if (key === 'amount') {
        return {
          title: formatTitle[key],
          key,
          render: (text, record) => {
            const { amount } = record
            return <Tooltip title={amount>3500?'热门':'中等访问量'}><Tag color={amount>3500?'red':'blue'}>{amount}</Tag></Tooltip>
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
    columns.push({
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return <ButtonGroup>
          <Button size='small' type='primary' onClick={this.toEdit.bind(this, record.id)}>编辑</Button>
          <Button size='small' type='danger' onClick={this.onDelete.bind(this, record)}>删除</Button>
        </ButtonGroup>
      }
    })
    return columns
  }
  // 请求数据方法
  getData = async  () => {
    this.setState({
      isLoading: true
    })
    try {
      const res = await getArticles(this.state.offset, this.state.limited)
      // 获取对象的属性数组
      const keys = Object.keys(res.list[0])
      const columns = this.createCol(keys)
      console.log(this.updater.isMounted(this))
      if (!this.updater.isMounted(this)) return
      // 更新状态
      // columns 格式必须要一样
      this.setState({
        total: res.total,
        data: res.list,
        columns
      })
    } catch (err) {
      // 错误处理
    } finally {
      if (!this.updater.isMounted(this)) return
      this.setState({
        isLoading: false
      })
    }
  }
  // 分页
  onPageChange = (page, pageSize) => {
    console.log(page, pageSize)
    this.setState({
      offset: pageSize * (page - 1),
      limited: pageSize
    }, () => {
      this.getData()
    })
  }
  // 快速改变页面
  // 需求问清楚，改变分页改变第一页还是留在当前
  onShowSizeChange = (current, size) => {
    this.setState({
      offset: 0,
      limited: size
    }, () => {
      this.getData()
    })
  }
  // 导出 excel
  toExcel = () => {
    // 组合数据
    const data = [Object.keys(this.state.data[0])]
    for(let i = 0; i < this.state.data.length; i++) {
      data.push([
        this.state.data[i].id,
        this.state.data[i].title,
        this.state.data[i].author,
        this.state.data[i].amount,
        moment(this.state.data[i].createAt).format('YYYY年MM月DD日 HH:mm:ss')
      ])
    }
    // 实际项目中，是前端发送请求，后端返回 excel 下载地址
    const wx = XLSX.utils.aoa_to_sheet(data)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, wx, 'List')
    XLSX.writeFile(wb, `文章列表-${this.state.offset/this.state.limited+1}-${moment().format('YYYYMMDDHHmmss')}.xlsx`)
  }
  componentDidMount() {
    console.log(this.updater.isMounted(this))
    this.getData()
  }
  // 删除操作
  onDelete = (record) => {
    const that = this
    Modal.confirm({
      title: <Typography>确定要删除<span style={{color: '#f00'}}>{record.title}</span></Typography>,
      content: '此操作将永久删除文章记录，请谨慎！！！',
      okText: '别废话，删就完事了',
      cancelText: '爷点错了',
      maskClosable: false,
      onOk() {
        that.setState({
          isLoading: true
        })
        delArticle()
          .then(response => {
            // console.log(response)
            message.success(response.msg)
            // 返回首页
            that.setState({
              offset: 0
            }, () => {
              that.getData()
            })
          })
          .finally(() => {
            that.setState({
              isLoading: false
            })
          })
      }
    })
  }
  // 编辑操作
  toEdit = (id) => {
    this.props.history.push('/admin/list/edit/' + id)
  }

  render() {
    const {data, columns} = this.state
    return (
      <Card title='文章列表' bordered={false} extra={<Button onClick={this.toExcel}>导出excel</Button>}>
        <Table
          rowKey={record => record.id}
          dataSource={data}
          columns={columns}
          loading={this.state.isLoading}
          pagination={{
            current: this.state.offset / this.state.limited + 1,
            total: this.state.total,
            hideOnSinglePage: true,
            showQuickJumper: true,
            showSizeChanger: true,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange,
            pageSizeOptions: ['5', '10', '15', '20']
          }}
        />
      </Card>
    )
  }
}