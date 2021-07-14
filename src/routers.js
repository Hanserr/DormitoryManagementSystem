import stuInfo from "./components/stuInfo";
import updateStuInfo from "./components/updateStuInfo";
import addStu from "./components/addStu";
const routers = [
  {
    path:'/stuInfo',
    name:'stuInfo',
    component: stuInfo,
    children:[{
      path:'updateStuInfo',
      component:updateStuInfo,
    }]
  },
  {
    path: '/addStu',
    name:'addStu',
    component: addStu
  },
]
export default routers
