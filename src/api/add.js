import axios from '@/utils/axios'
//添加计量信息
export function add(data) {
	return axios({
//		baseURL: process.env.PERMISSION_HOST,
		url: '/meter/addGaugeBaseInfo',
		method: 'post',
		data: data,
		headers:{
			'Content-Type':'multipart/form-data'
		}
	})

}
//获取主页表格
export function list(data) {
	return axios({
		url: '/meter/getGaugeListInfoByPage',
		method: 'post',
		data: data,
	})

}
//公司列表
export function search_company(data) {
	return axios({
		url: '/search/getCompany',
		method: 'post',
	})

}
//管理编号列表
export function search_getManageCode(data) {
	return axios({
//		baseURL: process.env.PERMISSION_HOST,
		url: '/search/getManageCode',
		method: 'post',
	})

}
//道具名称列表
export function search_getMeterName(data) {
	return axios({
//		baseURL: process.env.PERMISSION_HOST,
		url: '/search/getMeterName',
		method: 'post',
	})

}
//使用现场列表
export function search_getJobsite(data) {
	return axios({
		url: '/search/getJobsite',
		method: 'post',
	})

}
//设备状态列表
export function search_getDevice(data) {
	return axios({
		url: '/search/getDevice',
		method: 'post',
	})

}
//add的管理人列表
export function add_getManager(data) {
	return axios({
		url: '/search/getManager',
		method: 'post',
	})

}
//index的管理人列表
export function index_getManagerList(data) {
	return axios({
		url: '/search/getManagerList',
		method: 'post',
	})

}
//查看单条的接口
export function meter_getGaugeBaseInfo(data) {
	return axios({
		url: '/meter/getGaugeBaseInfo',
		method: 'post',
		data: data,
	})

}
//获取三个文件的接口
export function check_files(data) {
	return axios({
		url: '/meter/getFileList',
		method: 'post',
		data: data,
	})

}
//修改接口
export function meter_updateGaugeBaseInfo(data) {
	return axios({
		url: '/meter/updateGaugeBaseInfo',
		method: 'post',
		data: data,
	})

}

//主页全部导出
export function meter_exportMeter(config) {
	return axios(config)

}

//全部下载
export function downFileByType(config) {
//	return axios({
//		url: '/meter/downFileByType',
//		method: 'post',
//		responseType: "blob",
//		data: data,
//	})
	return axios(config)

}
//管理编号是否重复 
export function search_getCodeCount(data) {
	return axios({
		url: '/search/getCodeCount',
		method: 'post',
		data: data,
	})

}