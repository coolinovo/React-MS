import actionTypes from './action-type'
import {login} from '../requests/ajax'


const startLogin = () => {
  return {
    type: actionTypes.START_LOGIN
  }
}
const loginSuccess = (userInfo) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      userInfo
    }
  }
}
const loginFailed = () => {
  window.localStorage.removeItem('authoken')
  window.sessionStorage.removeItem('authoken')
  window.localStorage.removeItem('userInfo')
  window.sessionStorage.removeItem('userInfo')
  return {
    type: actionTypes.LOGIN_FAILED
  }
}

export const logout = () => {
  return dispatch => {
    // 实际需要发送请求告诉服务端用户退出
    dispatch(loginFailed())
  }
}

export const toLogin = (userInfoo) => {
  return async dispatch => {
    dispatch(startLogin())
    try {
      const response = await login(userInfoo)
      const {authtoken, ...userInfo} = response.data.data
      if (response.data.status === 200) {
        if (userInfo.remember){
          window.localStorage.setItem('authtoken', authtoken)
          window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
        } else {
          window.sessionStorage.setItem('authtoken', authtoken)
          window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        }
        dispatch(loginSuccess(response.data.data))
      } else {
        dispatch(loginFailed())
      }
    } catch (err) {

    }
  }
}

export const changeAvatar = (avatarUrl) => {
  return {
    type: actionTypes.CHANGE_AVATAR,
    payload: {
      avatarUrl
    }
  }
}