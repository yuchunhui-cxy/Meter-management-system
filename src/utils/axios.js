import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
// 创建axios实例
const service = axios.create({
  baseURL: window.configUrl[process.env.NODE_ENV].API_URL, // api的api_url process.env.API_URL
  timeout: 0, // 请求超时时间
  withCredentials: true
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
//     alert(JSON.stringify(response.data));
    let res = response.data
    if ('20011' == res.code) { // 20011 登陆已过期 20010 权限不足  还存在bug
      store.dispatch('FedLogOut').then(() => {
        // 跳转登陆界面
        window.location.href = window.configUrl[process.env.NODE_ENV].LOGIN_URL
      })
    } else {
    	
      if(response.data instanceof Blob){
      	 return response
      }else{
      	return response.data
      }
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      type: 'error',
      message: error.message,
      duration: 2000
    })
    return Promise.reject(error)
  }
)

export default service
