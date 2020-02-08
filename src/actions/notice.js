import actionTypes from './action-type'
import { getNotice } from '../requests/ajax'

const startMark = () => {
  return {
    type: actionTypes.START_MARK
  }
}
const finishMark = () => {
  return {
    type: actionTypes.FINISH_MARK
  }
}

// 异步 dispatch 传入一个同步动作
// 单个已读
export const markNotice = (id) => {
  return dispatch => {
    // 点击时改变
    dispatch(startMark())
    // 模拟 ajax
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_NOTICE,
        payload: { id }
      })
      dispatch(finishMark())
    }, 800)
  }
}

// 全部已读
export const markAllNotice = () => {
  return dispatch => {
    // 点击时改变
    dispatch(startMark())
    // 模拟 ajax
    setTimeout(() => {
      dispatch({
        type: actionTypes.MARK_ALL_NOTICE
      })
      dispatch(finishMark())
    }, 800)
  }
}

// 获取 notice
export const getAllNotice = () => {
  return async dispatch => {
    // 点击时改变
    dispatch(startMark())
    try {
      const response = await getNotice()
      dispatch({
        type: actionTypes.POST_NOTICE_REQ,
        payload: {
          list: response.list
        }
      })
    } catch (err) {
      console.log(err)
    } finally {
      dispatch(finishMark())
    }
  }
}