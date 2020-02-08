import React, {Component} from 'react'
import {Form, Input, Button, Checkbox, Card } from 'antd'
import './login.less'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {toLogin} from '../../actions/user'

const mapState = state => ({
  isLogin: state.userInfo.isLogin,
  isLoading: state.userInfo.isLoading
})

@connect(mapState, {toLogin})
@Form.create()
class Login extends Component {
  loginSub = e => {
    e.preventDefault()
    this.props.form.validateFields((err, val) => {
      if (!err) {
        console.log(this.props.isLogin)
        this.props.toLogin(val)
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      this.props.isLogin
        ?
        <Redirect to='/admin'/> :
        <Form onSubmit={this.loginSub} className='login-form'>
          <Card title='Welcome！' className='lin-lingo-wrapper'>
            <Form.Item>
              {
                getFieldDecorator('username', {
                  rules: [
                    {required: true, message: '必须填写账号'}
                  ]
                })(
                  <Input type='text' placeholder='请输入你的账号' disabled={this.props.isLoading}/>
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [
                    {required: true, message: '必须填写密码'}
                  ]
                })(
                  <Input type='password' placeholder='请输入你的密码' disabled={this.props.isLoading}/>
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Checkbox disabled={this.props.isLoading}>记住我</Checkbox>
                )
              }
              <Button type='primary' htmlType='submit' loading={this.props.isLoading}>登录</Button>
            </Form.Item>
          </Card>
        </Form>
    )
  }
}

export default Login