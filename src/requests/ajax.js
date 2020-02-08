import axios from 'axios'
import { message } from "antd"

const isDev = process.env.NODE_ENV === 'development'

// 创建 axios 实例
const service = axios.create({
  baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/243833' : ''
})

const serviceLogin = axios.create({
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
  if (response.data.status === 200) {
    return response.data.data
  } else {
    // 全局处理错误
    // console.log('error')
    message.error(response.data.msg, 1)
  }
})

// 登录
export const login = (userInfo) => {
  return serviceLogin.post('/api/v1/users/login', userInfo)
}

// 获取文章列表
export const getArticles = (offset = 0, limited = 10) => {
  return service.post('/api/v1/articleList', {
    offset,
    limited
  })
}

// 删除文章
export const delArticle = (id) => {
  return service.post('/api/v1/articleList/delete', {
    id
  })
}

// 获取文章详细内容
export const detailContent = (id) => {
  return service.post('/api/v1/articleList/detail', {
    id
  })
}

// 更新文章信息
export const updateArticle = (id, info) => {
  return service.post('/api/v1/articleList/update/' + id, {
    ...info
  })
}

// 获取浏览量
export const getAmount = () => {
  return service.post('/api/v1/articleList/amount')
}

// 通知中心
export const getNotice = () => {
  return service.post('/api/v1/notice')
}