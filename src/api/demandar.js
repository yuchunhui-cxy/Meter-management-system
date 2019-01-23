import axios from '@/utils/axios'
export function getDemandarInfo (data) {
  return axios({
    baseURL: process.env.API_URL,
    url: '/customerAndProduct/getCustomerListInfoByPage',
    method: 'post',
    data: data
  })
}

export function deleteInfo (id) {
  return axios({
    baseURL: process.env.API_URL,
    url: '/customerAndProduct/deleteCustomerInfo',
    method: 'post',
    data: id
  })
}

export function getCustomerInfo (data) {
  return axios({
    baseURL: process.env.API_URL,
    url: '/customerAndProduct/addCustomerBaseInfo',
    method: 'post',
    data: data
  })
}