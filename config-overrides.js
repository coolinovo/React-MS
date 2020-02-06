/*
 * 基于 customize-cra 和 react-app-rewired 的定制化配置文件
 * 还需要修改 package.json 的 scripts 选项
 * 从 customize-cra 引入相关的方法
*/

const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy
} = require('customize-cra')

const theme = require('./theme')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: theme
  }),
  addDecoratorsLegacy()
)