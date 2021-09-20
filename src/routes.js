import stuInfo from "./components/AdminPage/stuInfo";
import updateStuInfo from "./components/AdminPage/updateStuInfo";
import addStu from "./components/AdminPage/addStu";
import addLeft from "./components/AdminPage/addLeft";
import addRight from "./components/AdminPage/addRight";
import welcome from "./components/AdminPage/welcome";
import addRightWindow from "./components/AdminPage/addRightWindow";
import SOTDormitory from "./components/AdminPage/SOTDormitory";
import AdminPage from "./views/AdminPage";
import ClientPage from "./views/ClientPage";
import selfIntroduction from "./views/selfIntroduction";

const routes = [
  {
    name: 'AdminPage',
    path: '/AdminPage',
    component: AdminPage,
    children: [
      {
      path: '',
      name:'welcome',
      component: welcome,
      meta: {
       title:'欢迎使用管理员系统'
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
            keepalive: true
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
              keepalive:true
            }
          }]
      },
      {
        name: 'SOTDormitory',
        path: 'SOTDormitory',
        component: SOTDormitory,
        meta:{
          title: '宿舍管理',
          keepalive: true
        }
      },
    ]},
  {
    name: 'ClientPage',
    path: '/',
    component: ClientPage,
    meta:{
      title:'校园宿舍管理系统'
    }
  },
  {
    name: 'selfIntroduction',
    path: '/introduction',
    component: selfIntroduction,
    meta: {
      title: '关于我'
    }
  },
]
export default routes
