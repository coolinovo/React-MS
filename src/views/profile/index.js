import React, { Component } from 'react'
import { Card, Upload, Spin } from 'antd'
import axios from 'axios'
import {connect} from 'react-redux'
import { changeAvatar } from "../../actions/user";

const mapState = state => ({
  avatarUrl: state.userInfo.avatar
})

@connect(mapState, {changeAvatar})
class Profile extends Component {
  state = {
    isUpLoading: false
  }
  upLoad = ({file}) => {
    const data = new FormData()
    data.append('Token', '')
    data.append('file', file)
    this.setState({
      isUpLoading: true
    })
    axios.post('example.com', data)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            isUpLoading: false
          })
          this.props.changeAvatar()
        } else {
          console.log('lalala')
          this.setState({
            isUpLoading: false
          })
        }
      })
      .catch(err => {})
      .finally(() => {
        this.setState({
          isUpLoading: false
        })
      })
  }
  render() {
    return (
      <Card title='个人设置' bordered={false}>
        <Upload
          customRequest={this.upLoad}
          style={{
            border: '1px solid #0099ff',
            width: 20,
            height: 20,
            display: 'block'
          }}>
          <Spin spinning={this.state.isUpLoading}>
            {
              this.props.avatarUrl?<img alt='头像' src={this.props.avatarUrl}/>
              :
                <span>点击上传</span>
            }
          </Spin>
        </Upload>
      </Card>
    )
  }
}

export default Profile