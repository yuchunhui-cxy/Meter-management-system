import axios from '@/utils/axios'
export function getListPartInfo (data) {// 获取列表
  return axios({
    baseURL: process.env.API_URL,
    url: 'vendorAndPart/getListPartInfoByPage',
    method: 'post',
    data: data
  })
}

export function deleteInfo (id) {  // 删除
  return axios({
    baseURL: process.env.API_URL,
    url: 'vendorAndPart/deletePartInfo',
    method: 'post',
    data: id
  })
}

export function getVendorList (data) {// 供应商
  return axios({
    baseURL: process.env.API_URL,
    url: '/workInfo/getInfoForSearch',
    method: 'post',
    data: data
  })
}

export function getCustomerList (data) {// 客户
  return axios({
    baseURL: process.env.API_URL,
    url: '/workInfo/getInfoForSearch',
    method: 'post',
    data: data
  })
}
export function getProList (data) {// 产品
  return axios({
    baseURL: process.env.API_URL,
    url: '/workInfo/getInfoForSearch',
    method: 'post',
    data: data
  })
}
export function preservation (data) {// //添加、修改  保存
  return axios({
    baseURL: process.env.API_URL,
    url: '/vendorAndPart/addPartAllInfo',
    method: 'post',
    data: data
  })
}
