import axios from 'axios'
import { message } from "antd"

const isDev = process.env.NODE_ENV === 'development'

// 创建 axios 实例
const service = axios.create({
  baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/243833' : ''
})

// -----------------拦截器----------------------------

service.interceptors.request.use((config) => {
  config.data = Object.assign({}, config.data, {
    // 正常情况
    // authtoken: window.localStorage.getItem('authtoken')
    // 测试
    authtoken: 'qwertyuiop'
  })
  return config
})

service.interceptors.response.use((response) => {
  console.log(response)
  if (response.data.status === 200) {
    return response.data.data
  } else {
    // 全局处理错误
    // console.log('error')
    message.error(response.data.msg, 1)
  }
})

export const getArticles = (offset = 0, limited = 10) => {
  return service.post('/api/v1/articleList', {
    offset,
    limited
  })
}