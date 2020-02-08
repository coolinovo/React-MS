// 同步动作
export default {
  // 通过 id 标记单个通知为已读
  MARK_NOTICE: 'MARK_NOTICE',
  // 通过 id 标记全部通知为已读
  MARK_ALL_NOTICE: 'MARK_ALL_NOTICE',
  // 开始发送 mark 请求，加载对应按钮的 loading 样式
  START_MARK: 'START_MARK',
  // 成功返回响应
  FINISH_MARK: 'FINISH_MARK',
  // 发送请求
  POST_NOTICE_REQ: 'POST_NOTICE_REQ',
  // 登录
  START_LOGIN: 'START_LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  // 更换头像
  CHANGE_AVATAR: 'CHANGE_AVATAR'
}