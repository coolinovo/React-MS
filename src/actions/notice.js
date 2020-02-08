import actionTypes from './action-type'

// 异步 dispatch 传入一个同步动作
// 单个已读
export const markNotice = (id) => {
  return dispatch => {
    // 模拟 ajax
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_NOTICE,
        payload: { id }
      })
    }, 800)
  }
}

// 全部已读
export const markAllNotice = () => {
  return dispatch => {
    // 模拟 ajax
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_ALL_NOTICE
      })
    }, 800)
  }
}