import axios from '@/utils/axios'
export function getJobsiteInfo (data) {
  return axios({
    baseURL: 'http://192.168.1.50:8080',
    url: '/qms/jobsite/getListJobSiteByPage',
    method: 'post',
    data: data
  })
}
// 获取列表的接口如上

export function deleteJobsiteInfo (id) {
  return axios({
    baseURL: 'http://192.168.1.50:8080',
    url: '/qms/jobsite/deleteJobSite',
    method: 'post',
    data: id
  })
}
// 删除数据的列表如上

export function save (data) {
  return axios({
    baseURL: 'http://192.168.1.50:8080',
    url: '/qms/jobsite/addJobSite',
    method: 'post',
    data: data
  })
}

export function logout () {
    return axios({
      baseURL: process.env.PERMISSION_HOST,
      url: '/login/logout',
      method: 'post'
    })
  }