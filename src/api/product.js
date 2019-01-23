import axios from '@/utils/axios'
export function getProductInfo (data) {
  return axios({
    baseURL: process.env.API_URL,
    url: '/customerAndProduct/getProductListInfoByPage',
    method: 'post',
    data: data
  })
}

export function deleteProductInfo (id) {
  return axios({
    baseURL: process.env.API_URL,
    url: '/customerAndProduct/deleteProductInfo',
    method: 'post',
    data: id
  })
}