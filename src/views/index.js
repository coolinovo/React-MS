/*
  Pages:
    - login
    - 404
    - admin
      - dashboard
      - artical manager
        - list
        - eidt
      - settings
 */

import Loadable from 'react-loadable'
import { Loading } from "../component"

// import Login from './login/index'
// import NotFound from './404/index'
// import DashBoard from './dash/index'
// import List from './article/list'
// import Edit from './article/edit'
// import Settings from './settings/index'

// 懒加载路由
const DashBoard = Loadable({
  loader: () => import('./dash'),
  loading: Loading
})
const Login = Loadable({
  loader: () => import('./login'),
  loading: Loading
})
const NotFound = Loadable({
  loader: () => import('./404'),
  loading: Loading
})
const List = Loadable({
  loader: () => import('./article/list'),
  loading: Loading
})
const Edit = Loadable({
  loader: () => import('./article/edit'),
  loading: Loading
})
const Settings = Loadable({
  loader: () => import('./settings'),
  loading: Loading
})
const Notice = Loadable({
  loader: () => import('./notifications'),
  loading: Loading
})

export {
  Login,
  DashBoard,
  NotFound,
  List,
  Edit,
  Settings,
  Notice
}