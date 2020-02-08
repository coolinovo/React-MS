import {
  Login,
  DashBoard,
  NotFound,
  List,
  Edit,
  Settings,
  Notice
} from '../views'

// 和 App 同级的路由
export const mainRoute = [{
  pathname: '/login',
  component: Login
},{
  pathname: '/404',
  component: NotFound
}]

// App 子路由
export const adminRoute = [{
  pathname: '/admin/dashboard',
  component: DashBoard,
  title: '仪表盘',
  icon: 'dashboard',
  isNav: true
},{
  pathname: '/admin/list',
  component: List,
  exact: true,
  title: '文章列表',
  icon: 'unordered-list',
  isNav: true
},{
  pathname: '/admin/list/edit/:id',
  component: Edit,
  title: '编辑',
  icon: 'edit'
},{
  pathname: '/admin/notice',
  component: Notice
},{
  pathname: '/admin/settings',
  component: Settings,
  title: '设置',
  icon: 'setting',
  isNav: true
}]
