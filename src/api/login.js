import axios from '@/utils/axios'
export function getInfo (data) {
  return axios({
    baseURL: window.configUrl[process.env.NODE_ENV].PERMISSION_HOST,
    url: '/sys/menu/leftlist',
    method: 'post',
    data: data
  })
}

export function logout () {
  return axios({
    baseURL: window.configUrl[process.env.NODE_ENV].PERMISSION_HOST,
    url: '/login/logout',
    method: 'post'
  })
}
