import axios from '@/utils/axios'
export function getVendorInfo (data) {
  return axios({
    baseURL: process.env.API_URL,
    url: 'vendorAndPart/getListVendorInfoByPage',
    method: 'post',
    data: data
  })
}

export function deleteInfo (id) {
  return axios({
    baseURL: process.env.API_URL,
    url: 'vendorAndPart/deleteVendorInfo',
    method: 'post',
    data: id
  })
}
