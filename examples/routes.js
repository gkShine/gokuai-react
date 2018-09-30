import Home from './pages/Home'
import Finder from './pages/Finder'
import Upload from './pages/Upload'
import Fileicon from './pages/Fileicon'
import Button from './pages/Button'
import Table from './pages/Table'
import Menu from './pages/Menu'
import Thumbnail from './pages/Thumbnail'
import Dropdown from './pages/Dropdown'
import Slide from './pages/Slide'

let Routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    name: '介绍'
  },
  {
    path: '/button',
    component: Button,
    name: '按钮'
  },
  {
    path: '/menu',
    component: Menu,
    name: '菜单'
  },
  {
    path: '/table',
    component: Table,
    name: '表格'
  },
  {
    path: '/slide',
    component: Slide,
    name: '幻灯片'
  },
  {
    path: '/dropdown',
    component: Dropdown,
    name: '下拉框'
  },
  {
    path: '/fileicon',
    component: Fileicon,
    name: '文件图标'
  },
  {
    path: '/upload',
    component: Upload,
    name: '文件上传'
  },
  {
    path: '/thumbnail',
    component: Thumbnail,
    name: '缩略图列表'
  },
  {
    path: '/finder',
    component: Finder,
    name: '文件管理器'
  }
];

export default Routes;