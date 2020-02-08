import actionTypes from '../actions/action-type'
// 初始化状态
const initState = {
  isLoading: false,
  list: [{
    id: 1,
    title: 'Lorem ipsum dolor sit 111',
    desc: '111 ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    hasRead: false
  },{
    id: 2,
    title: 'Lorem ipsum dolor sit 222',
    desc: '222 ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    hasRead: true
  },{
    id: 3,
    title: 'Lorem ipsum dolor sit 333',
    desc: '333 ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
    hasRead: true
  }]
}

// 单个已读
export default ( state = initState, action ) => {
  switch (action.type) {
    // 请求通知列表
    case actionTypes.POST_NOTICE_REQ:
      return {
        ...state,
        list: action.payload.list
      }
    // loading 样式
    case actionTypes.START_MARK:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.FINISH_MARK:
      return {
        ...state,
        isLoading: false
      }
    // 单个已读
    case actionTypes.MARK_NOTICE:
      const list = state.list.map(item => {
        if (item.id === action.payload.id) {
          item.hasRead = true
        }
        return item
      })
      // 返回修改后的状态
      return {
        ...state,
        list
      }
    // 全部已读
    case actionTypes.MARK_ALL_NOTICE:
      return {
        ...state,
        list: state.list.map(item => {
          item.hasRead = true
          return item
        })
      }
    // 无对应 action 则返回默认 state
    default:
      return state
  }
}