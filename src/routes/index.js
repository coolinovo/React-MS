import {
  Login,
  DashBoard,
  NotFound,
  List,
  Edit,
  Settings
} from '../views'

// 和 App 同级的路由
export const mainRouter = [{
  pathname: '/login',
  component: Login
},{
  pathname: '/404',
  component: NotFound
}]

// App 子路由
export const adminRouter = [{
  pathname: '/admin/dashboard',
  component: DashBoard
},{
  pathname: '/admin/settings',
  component: Settings
},{
  pathname: '/admin/list',
  component: List,
  exact: true
},{
  pathname: '/admin/list/edit/:id',
  component: Edit
}]
