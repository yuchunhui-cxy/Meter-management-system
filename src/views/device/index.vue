<template>
	<div>
		<div :class="search.cls" v-show="search.show">
			<div class="grg_searchT clearfix">
				<h3 class="pull-left">高级搜索</h3>
				<el-button type="primary" round class="pull-right grg_btn_color_white grg_btn_border_blue grg_btn_bgcolor_blue" @click='search_btn'>搜索</el-button>
				<el-button type="primary" round class="pull-right grg_btn_color_white grg_btn_border_blue grg_btn_bgcolor_blue" @click='reset' style='background-color: white; border: 1px solid #D99C1A; color:#D99C1A ; margin-right: 15px!important;'>重置</el-button>
			</div>
			<el-row :gutter='20'>
				<el-form>
					<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="3">
						<el-form-item label="所属公司">
							<el-tooltip :content="prompt" placement="top" v-if='show_prompt'>
								<el-select @change='get_prompt' v-model="searchParams.companyFormat" multiple :collapse-tags=true style='width: 100%;' filterable placeholder='请选择'>
									<el-option-group v-for="group in getCompany" :key="group.proxyCompantTypeName" :label="group.proxyCompanyTypeName">
										<el-option v-for="item in group.proxyCompanyList" :key="item.i" :label="item.name" :value="item.i">
										</el-option>
									</el-option-group>
								</el-select>
							</el-tooltip>
								<el-select v-if='!show_prompt' @change='get_prompt' v-model="searchParams.companyFormat" multiple :collapse-tags=true style='width: 100%;' filterable placeholder='请选择'>
									<el-option-group v-for="group in getCompany" :key="group.proxyCompantTypeName" :label="group.proxyCompanyTypeName">
										<el-option v-for="item in group.proxyCompanyList" :key="item.i" :label="item.name" :value="item.i">
										</el-option>
									</el-option-group>
								</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="3">
						<el-form-item label="管理编号">
							<el-select v-model='searchParams.manageCode' :clearable=true style='width: 100%;' filterable placeholder='请选择'>
								<el-option :label="i" v-for='i in manageCode' :value="i"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="3">
						<el-form-item label="量具名称">
							<el-select v-model='searchParams.name' :clearable=true style='width: 100%;' filterable placeholder='请选择'>
								<el-option :label="i" v-for='i in name' :value="i"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="3">
						<el-form-item label="计量有效期">
							<el-date-picker style="width: 100%;" v-model="jiliangtime" type="daterange" value-format='yyyy-MM-dd HH:mm:ss' unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="3">
						<el-form-item label="设备状态">
							<el-select v-model='searchParams.deviceStateIdFormat' multiple :collapse-tags=true style='width: 100%;' filterable placeholder='请选择'>
								<el-option v-for='item in device' :value="item.id" :label='item.name'></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="3">
						<el-form-item label="使用现场">
							<el-select v-model='searchParams.jobsiteIdFormat' multiple :collapse-tags=true style='width: 100%;' filterable placeholder='请选择'>
								<el-option  v-for='i in jobsiteId' :value="i.id" :label="i.name"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="3">
						<el-form-item label="管理人">
							<el-select v-model='searchParams.managerIdFormat' multiple :collapse-tags=true style='width: 100%;' filterable placeholder='请选择'>
								<el-option  v-for='i in managerId' :value="i.id" :label="i.name"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="3">
						<el-form-item label="MSA有效期">
							<el-date-picker style="width: 100%;" v-model="msatime" type="daterange" value-format='yyyy-MM-dd HH:mm:ss' unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
							</el-date-picker>
						</el-form-item>
					</el-col>
				</el-form>
			</el-row>
		</div>
		<!--数据列表-->
		<div class="grg_box grg_box_full_width grg_marT grg_padd clearfix" style="position:relative">
			<div class="big_radian">
				<!--搜索按钮-->
				<img :src="imgs.search_back" alt="" class="grg_search_push" @click="toggleSearch(0)" v-show="search.show" />
				<svg-icon icon-class="search" class="grg_search_pull" @click.native="toggleSearch(1)" v-show="!search.show"></svg-icon>
			</div>
			<div class="grg_searchT clearfix">
				<h3 class="pull-left">计量台账</h3>
				<el-button type="primary" round class="pull-right grg_btn_color_white grg_btn_border_blue grg_btn_bgcolor_blue" @click='search_btn(1)'>全部导出</el-button>
				<el-button round class="pull-right grg_btn_color_green grg_btn_border_green grg_marR" @click="globalFun.jump('/device/add')" style='background-color: white; border: 1px solid #D99C1A; color:#D99C1A ;'>添加</el-button>
			</div>
			<!--table-->
			<el-table :data="tableData" class="grg_table">
				<el-table-column align="center" prop="xuhao" label="序号" type="index" width='50'>

				</el-table-column>
				<el-table-column align="left" prop="companyId" label="所属公司" width='170'>
				</el-table-column>
				<el-table-column align="left" prop="manageCode" label="管理编号" width='120'>
				</el-table-column>
				<el-table-column align="left" prop="name" label="量具名称" width='120'>
				</el-table-column>
				<el-table-column align="left" prop="factoryCode" label="出场编号" width='120'>
				</el-table-column>
				<el-table-column align="left" prop="calibrationCycle" label="校准周期(月)" width='130'>

				</el-table-column>
				<el-table-column align="left" prop="mvperiod" label="计量有效期" width='130'>
					<template scope='scope'>
						<span v-if="scope.row.yellow1" style='color: #FAC50B; font-weight: bold;'>{{scope.row.mvperiod}}</span>
						<span v-else-if="scope.row.red1" style='color: #E73732; font-weight: bold;'>{{scope.row.mvperiod}}</span>
						<span v-else>{{scope.row.mvperiod}}</span>
					</template>
				</el-table-column>
				<el-table-column align="left" prop="verificationState" label="检定状态" width='120'>

				</el-table-column>
				<el-table-column align="left" prop="deviceStateId" label="设备状态" width='120'>
				</el-table-column>
				<el-table-column align="left" prop="jobsiteId" label="使用现场" width='120'>
				</el-table-column>
				<el-table-column align="left" prop="managerId" label="管理人" width='120'>
				</el-table-column>
				<el-table-column align="left" prop="msaYn" label="MSA管理" width='120'>
				</el-table-column>
				<el-table-column align="left" prop="msaExpiryDay" label="MSA有效期" width='140'>
					<template scope='scope'>
						<span v-if="scope.row.yellow2" style='color: #FAC50B; font-weight: bold;'>{{scope.row.msaExpiryDay}}</span>
						<span v-else-if="scope.row.red2" style='color: #E73732; font-weight: bold;'>{{scope.row.msaExpiryDay}}</span>
						<span v-else>{{scope.row.msaExpiryDay}}</span>
					</template>
				</el-table-column>
				<el-table-column align="left" prop="msaState" label="MSA状态">
				</el-table-column>

				<el-table-column label="操作" align='center' width='180'>
					<template slot-scope="scope">
						<el-button size="mini" @click="handleEdit(scope.$index, scope.row)" style='background-color: #568D07; color: #FFFFFF; border-radius: 4px;'>查看</el-button>
						<el-button size="mini" @click="handleDelete(scope.$index, scope.row)" style='background-color: #2A7A9A; color: #FFFFFF; border-radius: 4px;'>修改</el-button>
					</template>
				</el-table-column>

			</el-table>
			<el-pagination class="grg_marT pull-right" background v-if='pageObj.total!=0' @size-change="pageSizeChange" @current-change="currentChange" :current-page="pageObj.currentPage" :page-sizes="pageObj.pageSizes" :page-size="pageObj.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageObj.total">
			</el-pagination>
			<el-dialog title="Excel导出中" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :modal-append-to-body=false :close-on-click-modal=false>
				<span><el-progress :text-inside="true" :stroke-width="18" :percentage="pro" status="success"></el-progress></span>
				<span slot="footer" class="dialog-footer">
  				</span>
			</el-dialog>
		</div>
	</div>
