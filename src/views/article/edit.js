import React, {Component, createRef} from 'react'
import {Card, Button, Form, Input, DatePicker, message, Spin } from 'antd'
import E from 'wangeditor'
import { detailContent, updateArticle } from '../../requests/ajax'
import moment from 'moment'

import './edit.less'

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol:{
    span: 16
  }
}

@Form.create()
class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
    this.editorRef = createRef()
  }
  cancelEdit = () => {
    // console.log(this.props)
    this.props.history.goBack()
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, val) => {
      if (!err) {
        this.setState({
          isLoading: true
        })
        // 把 moment 转成时间戳发送给服务器
        const data = Object.assign({}, val, {
          publishAt: val.publishAt.valueOf()
        })
        console.log(data)
        try {
          const response = await updateArticle(this.props.match.params.id, data)
          message.success(response.msg)
          console.log(response)
        } catch (err) {
          // 错误处理
          message.error('保存失败：' + err)
        } finally {
          this.setState({
            isLoading: false
          })
        }
      }
    })
  }
  // 初始化富文本编辑器
  initEditor = () => {
    // 不能传入虚拟 DOM， 要用 current 属性
    this.editor = new E(this.editorRef.current)
    this.editor.customConfig.onchange = html => {
      // html 变化之后的内容
      this.props.form.setFieldsValue({
        content: html
      })
    }
    this.editor.create()
  }
  // 获取文章内容
  getContent = async (id) => {
    this.setState({
      isLoading: true
    })
    const response = await detailContent(id)
    try {
      const {id, ...data} = response
      data.createAt = moment(response.createAt)
      this.props.form.setFieldsValue({
        title: data.title,
        author: data.author,
        amount: data.amount,
        content: data.content,
        publishAt: data.createAt
      })
      // 设置 editor 的内容
      this.editor.txt.html(data.content)
    } catch (err) {
      // 错误处理
      message.error('获取文章内容失败！--' + err)
    } finally {
      this.setState({
        isLoading: false
      })
    }
  }
  componentDidMount() {
    this.initEditor()
    this.getContent(this.props.match.params.id)
  }

  render() {
    const {
      getFieldDecorator
    } = this.props.form
    return (
      <Card
        title='文章编辑'
        bordered={false}
        extra={<Button type='primary' onClick={this.cancelEdit}>取消</Button>}
      >
        <Spin spinning={this.state.isLoading}>
          <Form
            onSubmit={this.handleSubmit}
            className='login-form'
            {...formItemLayout}
          >
            <Form.Item label='标题'>
              {
                getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      message: 'title 是必须的'
                    }
                    // {
                    //   // 自定义校验规则
                    //   validator: (rule, val, call) => {
                    //     if (val !== '123') {
                    //       this.setState({
                    //         titleValid: 'error',
                    //         titleHelp: 'title 不正确'
                    //       })
                    //     } else {
                    //       this.setState({
                    //         titleValid: '',
                    //         titleHelp: ''
                    //       })
                    //     }
                    //     call()
                    //   }
                    // }
                  ]
                })(
                  <Input placeholder='标题'/>
                )
              }
            </Form.Item>
            <Form.Item label='作者'>
              {
                getFieldDecorator('author', {
                  rules: [
                    {
                      required: true,
                      message: '作者是必填项'
                    }
                    // {
                    //   // 自定义校验规则
                    //   validator: (rule, val, call) => {
                    //     if (val !== '123') {
                    //       this.setState({
                    //         titleValid: 'error',
                    //         titleHelp: 'title 不正确'
                    //       })
                    //     } else {
                    //       this.setState({
                    //         titleValid: '',
                    //         titleHelp: ''
                    //       })
                    //     }
                    //     call()
                    //   }
                    // }
                  ]
                })(
                  <Input placeholder='作者'/>
                )
              }
            </Form.Item>
            <Form.Item label='阅读量'>
              {
                getFieldDecorator('amount', {
                  rules: [
                    {
                      required: true,
                      message: '阅读量是必填项'
                    }
                    // {
                    //   // 自定义校验规则
                    //   validator: (rule, val, call) => {
                    //     if (val !== '123') {
                    //       this.setState({
                    //         titleValid: 'error',
                    //         titleHelp: 'title 不正确'
                    //       })
                    //     } else {
                    //       this.setState({
                    //         titleValid: '',
                    //         titleHelp: ''
                    //       })
                    //     }
                    //     call()
                    //   }
                    // }
                  ]
                })(
                  <Input placeholder='0'/>
                )
              }
            </Form.Item>
            <Form.Item label='发布时间'>
              {
                getFieldDecorator('publishAt', {
                  rules: [
                    {
                      required: true,
                      message: '发布时间是必填项'
                    }
                    // {
                    //   // 自定义校验规则
                    //   validator: (rule, val, call) => {
                    //     if (val !== '123') {
                    //       this.setState({
                    //         titleValid: 'error',
                    //         titleHelp: 'title 不正确'
                    //       })
                    //     } else {
                    //       this.setState({
                    //         titleValid: '',
                    //         titleHelp: ''
                    //       })
                    //     }
                    //     call()
                    //   }
                    // }
                  ]
                })(
                  <DatePicker showTime placeholder='请选择时间'/>
                )
              }
            </Form.Item>
            <Form.Item label='文章内容'>
              {
                getFieldDecorator('content', {
                  rules: [
                    {
                      required: true,
                      message: '文章内容是必填项'
                    }
                    // {
                    //   // 自定义校验规则
                    //   validator: (rule, val, call) => {
                    //     if (val !== '123') {
                    //       this.setState({
                    //         titleValid: 'error',
                    //         titleHelp: 'title 不正确'
                    //       })
                    //     } else {
                    //       this.setState({
                    //         titleValid: '',
                    //         titleHelp: ''
                    //       })
                    //     }
                    //     call()
                    //   }
                    // }
                  ]
                })(
                  <div className='lin-editor' ref={this.editorRef}/>
                )
              }
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                保存修改
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    )
  }
}

export default Edit