const stuInfo = r => require.ensure([],() => r(require('./components/AdminPage/stuInfo')),'stuInfo')
const updateStuInfo = r => require.ensure([],() => r(require('./components/AdminPage/stuInfo')),'updateStuInfo')
const addStu = r => require.ensure([],() => r(require('./components/AdminPage/addStu')),'addStu')
const addLeft = r => require.ensure([],() => r(require('./components/AdminPage/addLeft')),'addLeft')
const addRight = r => require.ensure([],() => r(require('./components/AdminPage/addRight')),'addRight')
const welcome = r => require.ensure([],() => r(require('./components/AdminPage/welcome')),'welcome')
const SOTDormitory = r => require.ensure([],() => r(require('./components/AdminPage/SOTDormitory')),'SOTDormitory')
const addRightWindow = r => require.ensure([],() => r(require('./components/AdminPage/addRightWindow')),'addRightWindow')
const AdminPage = r => require.ensure([],() => r(require('./views/AdminPage')),'AdminPage')
const ClientPage = r => require.ensure([],() => r(require('./views/ClientPage')),'ClientPage')
const selfIntroduction = r => require.ensure([],() => r(require('./views/selfIntroduction')),'selfIntroduction')
const adminLoginPage = r => require.ensure([],() => r(require('./components/AdminPage/adminLoginPage')),'adminLoginPage')
const Admin = r => require.ensure([],() => r(require('./components/AdminPage/Admin')),'Admin')
const userInfo = r => require.ensure([],() => r(require('./components/ClientPage/userInfo')),'userInfo')

const routes = [
  {
    path: '/AdminPage',
    component: AdminPage,
    children: [
      {
      path: '',
      name:'welcome',
      component: welcome,
      meta: {
        title:'欢迎使用管理员系统',
        requireAuth:true
      }
      },
      {
        path:'stuInfo',
        name:'stuInfo',
        component: stuInfo,
        children:[{
          path:'updateStuInfo',
          name:'updateStuInfo',
          component:updateStuInfo,
        }],
        meta:{
          title: '学生信息',
          keepalive:true,
          requireAuth:true
        }
      },
      {
        path: 'addStu',
        name:'addStu',
        component: addStu,
        children: [{
          path: 'addLeft',
          name:'addLeft',
          component: addLeft,
          meta:{
            title:'添加学生',
            keepalive: true,
            requireAuth:true
          }
        },
          {
            path: 'addRight',
            name: 'addRight',
            component: addRight,
            children:[{
              path:'addRightWindow',
              name:'addRightWindow',
              component:addRightWindow,
            }],
            meta:{
              title:'添加学生',
              keepalive:true,
              requireAuth:true
            }
          }]
      },
      {
        name: 'SOTDormitory',
        path: 'SOTDormitory',
        component: SOTDormitory,
        meta:{
          title: '宿舍管理',
          keepalive: true,
          requireAuth:true
        }
      },
      {
        name:'Admin',
        path: 'admin',
        component: Admin,
        meta: {
          title: "管理员",
          keepalive: true,
          requireAuth:true
        }
      }
    ]},
  {
    name: 'ClientPage',
    path: '/',
    component: ClientPage,
    meta:{
      title:'校园宿舍管理系统'
    }},
  {
    name: 'selfIntroduction',
    path: '/introduction',
    component: selfIntroduction,
    meta: {
      title: 'Introduction'
    }
  },
  {
    name:'adminLoginPage',
    path: '/adminLogin',
    component: adminLoginPage,
    meta: {
    title:'管理员登录'
    }
  },
  {
    name:'userInfo',
    path: '/userInfo',
    component:userInfo,
    meta: {
      title: '个人中心'
    }},
]

export default routes