</template>
<script>
	import report_bg from "../../assets/images/report_bg.png"
	import search_back from "../../assets/images/search_back.png"
	import {
		list,
		search_company,
		search_getManageCode,
		search_getMeterName,
		search_getJobsite,
		//		meter_getManager,
		meter_exportMeter,
		index_getManagerList,
		search_getDevice
	} from '@/api/add'

	export default {
		data: function() {
			return {
				//				存储所属公司文字提示
				prompt: '',
				show_prompt:false,
				//				时间日期
				pickerOptions2: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				jiliangtime: null,
				msatime: null,
				//				搜索框列表以供遍历显示
				getCompany: [],
				manageCode: [],
				name: [],
				jobsiteId: [],
				managerId: [],
				device: [],

				//				控制计量有效期颜色和msa有效期变色
				yellow1: false,
				yellow2: false,
				red1: false,
				red2: false,

				imgs: {
					report_bg: report_bg,
					search_back: search_back
				},
				input: '',
				search: {
					show: true,
					cls: "grg_box grg_box_full_width grg_marT grg_padd"
				},

				//				以供table列表遍历
				tableData: [],
				//				进度条对话框
				dialogVisible: false,
				//				导出进度
				pro: 10,
				a: 1,

				//				table和搜索的接口数据
				searchParams: {
					company: [],
					companyFormat: [],

					manageCode: '',
					name: '',
					mvperiod: '',
					endMvperiod: '',

					deviceStateId: '',
					deviceStateIdFormat: [],

					jobsiteId: '',
					jobsiteIdFormat: [],

					managerId: '',
					managerIdFormat: [],

					msaExpiryDay: '',
					endMsaExpiryDay: "",

				},
				//				table和搜索的接口页面数据
				pageObj: {
					//					当前页数
					currentPage: 1,
					//					转换每页显示多少条
					pageSizes: [10, 15, 20, 30],
					//					每页显示条数
					pageSize: 10,
					//					共多少条
					total: 0
				}
			}
		},

		//		生命函数
		mounted: function() {
			//			加载table方法
			this.doList()
			//			搜索的接口
			this.do_search_company()
			this.do_search_getManageCode()
			this.do_search_getMeterName()
			this.do_search_getJobsite()
			this.do_meter_getManager()
			this.do_search_getDevice()
		},
		methods: {
			//所属公司显示提示文字
			get_prompt() {
				if(this.searchParams.companyFormat.length != 0) {
					this.show_prompt = true
					let type = this.searchParams.companyFormat[0].split('-')[0]
					let id = this.searchParams.companyFormat[0].split('-')[1]
					if(type == 1) {
						let p = this.getCompany[0].proxyCompanyList.find(item => {
							return item.id == id
						})
						this.prompt = p.name
					} else if(type == 2) {
						let p = this.getCompany[1].proxyCompanyList.find(item => {
							return item.id == id
						})
						this.prompt = p.name
					} else {
						let p = this.getCompany[2].proxyCompanyList.find(item => {
							return item.id == id
						})
						this.prompt = p.name
					}
				}

			},

			//search 切换
			toggleSearch: function(status) {
				let me = this;
				if(status) {
					this.search.show = true;
					this.search.cls =
						"grg_box grg_box_full_width grg_marT grg_padd animated zoomIn";
				} else {
					this.search.cls =
						"grg_box grg_box_full_width grg_marT grg_padd animated zoomOut";
					setTimeout(function() {
						me.search.show = false;
					}, 300);
				}
			},

			//		切换每页条数
			pageSizeChange: function(x) {
				this.pageObj.currentPage = 1
				this.pageObj.pageSize = x
				this.doList()
			},
			//			翻页
			currentChange: function(x) {
				this.pageObj.currentPage = x
				//				this.$store..commit('save', x)

				//				localStorage.setItem('key',x)
				this.doList()

			},

			//			查看操作
			handleEdit(index, row) {
				//				console.log(index, row);
				this.$router.push({
					path: '/device/view',
					query: {
						'type': 'view',
						'id': row.id
					}
				})

			},
			//			修改操作
			handleDelete(index, row) {
				//				console.log(index, row);
				this.$router.push({
					path: '/device/set',
					query: {
						'type': 'set',
						'id': row.id
					}
				})
			},

			//			获取table列表方法,x有值代表搜索
			doList(x) {
				if(x == 1) {
					this.pageObj.currentPage = 1
				}
				//				else{
				//					this.pageObj.currentPage = 1
				//				}
				let me = this,
					params;
				//				参数
				params = {
					param: this.searchParams,
					page: {
						pageNum: this.pageObj.currentPage,
						pageSize: this.pageObj.pageSize
					}
				}

				//				处理table接口
				list(params).then(function(res) {
					if(res.code === '200') {
						if(x == 1) {
							if(res.data.pageData.length == 0) {
								me.$message({
									showClose: true,
									message: "暂无数据,请更换筛选条件!",
									type: "warning",
									duration: 1000
								})
							}
						}
						me.tableData = res.data.pageData
						for(var i = 0; i < me.tableData.length; i++) {
							//							如果计量有效期不为空把计量有效期的时间去掉不显示只要日期
							if(me.tableData[i].mvperiod != null) {

								me.tableData[i].mvperiod = me.tableData[i].mvperiod.split(' ')[0]
							}
							//							如果msa是Y,msa有效期的时间去掉不显示只要日期
							if(me.tableData[i].msaYn === 'Y') {
								if(me.tableData[i].msaExpiryDay != null) {
									me.tableData[i].msaExpiryDay = me.tableData[i].msaExpiryDay.split(' ')[0]
								}
								if(me.tableData[i].msaState == 1) {
									me.tableData[i].msaState = '合格'
								} else {
									me.tableData[i].msaState = '不合格'
								}
							}
							//							如果检定状态不为空,处理显示内容
							if(me.tableData[i].verificationState != null) {
								if(me.tableData[i].verificationState == 1) {
									me.tableData[i].verificationState = '合格'
								} else {
									me.tableData[i].verificationState = '不合格'

								}
							}

						}
						//						处理msa有效期的颜色
						for(var i = 0; i < me.tableData.length; i++) {
							if(me.tableData[i].msaExpiryDay != null) {
								var yy = new Date()
								var y = yy.getFullYear()
								var m = yy.getMonth() + 1
								var d = yy.getDate()
								var yy = new Date(y + '/' + m + '/' + d)
								var z = me.tableData[i].msaExpiryDay.split('-').join('/')
								var y = new Date(z)
								var a = y - yy
								if(me.tableData[i].deviceStateId != '报废' && me.tableData[i].deviceStateId != '新购入') {
									if(a >= 0 && a < 1000 * 60 * 60 * 24 * 30) {
										me.tableData[i].yellow2 = true
									} else if(a < 0) {
										me.tableData[i].red2 = true
									}

								}
							}

						}
						//						处理计量有效期的颜色
						for(var i = 0; i < me.tableData.length; i++) {
							if(me.tableData[i].mvperiod != null) {
								var yy = new Date()
								var y = yy.getFullYear()
								var m = yy.getMonth() + 1
								var d = yy.getDate()
								var yy = new Date(y + '/' + m + '/' + d)
								var z = me.tableData[i].mvperiod.split('-').join('/')
								var y = new Date(z)
								var a = y - yy
								if(me.tableData[i].deviceStateId != '报废' && me.tableData[i].deviceStateId != '新购入') {
									if(a >= 0 && a < 1000 * 60 * 60 * 24 * 30) {
										me.tableData[i].yellow1 = true
									} else if(a < 0) {
										me.tableData[i].red1 = true
									}

								}
							}

						}
						//						赋值共多少条
						me.pageObj.total = res.data.totalCount
					}

				})

			},

			//获取所属公司下拉框列表接口
			do_search_company() {
				let me = this
				search_company().then(function(res) {
					if(res.code === '200') {
						//						每个对象添加一个type属性
						//						res.data[0].type = 0
						//						me.getCompany.push(res.data[0])
						//						for(var i = 0; i < res.data[1].length; i++) {
						//							res.data[1][i].type = 1
						//							me.getCompany.push(res.data[1][i])
						//						}
						//						for(var i = 0; i < res.data[2].length; i++) {
						//							res.data[2][i].type = 2
						//							me.getCompany.push(res.data[2][i])
						//						}
						//						//						每个对象添加一个i属性
						//						me.getCompany.forEach((item, index) => {
						//							me.getCompany[index]['i'] = item.type + '-' + item.id
						//						})
						for(var i = 0; i < res.data[0].proxyCompanyList.length; i++) {
							res.data[0].proxyCompanyList[i].i = res.data[0].proxyCompanyType + '-' + res.data[0].proxyCompanyList[i].id

						}
						for(var i = 0; i < res.data[1].proxyCompanyList.length; i++) {
							res.data[1].proxyCompanyList[i].i = res.data[1].proxyCompanyType + '-' + res.data[1].proxyCompanyList[i].id

						}
						for(var i = 0; i < res.data[2].proxyCompanyList.length; i++) {
							res.data[2].proxyCompanyList[i].i = res.data[2].proxyCompanyType + '-' + res.data[2].proxyCompanyList[i].id

						}
						me.getCompany = res.data

					}

				})
			},
			//			获取设备状态列表接口
			do_search_getDevice() {
				search_getDevice().then(res => {
					if(res.code == 200) {
						this.device = res.data
					}
				})
			},
			//			获取管理编号下拉列表接口
			do_search_getManageCode() {
				let me = this
				search_getManageCode().then(function(res) {
					if(res.code === '200') {
						me.manageCode = res.data
					}
				})
			},
			//			获取道具名称下拉列表接口
			do_search_getMeterName() {
				let me = this
				search_getMeterName().then(function(res) {
					if(res.code === '200') {
						me.name = res.data
					}
				})
			},
			//			获取工作地点下拉列表接口
			do_search_getJobsite() {
				let me = this
				search_getJobsite().then(function(res) {
					if(res.code === '200') {
						me.jobsiteId = res.data
					}
				})
			},
			//			获取管理人下拉列表接口
			do_meter_getManager() {
				let me = this
				index_getManagerList().then(function(res) {
					if(res.code === '200') {
						me.managerId = res.data
					}
				})
			},
			//			搜索按钮和导出按钮(x=1时为导出)
			search_btn(x) {
				//				全部导出或搜索
				if(this.searchParams.companyFormat.length == 0 && this.searchParams.manageCode == '' && this.searchParams.name == '' && this.jiliangtime == null && this.searchParams.deviceStateIdFormat.length == 0 && this.searchParams.jobsiteIdFormat.length == 0 && this.searchParams.managerIdFormat.length == 0 && this.msatime == null) {
					//					如果是全部导出
					if(x == 1) {

						let me = this,
							params;
						params = this.searchParams
						//						let form = document.createElement("form"),
						//							hidden_input = document.createElement('input');
						//						form.action = process.env.API_URL + "/meter/exportMeter"
						//						form.method = "post"
						//						hidden_input.value = JSON.stringify(params)
						//						hidden_input.type = 'hidden'
						////						hidden_input.name = 'postInfo'
						//						
						//						form.appendChild(hidden_input);
						//						document.body.appendChild(form);
						//						form.submit();
						//						导出接口
						meter_exportMeter({
							method: 'post',
							url: '/meter/exportMeter',
							responseType: "blob",
							data: params,
							timeout: 30000,
							onDownloadProgress: function(progressEvent) {
								this.dialogVisible = true

								if(progressEvent.total != 0) {
									        						console.log(progressEvent);
									me.pro = Number((progressEvent.loaded / progressEvent.total) * 100)
									if(me.pro == 100) {
										me.dialogVisible = false
										me.$message({
											showClose: true,
											message: 'Excel导出成功',
											type: 'success',
											duration: 1000,
										})
									}
								}

							}
						}).then(function(res) {
							//							处理文件下载
							let reader = new FileReader()
							let fileName = decodeURIComponent(res.headers['content-disposition'].split(';')[1].substring(9));
							reader.readAsDataURL(res.data);
							reader.onload = e => {
								let a = document.createElement("a");
								a.download = fileName;
								a.href = URL.createObjectURL(res.data);
								document.body.appendChild(a);
								a.click();
								document.body.removeChild(a);
							};
						}).catch(function() {
							me.dialogVisible = false
							me.$message({
								showClose: true,
								message: 'Excel导出失败,请更换筛选条件或检查数据是否为空',
								type: 'warning',
								duration: 1000,
							})
						})
						//						如果是全部搜索
					} else {
						this.searchParams.company = []
						//						this.searchParams.companyFormat = []
						this.searchParams.company = []
						this.searchParams.manageCode = ''
						this.searchParams.name = ''
						this.searchParams.mvperiod = ''
						this.searchParams.endMvperiod = null
						this.searchParams.deviceStateId = ''
						this.searchParams.jobsiteId = ''
						this.searchParams.managerId = ''
						this.searchParams.msaExpiryDay = ''
						this.searchParams.endMsaExpiryDay = null
						this.doList(1)
					}
					//				条件导出或者搜索
				} else {
					//					this.pageObj.currentPage = 1
					//					this.pageObj.pageSize = 10
					//					清空传给接口的所属公司的值
					this.searchParams.company = []

					for(var i = 0; i < this.searchParams.companyFormat.length; i++) {
						this.searchParams.company.push({
							'id': this.searchParams.companyFormat[i].split('-')[1],
							"type": this.searchParams.companyFormat[i].split('-')[0]
						})
					}
					//					把搜索所选的值处理并赋值给接口要得数据
					this.searchParams.deviceStateId = this.searchParams.deviceStateIdFormat.join(',')
					this.searchParams.jobsiteId = this.searchParams.jobsiteIdFormat.join(',')
					this.searchParams.managerId = this.searchParams.managerIdFormat.join(',')
					if(this.jiliangtime) {
						this.searchParams.mvperiod = this.jiliangtime[0]
						this.searchParams.endMvperiod = this.jiliangtime[1]
					}
					if(this.msatime) {
						this.searchParams.msaExpiryDay = this.msatime[0]
						this.searchParams.endMsaExpiryDay = this.msatime[1]
					}
					//					如果是条件导出
					if(x === 1) {

						let me = this,
							params;
						params = this.searchParams
						//						let form = document.createElement("form"),
						//							hidden_input = document.createElement('input');
						//						form.action = process.env.API_URL + "/meter/exportMeter"
						//						form.method = "post"
						//						hidden_input.value = JSON.stringify(params)
						//						hidden_input.type = 'hidden'
						//						//						hidden_input.name = 'postInfo'
						//
						//						form.appendChild(hidden_input);
						//						document.body.appendChild(form);
						//						form.submit();
						//						导出接口
						meter_exportMeter({
							method: 'post',
							url: '/meter/exportMeter',
							responseType: "blob",
							data: params,
							timeout: 30000,
							onDownloadProgress: function(progressEvent) {

								if(progressEvent.total != 0) {
									this.dialogVisible = true

									me.pro = Number((progressEvent.loaded / progressEvent.total) * 100)
									if(me.pro == 100) {
										me.dialogVisible = false
										me.$message({
											showClose: true,
											message: 'Excel导出成功',
											type: 'success',
											duration: 1000,
										})
									}
								}
							}
						}).then(function(res) {
							//							处理文件下载
							let reader = new FileReader()
							let fileName = decodeURIComponent(res.headers['content-disposition'].split(';')[1].substring(9));
							reader.readAsDataURL(res.data);
							reader.onload = e => {
								let a = document.createElement("a");
								a.download = fileName;
								a.href = URL.createObjectURL(res.data);
								document.body.appendChild(a);
								a.click();
								document.body.removeChild(a);
							};
						}).catch(function() {
							console.log('bbbbb')
							me.dialogVisible = false
							me.$message({
								showClose: true,
								message: 'Excel导出失败,请更换筛选条件或检查数据是否为空',
								type: 'warning',
								duration: 1000,
							})
						})
						//						如果是条件搜索
					} else {
						this.doList(1)
					}
				}

			},
			//			重置按钮
			reset() {
				this.searchParams.companyFormat = []
				this.searchParams.company = []
				this.searchParams.manageCode = ''
				this.searchParams.name = ''
				this.searchParams.mvperiod = ''
				this.searchParams.endMvperiod = ''
				this.searchParams.deviceStateId = ''
				this.searchParams.jobsiteId = ''
				this.searchParams.managerId = ''
				this.searchParams.msaExpiryDay = ''
				this.searchParams.endMsaExpiryDay = ''
				this.searchParams.deviceStateIdFormat = []
				this.searchParams.jobsiteIdFormat = []
				this.searchParams.managerIdFormat = []
				this.jiliangtime = null
				this.msatime = null
				this.doList(1)
//				清空文字提示
				this.prompt = ''
				this.show_prompt=false
			},
			//			导出关闭键
			handleClose(done) {
				done()
			},
			//			xiushi_gongsi() {
			//				if(this.a == 2) {
			//					let a = this.getCompany.find((item) => {
			//						return item.i == this.$refs.gongsi_length.value
			//					})
			//				}
			//				this.a += 1
			//			}
		},
		watch:{
			'searchParams.companyFormat':{
				handler(){
					if(this.searchParams.companyFormat.length == 0){
						this.p=''
						this.show_prompt = false
					}
				}
			}
		}
	};
</script>
<style>
	.el-tag--small:first-of-type{
		width: 5vw;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.el-tag--small:last-of-type{
		overflow: hidden;
	}
</style>