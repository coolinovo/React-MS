import actionTypes from '../actions/action-type'

const isLogin = Boolean(window.localStorage.getItem('authtoken')) || Boolean(window.sessionStorage.getItem('authtoken'))
const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || JSON.parse(window.sessionStorage.getItem('userInfo'))

// 初始化用户信息
const initUserInfo = {
  ...userInfo,
  isLogin,
  isLoading: false
}


export default (state = initUserInfo, action) => {
  switch (action.type) {
    case actionTypes.START_LOGIN:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload.userInfo,
        isLoading: false,
        isLogin: true
      }
    case actionTypes.LOGIN_FAILED:
      return {
        id: '',
        displayName: '',
        avatar: '',
        isLogin: false,
        isLoading: false,
        role: ''
      }
    default:
      console.log(action)
      return state
  }
}

