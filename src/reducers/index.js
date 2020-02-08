// 合并
import { combineReducers } from 'redux'

import notice from './notice'
import userInfo from './user'

export default combineReducers({
  notice,
  userInfo
})