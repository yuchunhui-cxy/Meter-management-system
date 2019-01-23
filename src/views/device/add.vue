<template>
	<div class="clearfix">
		<el-form :model="deviceForm" :rules="rules" ref="deviceForm">
			<!--按钮组-->
			<div class="grg_btns pull-right">
				<el-button type="primary" round class="pull-right grg_btn_color_white grg_btn_border_blue grg_btn_bgcolor_blue" @click="globalFun.jump('/device/index')">取消</el-button>
				<el-button round class="pull-right grg_btn_color_green grg_btn_border_green grg_marR" @click="submitForm('deviceForm')" v-show='!type' :loading='loading'>保存</el-button>
			</div>
			<div class="grg_box_half_width pull-left">
				<div class="grg_box grg_box_full_width grg_marT grg_padd pull-left" style="position:relative">
					<div class="small_radian">
						<img :src="imgs.orange_deco" alt="">
					</div>
					<div class="grg_searchT clearfix">
						<h3 class="pull-left">计量器信息</h3>
					</div>
					<el-row :gutter="20">
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form-item label="所属公司" prop='companyFormat'>
								<!--<el-input v-model="deviceForm.companyId" place-holder="" :disabled='type'></el-input>-->
								<!--<el-select v-model='deviceForm.companyFormat' style="width:100%;" :disabled='type' filterable :placeholder='xuanze'>
									<el-option :label="item.name" v-for='item in getCompany' :value="item.i" :key='item.i'></el-option>
								</el-select>-->
								<el-select v-model="deviceForm.companyFormat" style="width:100%;" :disabled='type' filterable :placeholder='xuanze'>
									<el-option-group v-for="group in getCompany" :key="group.proxyCompantTypeName" :label="group.proxyCompanyTypeName">
										<el-option v-for="item in group.proxyCompanyList" :key="item.i" :label="item.name" :value="item.i">
										</el-option>
									</el-option-group>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form-item label="管理编号" prop='manageCode'>
								<el-input v-model="deviceForm.manageCode" :disabled='type' maxlength=18 :placeholder='shuru'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form-item label="量具名称" prop='name'>
								<el-input v-model="deviceForm.name" :disabled='type' :placeholder='shuru'></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form-item label="测量范围" prop="scope">
								<el-input v-model="deviceForm.scope" :disabled='type' :placeholder='shuru'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form-item label="测量精度" prop="accuracy">
								<el-input v-model="deviceForm.accuracy" :disabled='type' :placeholder='shuru'></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form-item label="制造单位" prop="manufacturer">
								<el-input v-model="deviceForm.manufacturer" :disabled='type' :placeholder='shuru'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form-item label="出厂编号" prop="factoryCode">
								<el-input v-model="deviceForm.factoryCode" :disabled='type' :placeholder='shuru'></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form-item label="设备状态" prop="deviceStateId">
								<!--<el-input v-model="deviceForm.deviceStateId" place-holder=""></el-input>-->
								<el-select v-model="deviceForm.deviceStateId" :placeholder="xuanze" style="width:100%;" :disabled='type' @change='deviceState'>
									<el-option v-for='item in device' :value='item.id' :label='item.name'></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form-item label="校准日期" prop="calibrationTime">
								<!--<el-input v-model="deviceForm.calibrationTime" place-holder=""></el-input>-->
								<el-date-picker v-model="deviceForm.calibrationTime" align="right" type="date" placeholder="选择日期" style="width: 100%;" :disabled='type' value-format='yyyy-MM-dd HH:mm:ss'>
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form-item label="计量有效期" prop='mvperiod'>
								<!--<el-input v-model="deviceForm.mvperiod" place-holder=""></el-input>-->
								<el-date-picker v-model="deviceForm.mvperiod" align="right" type="date" placeholder="选择日期" style="width: 100%;" :disabled='type' value-format='yyyy-MM-dd HH:mm:ss'>
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form-item label="检定状态" prop="verificationState">
								<!--<el-input v-model="deviceForm.verificationState" place-holder=""></el-input>-->
								<el-select v-model="deviceForm.verificationState" :placeholder="xuanze" style="width: 100%;" :disabled='type'>
									<el-option key="1" value="1" label="合格"></el-option>
									<el-option key="0" value="0" label="不合格"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form-item label="校准周期（月）" prop='calibrationCycle'>
								<el-input v-model="deviceForm.calibrationCycle" :disabled='type' :placeholder='shuru'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form-item label="使用现场" prop="jobsiteId">
								<!--<el-input v-model="deviceForm.jobsiteId" place-holder="" :disabled='type'></el-input>-->
								<el-select v-model='deviceForm.jobsiteId' style="width:100%;" :disabled='type' filterable :placeholder='xuanze' :clearable=true>
									<el-option :label="i.name" v-for='i in jobsiteId' :value="i.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form-item label="管理人" prop="managerId">
								<!--<el-input v-model="deviceForm.managerId" place-holder="" :disabled='type'></el-input>-->
								<el-select v-model='deviceForm.managerId' style="width:100%;" :disabled='type' filterable :placeholder='xuanze'>
									<el-option :label="i.name" v-for='i in managerId' :value="i.id"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form-item label="计量证书" style="position:relative" prop="prove">
								<el-input v-model="deviceForm.prove" style="width:70%;display:block;" :disabled=true @click.native='check(0)' :placeholder='shangchuan'></el-input>
								<!--<el-upload class="grg_upload" action="#" :on-change="fileChange" :auto-upload='false' :show-file-list=false list-type="picture">-->
								<el-button size="medium" type="warning" class="grg_upload" v-show='!type' @click="choose_file(0)">选择文件</el-button>
								<!--</el-upload>-->
							</el-form-item>
						</el-col>

					</el-row>
				</div>
			</div>
			<div class="grg_box_half_width pull-right">
				<div class="grg_box grg_box_full_width grg_marT grg_padd pull-right" style="position:relative">
					<div class="small_radian">
						<img :src="imgs.orange_deco" alt="">
					</div>
					<div class="grg_searchT clearfix">
						<h3 class="pull-left">MSA管理</h3>
					</div>
					<el-row :gutter="20">
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form-item label="MSA管理" prop='msaYn'>
								<el-select v-model="deviceForm.msaYn" :placeholder="xuanze" style="width:100%;" @change="showYesItem" :disabled='type'>
									<el-option key="Y" value="Y" label="Y"></el-option>
									<el-option key="N" value="N" label="N"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-show="showItem">
							<el-form-item label="MSA有效期" prop='msaExpiryDay'>
								<!--<el-input v-model="deviceForm.msaExpiryDay" place-holder=""></el-input>-->
								<el-date-picker v-model="deviceForm.msaExpiryDay" align="right" type="date" placeholder="选择日期" style="width: 100%;" :disabled='type' value-format='yyyy-MM-dd HH:mm:ss'>
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">

						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-show="showItem">
							<el-form-item label="MSA状态" prop='msaState'>
								<!--<el-input v-model="deviceForm.input" place-holder=""></el-input>-->
								<el-select v-model="deviceForm.msaState" :placeholder="xuanze" style="width:100%;" :disabled='type'>
									<el-option key="Y" value="1" label="合格"></el-option>
									<el-option key="N" value="0" label="不合格"></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-show="showItem">
							<el-form-item label="MSA报告" style="position:relative" prop='msaeReport'>
								<el-input v-model="deviceForm.msaeReport" style="width:70%;display:block;" @click.native='check(1)' :disabled=true :placeholder='shangchuan'></el-input>
								<!--<el-upload class="grg_upload" action="#">-->
								<el-button size="medium" type="warning" @click="choose_file(1)" class='grg_upload' v-show='!type'>选择文件</el-button>
								<!--</el-upload>-->
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="20">

						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-show="showItem">
							<el-form-item label="测量报告" style="position:relative" prop='msaMeter'>
								<el-input v-model="deviceForm.msaMeter" style="width:70%;display:block;" @click.native='check(2)' :disabled=true :placeholder='shangchuan'></el-input>
								<!--<el-upload class="grg_upload" action="#">-->
								<el-button size="medium" type="warning" class="grg_upload" @click="choose_file(2)" v-show='!type'>选择文件</el-button>
								<!--</el-upload>-->
							</el-form-item>
						</el-col>
					</el-row>
				</div>
				<div class="grg_box grg_box_full_width grg_marT grg_padd pull-right" style="position:relative">
					<div class="small_radian">
						<img :src="imgs.orange_deco" alt="">
					</div>
					<div class="grg_searchT clearfix">
						<h3 class="pull-left">其他信息</h3>
					</div>
					<el-row :gutter="20">
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<el-form-item label="备注">
								<el-input v-model="deviceForm.remark" :disabled='type'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
			</div>
		</el-form>
		<!--点击选择文件计量证书对话框-->
		<el-dialog title="" :visible.sync="dialogVisible0" width="685px" :before-close="handleClose0" :modal-append-to-body=false :close-on-click-modal=false>
			<span class="title">上传计量证书</span>
			<span>
				<div v-for='i in file0_linshi' class="list">
					<div class="image">
						<img :src="imgs.delupload" alt="" width="20px" @click='delupload(i.name,0)' class="del_img">

						<img :src="i.url" alt="" width="100%" v-show="i.raw.type=='image/png'" class='picture' @click="preview('png',i.url)">
						<img :src="i.url" alt="" width="100%" v-show="i.raw.type=='image/jpeg'" class='picture' @click="preview('jpg',i.url)">
						<svg-icon icon-class="pdf" style='width: 60px; height: 80px; position: relative; left: 50px; top: 25px;' v-show="i.raw.type=='application/pdf'" class='picture' @click="preview('pdf',i.url)"></svg-icon>
					</div>
					<div class="name" :title="i.name">
						{{i.name}}
					</div>
				</div>
				<!--<el-upload action="#" v-show='file0_linshi.length==0' list-type="picture" :on-change='fileChange' :auto-upload=false :show-file-list=false style='position: relative; left: 80px;'>
					<img :src="imgs.upload" alt="" width='148px' height='148px'>
				</el-upload>-->
				<el-upload action="#" list-type="picture-card" :on-change='fileChange' :auto-upload=false :show-file-list=false v-show='file0_linshi.length!=5'>
					<i class="el-icon-plus"></i>
				</el-upload>
				<!--清除浮动影响-->
				<div class="clear"></div>
			</span>
			<span slot="footer" class="dialog-footer">
				<h5>1.上传格式JPG,PNG,PDF</h5><br/>
				<h5>2.点击图片进行预览</h5><br/><br/>
	    		<el-button @click="save_upload(0)" style='color: #619618; border: 2px solid #619618; border-radius: 26px; width: 100px; height: 40px;'>保存</el-button>
	    		<el-button @click="canel0" style='color: #1A7DA4; border: 2px solid #1A7DA4; border-radius: 26px; width: 100px; height: 40px;'>取 消</el-button>
  			</span>
		</el-dialog>
		<!--点击选择文件MSA报告对话框-->
		<el-dialog title="" :visible.sync="dialogVisible" width="685px" :before-close="handleClose" :modal-append-to-body=false :close-on-click-modal=false>
			<span class="title">上传MSA报告</span>
			<span>
				<div v-for='i in file1_linshi' class="list">
					<div class="image">
						<img :src="imgs.delupload" alt="" width="20px" @click='delupload(i.name,1)' class="del_img">

						<img :src="i.url" alt="" width="100%" v-show="i.raw.type=='image/png'" class='picture' @click="preview('png',i.url)">
						
						<img :src="i.url" alt="" width="100%" v-show="i.raw.type=='image/jpeg'" class='picture' @click="preview('jpg',i.url)">
						<svg-icon icon-class="pdf" style='width: 60px; height: 80px; position: relative; left: 50px; top: 25px' v-show="i.raw.type=='application/pdf'" class='picture' @click="preview('pdf',i.url)"></svg-icon>
					
					</div>
					<div class="name" :title="i.name">
						{{i.name}}
					</div>
				</div>
				<!--<el-upload action="#" v-show='file1_linshi.length==0' list-type="picture" :on-change='fileChange1' :auto-upload=false :show-file-list=false style='position: relative; left: 80px;'>
					<img :src="imgs.upload" alt="" width='148px' height='148px'>
				</el-upload>-->
				<el-upload action="#" list-type="picture-card" :on-change='fileChange1' :auto-upload=false :show-file-list=false v-show='file1_linshi.length!=5'>
					<i class="el-icon-plus"></i>
				</el-upload>
				
				<div class="clear"></div>
			</span>
			<span slot="footer" class="dialog-footer">
				<h5>1.上传格式JPG,PNG,PDF</h5><br/>
				<h5>2.点击图片进行预览</h5><br/><br/>
	    		<el-button @click="save_upload(1)" style='color: #619618; border: 2px solid #619618; border-radius: 26px; width: 100px; height: 40px;'>保存</el-button>
	    		<el-button @click="canel" style='color: #1A7DA4; border: 2px solid #1A7DA4; border-radius: 26px; width: 100px; height: 40px;'>取 消</el-button>
  			</span>
		</el-dialog>
		<!--<el-dialog title="上传MSA报告" :visible.sync="dialogVisible" width="670px" :before-close="handleClose" :modal-append-to-body=false :close-on-click-modal=false>
			<span>
				<div v-for='i in file1_linshi' class="list">
					<img :src="imgs.delupload" alt="" width="20px" @click='delupload(i.name,1)' class="del_img">
					<svg-icon icon-class="pdf" style='width: 120px; height: 109px;' v-show="i.raw.type=='application/pdf'" class='picture' @click="preview('pdf',i.url)"></svg-icon>
					<img :src="i.url" alt="" width="120px" height="109px" v-show="i.raw.type=='image/png'" class='picture' @click="preview('png',i.url)">
					<img :src="i.url" alt="" width="120px" height="109px" v-show="i.raw.type=='image/jpeg'" class='picture' @click="preview('jpg',i.url)">
					<p>{{i.name | name}}</p>
				</div>
				<el-upload action="#" list-type="picture-card" :on-change='fileChange1' :auto-upload=false :show-file-list=false>
					<i class="el-icon-plus"></i>
				</el-upload>
			</span>
			<span slot="footer" class="dialog-footer">
				<h5 style='color: #999999;'>1.上传格式JPG,PNG,PDF</h5><br />
				<h5 style='color: #999999;'>2.点击图片进行预览</h5><br/><br/>
				<el-button @click="save_upload(1)" style='color: #619618; border: 2px solid #619618; border-radius: 26px; width: 100px; height: 40px;'>保存</el-button>
	    		<el-button @click="canel" style='color: #1A7DA4; border: 2px solid #1A7DA4; border-radius: 26px; width: 100px; height: 40px;'>取 消</el-button>
  			</span>
		</el-dialog>-->
		<!--点击选择文件框测量报告对话框-->
		<el-dialog title="" :visible.sync="dialogVisible1" width="685px" :before-close="handleClose1" :modal-append-to-body=false :close-on-click-modal=false>
			<span class="title">上传测量报告</span>
			<span>
				<div v-for='i in file2_linshi' class="list" >
					<div class="image">
						<img :src="imgs.delupload" alt="" width="20px" @click='delupload(i.name,2)' class="del_img">

						<img :src="i.url" alt="" width="100%"  v-show="i.raw.type=='image/png'" class='picture' @click="preview('png',i.url)">
						<img :src="i.url" alt="" width="100%"  v-show="i.raw.type=='image/jpeg'" class='picture' @click="preview('jpg',i.url)">
						<svg-icon icon-class="pdf" style='width: 60px; height: 80px; position: relative; left: 50px; top: 25px;' v-show="i.raw.type=='application/pdf'" class='picture' @click="preview('pdf',i.url)"></svg-icon>
						<svg-icon icon-class="excel" style='width: 60px; height: 80px; position: relative; left: 50px; top: 25px;' v-show="i.raw.type=='application/vnd.ms-excel'" class='picture' @click="preview('xls',i.url)"></svg-icon>
						<svg-icon icon-class="excel" style='width: 60px; height: 80px; position: relative; left: 50px; top: 25px;' v-show="i.raw.type=='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'" class='picture' @click="preview('xlsx',i.url)"></svg-icon>
					</div>
					<div class="name" :title="i.name">
						{{i.name}}
					</div>
				</div>
				<el-upload action="#" list-type="picture-card" :on-change='fileChange2' :auto-upload=false :show-file-list=false>
					<i class="el-icon-plus"></i>
				</el-upload>
			</span>
			<span slot="footer" class="dialog-footer">
				<h5>1.上传格式JPG,PNG,PDF,EXCEL</h5><br/>
				<h5>2.点击图片进行预览</h5><br/><br/>
				<el-button @click="save_upload(2)" style='color: #619618; border: 2px solid #619618; border-radius: 26px; width: 100px; height: 40px;'>保存</el-button>
	    		<el-button @click="canel1" style='color: #1A7DA4; border: 2px solid #1A7DA4; border-radius: 26px; width: 100px; height: 40px;'>取 消</el-button>
  			</span>
		</el-dialog>
		<!--图片预览对话框-->
		<el-dialog title="" :visible.sync="dialogVisible2" width="47%" :before-close="handleClose2" :modal-append-to-body=false :close-on-click-modal=false>
			<img :src="tupian" alt="" style="width: 100%;">
		</el-dialog>
		<!--点击输入框对话框-->
		<el-dialog title='' :visible.sync="dialogVisible3" width="685px" :before-close="handleClose3" :modal-append-to-body=false :close-on-click-modal=false>
			<span class="check_title">{{check_baogao}}</span>
			<div>
				<div class="list" v-show='check0' v-for='i in fileList0'>
					<div class="image">

						<img :src="i.url" alt="" width="100%" v-show="i.raw.type=='image/png'" class='picture' @click="preview('png',i.url)">
						<img :src="i.url" alt="" width="100%" v-show="i.raw.type=='image/jpeg'" class='picture' @click='preview("jpg",i.url)'>
						<svg-icon icon-class="pdf" style='width: 60px; height: 80px; position: relative; left: 50px; top: 25px;' v-show="i.raw.type=='application/pdf'" @click.native="preview('pdf',i.url)"></svg-icon>

					</div>
					<div class="name" :title="i.name">
						{{i.name}}
					</div>
				</div>
				<div v-for='i in fileList1' class="list" v-show='check1'>
					<div class="image">

						<img :src="i.url" alt="" width="100%" v-show="i.raw.type=='image/png'" class='picture' @click="preview('png',i.url)">
						<img :src="i.url" alt="" width="100%" v-show="i.raw.type=='image/jpeg'" class='picture' @click="preview('jpg',i.url)">
						<svg-icon icon-class="pdf" style='width: 60px; height: 80px; position: relative; left: 50px; top: 25px;' v-show="i.raw.type=='application/pdf'" class='picture' @click.native="preview('pdf',i.url)"></svg-icon>

					</div>
					<div class="name" :title="i.name">
						{{i.name}}
					</div>
				</div>
				<div v-for='i in fileList2' class="list" v-show='check2'>
					<div class="image">

						<img :src="i.url" alt="" width="100%" v-show="i.raw.type=='image/png'" class='picture' @click="preview('png',i.url)">
						<img :src="i.url" alt="" width="100%" v-show="i.raw.type=='image/jpeg'" class='picture' @click="preview('jpg',i.url)">
						<svg-icon icon-class="pdf" style='width: 60px; height: 80px; position: relative; left: 50px; top: 25px;' v-show="i.raw.type=='application/pdf'" class='picture' @click.native="preview('pdf',i.url)"></svg-icon>
						<svg-icon icon-class="excel" style='width: 60px; height: 80px; position: relative; left: 50px; top: 25px;' v-show="i.raw.type=='application/vnd.ms-excel'" class='picture' @click.native="preview('xls',i.url)"></svg-icon>
						<svg-icon icon-class="excel" style='width: 60px; height: 80px; position: relative; left: 50px; top: 25px;' v-show="i.raw.type=='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'" class='picture' @click.native="preview('xlsx',i.url)"></svg-icon>

					</div>
					<div class="name" :title="i.name">
						{{i.name}}
					</div>
				</div>
				<div class='clear'></div>
			</div>
			<span slot="footer" class="dialog-footer">
				<h5>{{check_mark}}</h5><br />
				<el-button @click=all_download v-show='all_down' style='color: #1A7DA4; border: 2px solid #1A7DA4; border-radius: 26px; width: 100px; height: 40px; position: relative; right: 280px;'>全部下载</el-button>
			</span>
		</el-dialog>
		<!--Y变N有数据提示对话框-->
		<el-dialog title="警告" :visible.sync="dialogVisible5" width="30%" :before-close="handleClose5" :modal-append-to-body=false :close-on-click-modal=false>
			<span>MSA已存在数据,是否清空?</span>
			<span slot="footer" class="dialog-footer">
    			<el-button @click="canel5">取 消</el-button>
    			<el-button type="primary" @click="Y_N">确 定</el-button>
  			</span>
		</el-dialog>

	</div>
</template>
<script>
	import orange_deco from "../../assets/images/orange_deco.png"
	import delupload from "../../assets/images/delupload.png"
	import upload from "../../assets/images/upload.png"
	import {
		add,
		meter_getGaugeBaseInfo,
		search_company,
		check_files,
		meter_updateGaugeBaseInfo,
		downFileByType,
		search_getJobsite,
		add_getManager,
		search_getCodeCount,
		search_getDevice
	} from '@/api/add'
	export default {
		data: function() {
			//重写的校准周期规则必须是数字
			var checkNum = (rule, value, callback) => {
				if(value) {
					if(/^\s*$/.test(value)) {
						callback(new Error("不能只输入空格"));
					}
					if(value <= 0 || value > 36) {
						callback(new Error("校准周期范围是1-36"));
					}
					if(/^-?[0-9]\d*$/.test(value)) {
						callback();
					} else {
						callback(new Error("校准周期必须为整数"));
					}
				} else {
					if(this.deviceForm.deviceStateId == 4) {
						this.rules.calibrationCycle[0].required = false
						callback()
					} else {
						callback(new Error('请输入校准周期(月)'));
						this.rules.calibrationCycle[0].required = true
					}
				}
			}
			//重写的管理编号规则不能重复
			var check_repeat = (rule, value, callback) => {
				if(value) {
					if(/^\s*$/.test(value)) {
						callback(new Error("不能只输入空格"));
					}
					if(this.repeat == 1) {
						callback('管理编号重复');
					} else {
						callback();
					}
				} else {
					callback(new Error('请输入管理编号'));
				}
			}
			var _name = (rule, value, callback) => {
				if(value) {
					if(/^\s*$/.test(value)) {
						callback(new Error("不能只输入空格"));
					} else {
						callback()
					}
				} else {
					callback(new Error('请输入量具名称'));
				}
			}
			var _scope = (rule, value, callback) => {
				if(value) {
					if(/^\s*$/.test(value)) {
						callback(new Error("不能只输入空格"));
					} else {
						callback()

					}
				} else {
					callback(new Error('请输入测量范围'));
				}
			}
			var _accuracy = (rule, value, callback) => {
				if(value) {
					if(/^\s*$/.test(value)) {
						callback(new Error("不能只输入空格"));
					} else {
						callback()

					}
				} else {
					callback(new Error('请输入测量精度'));
				}
			}
			var _manufacturer = (rule, value, callback) => {
				if(value) {
					if(/^\s*$/.test(value)) {
						callback(new Error("不能只输入空格"));
					} else {
						callback()

					}
				} else {
					callback(new Error('请输入制造单位'));
				}
			}
			//			var _factoryCode = (rule, value, callback) => {
			//				
			//				if(/^\s*$/.test(value)){
			//					callback(new Error("不能只输入空格"));
			//				}else{
			//					callback();
			//					
			//				}
			//				
			//			}

			return {
				imgs: {
					orange_deco: orange_deco,
					//图片上面的删除按钮
					delupload: delupload,
					//上传的加号
					upload: upload,
				},
				//所属公司下拉列表存储
				getCompany: [],
				//使用现场下拉列表存储
				jobsiteId: [],
				//管理人下拉列表存储
				managerId: [],
//				设备状态下拉存储列表
				device:[],
				//查看时所有输入框disable变成true,所有按钮v-show变成!type
				type: false,
				//上传文件存储
				fileList0: [],
				fileList1: [],
				fileList2: [],
				//临时存储
				file0_linshi: [],
				file1_linshi: [],
				file2_linshi: [],
				//查看和修改文件的存储
				fileList00: [],
				fileList11: [],
				fileList22: [],
				//修改时的删除存储
				fileDel: [],
				//控制是否显示全部下载
				all_down: false,
				//控制上传和修改时的计量证书对话框
				dialogVisible0: false,
				//控制上传和修改时的msa报告对话框
				dialogVisible: false,
				//控制上传和修改时的测量报告对话框
				dialogVisible1: false,
				//控制图片预览对话框
				dialogVisible2: false,
				//控制输入框的对话框
				dialogVisible3: false,
				//msa由Y变N的对话框
				dialogVisible5: false,
				//控制上传的输入框点击查看对话框显示计量证书
				check0: false,
				//控制上传的输入框点击查看对话框显示msa报告
				check1: false,
				//控制上传的输入框点击查看对话框显示测量报告
				check2: false,
				//图片预览存储的url
				tupian: '',
				//控制上传,查看和修改时输入框的标题
				check_baogao: '',
				//控制上传,查看和修改时输入框的下面的提示语
				check_mark: "",
				//除了测量报告是全部下载那俩个为下载
				check_xiazai: "",
				//管理编号是否重复
				repeat: 0,
				//placeholder
				xuanze: "请选择",
				shuru: '请输入',
				shangchuan: '未上传文件',
				//控制上传和修改时保存按钮只允许点一次
				loading: false,

				input: "",
				showItem: false,

				//上传和修改时提交的接口数据
				deviceForm: {
					//修改时要传上传时不需要
					id: this.$route.query.id,
					//存储所属公司的i值(id和type)
					companyFormat: "",
					//左
					companyId: '',
					companyType: '',
					manageCode: '',
					name: '',
					scope: '',
					accuracy: '',
					manufacturer: '',
					factoryCode: '',
					calibrationCycle: '',
					calibrationTime: '',
					mvperiod: '',
					verificationState: '',
					deviceStateId: '',
					jobsiteId: "",
					managerId: "",
					prove: "",
					//右
					msaYn: '',
					msaExpiryDay: '',
					msaState: '',
					msaeReport: '',
					msaMeter: '',
					remark: '',
				},
				//表单验证规则
				rules: {
					companyFormat: [{
						required: true,
						message: '请选择所属公司',
						trigger: 'blur'
					}],
					//					重写管理编号验证规则
					manageCode: [{
						validator: check_repeat,
						required: true,
						trigger: 'blur'
					}],
					name: [{
						validator: _name,
						required: true,
						//						message: '请输入量具名称',
						trigger: 'blur'
					}],
					scope: [{
						validator: _scope,
						required: true,
						//						message: '请输入测量范围',
						trigger: 'blur'
					}],
					accuracy: [{
						validator: _accuracy,
						required: true,
						//						message: '请输入测量精度',
						trigger: 'blur'
					}],
					manufacturer: [{
						validator: _manufacturer,
						required: true,
						//						message: '请输入制造单位',
						trigger: 'blur'
					}],
					factoryCode: [{
						//						validator:_factoryCode,
						required: false,
						//						message: '请输入出厂编号',
						trigger: 'blur'
					}],
					//重写校准周期验证规则
					calibrationCycle: [{
						validator: checkNum,
						required: true,
						trigger: 'blur'
					}],
					calibrationTime: [{
						required: true,
						message: '请选择校准日期',
						trigger: 'blur'
					}],
					mvperiod: [{
						required: true,
						message: '请选择计量有效期',
						trigger: 'blur'
					}],
					verificationState: [{
						required: true,
						message: '请选择检定状态',
						trigger: 'blur'
					}],
					deviceStateId: [{
						required: true,
						message: '请选择设备状态',
						trigger: 'blur'
					}],
					jobsiteId: [{
						required: false,
						message: '请选择使用现场',
						trigger: 'blur'
					}],
					managerId: [{
						required: true,
						message: '请选择管理人',
						trigger: 'blur'
					}],
					prove: [{
						required: true,
						message: '请选择计量证书',
						trigger: 'blur'
					}],

					msaYn: [{
						required: true,
						message: '请选择是否MSA管理',
						trigger: 'blur'
					}],
					msaExpiryDay: [{
						required: false,
						message: '请选择MSA有效期',
						trigger: 'blur'
					}],
					msaState: [{
						required: false,
						message: '请选择MSA状态',
						trigger: 'blur'
					}],
					msaeReport: [{
						required: false,
						message: '请选择MSA报告',
						trigger: 'blur'
					}],
					msaMeter: [{
						required: false,
						message: '请选择测量报告',
						trigger: 'blur'
					}]
				},
				//时间日期
//				pickerOptions1: {
//					shortcuts: [{
//						text: '今天',
//						onClick(picker) {
//							picker.$emit('pick', new Date());
//						}
//					}, {
//						text: '昨天',
//						onClick(picker) {
//							const date = new Date();
//							date.setTime(date.getTime() - 3600 * 1000 * 24);
//							picker.$emit('pick', date);
//						}
//					}, {
//						text: '一周前',
//						onClick(picker) {
//							const date = new Date();
//							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
//							picker.$emit('pick', date);
//						}
//					}]
//				}
			};
		},

		//声明函数钩子
		mounted: function() {
			//执行所属公司接口
			this.do_search_company()
			//判断是查看还是修改传type==view是查看set是修改
			this.judge(this.$route.query.type, this.$route.query.id)
			//使用现场和管理人和设备状态接口
			this.job_man()
		},
		methods: {
			//通过MSA管理的Y,N判断下面字段的是否显示和校验
			showYesItem: function(val) {
				if("Y" == val) {
					this.showItem = true;
					this.rules.msaExpiryDay[0].required = true
					this.rules.msaState[0].required = true
					this.rules.msaeReport[0].required = true
					this.rules.msaMeter[0].required = true
				} else {
					this.showItem = false;
					//如果一开始选择Y输入了以下的内容,又变回来N要判断清空以下输入
					if(this.deviceForm.msaExpiryDay != '' || this.deviceForm.msaState != '' || this.deviceForm.msaeReport != '' || this.deviceForm.msaMeter != '') {
						this.dialogVisible5 = true
					}
					this.rules.msaExpiryDay[0].required = false
					this.rules.msaState[0].required = false
					this.rules.msaeReport[0].required = false
					this.rules.msaMeter[0].required = false
				}
			},
			//MSA由Y变N的对话框
			Y_N() {
				this.dialogVisible5 = false
				this.deviceForm.msaExpiryDay = ''
				this.deviceForm.msaState = ''
				this.deviceForm.msaeReport = ''
				this.deviceForm.msaMeter = ''
				let file2 = this.file2_linshi.filter(item => 'id' in item)
				for(var i = 0; i < file2.length; i++) {
					this.fileDel.push(file2[i].id)
				}
				let file1 = this.file1_linshi.filter(item => 'id' in item)
				for(var i = 0; i < file1.length; i++) {
					this.fileDel.push(file1[i].id)
				}
				let formData = new FormData()
				let a = this.fileDel.join(',')
				this.deviceForm.companyType = this.deviceForm.companyFormat.split("-")[0]
				this.deviceForm.companyId = this.deviceForm.companyFormat.split("-")[1]
				formData.append("postData", JSON.stringify(this.deviceForm))
				formData.append("fileDel", a)
				meter_updateGaugeBaseInfo(formData).then(function(res) {
					console.log(res.data)
				}).catch(function(err) {
					console.log(err)
				})
				this.file1_linshi = []
				this.fileList1 = []
				this.file2_linshi = []
				this.fileList12 = []

			},
			//添加成功或者失败
			submitForm: function(formName) {
				this.$refs[formName].validate(valid => {
					if(valid) {
						this.loading = true
						this.deviceForm.companyType = this.deviceForm.companyFormat.split("-")[0]
						this.deviceForm.companyId = this.deviceForm.companyFormat.split("-")[1]
						let me = this
						let formData = new FormData()
						//						this.deviceForm.managerId = (this.deviceForm.managerId).toString()
						////						如果添加了校准周期,后面加个月字
						//						if(this.deviceForm.calibrationCycle){
						//							this.deviceForm.calibrationCycle += '个月'
						//						}
						formData.append("postData", JSON.stringify(me.deviceForm))
						//如果添加了计量证书
						if(me.fileList0.length != 0) {
							//							if('size' in me.fileList0[0]) {
							//								formData.append("prove", me.fileList0[0].raw)
							//							}
							for(var i = 0; i < me.fileList0.length; i++) {
								if('size' in me.fileList0[i]) {
									formData.append("prove", me.fileList0[i].raw)
								}
							}
						}
						//如果msa管理为Y
						if(me.showItem) {
							if(me.fileList1.length != 0) {
								for(var i = 0; i < me.fileList1.length; i++) {
									if('size' in me.fileList1[i]) {
										formData.append("msaeReport", me.fileList1[i].raw)
									}
								}
							}
							if(me.fileList2.length != 0) {
								for(var i = 0; i < me.fileList2.length; i++) {
									if('size' in me.fileList2[i]) {
										formData.append("msaMeter", me.fileList2[i].raw)
									}
								}
							}
						}
						//如果是修改的点击保存的话
						if(this.$route.query.type === 'set') {
							//							修改接口
							if(me.fileDel.length != 0) {
								let a = me.fileDel.join(',')
								formData.append("fileDel", a)
							}
							meter_updateGaugeBaseInfo(formData).then(function(res) {
								if('200' == res.code) {
									me.$message({
										showClose: true,
										message: '修改成功',
										type: 'success',
										duration: 1000,
										onClose: function() {
											me.$router.push('/device/index')
										}
									})
								} else {
									me.$message({
										showClose: true,
										message: '修改失败',
										type: 'warning',
										duration: 1000,
									})
								}
							})
							//如果是上传点击了保存
						} else {
							//上传接口
							add(formData).then(function(res) {
								if('200' == res.code) {
									me.$message({
										showClose: true,
										message: '添加成功',
										type: 'success',
										duration: 1000,
										onClose: function() {
											me.$router.push('/device/index')
										}
									})
								} else {
									me.$message({
										showClose: true,
										message: '添加失败',
										type: 'warning',
										duration: 1000,
									})
								}
							})
						}
						//点击保存按钮失败
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},

			//计量证书上传时的判断
			fileChange: function(file, fileList) {
				//				因为是只能上传一个所以每次更换要清空重新赋值
				let isPDF = file.raw.type === "application/pdf"
				let isJPG = file.raw.type === "image/jpeg"
				let isPNG = file.raw.type === "image/png"
				let isLt10M = file.raw.size / 1024 / 1024 < 10;
				if(!isJPG && !isPDF && !isPNG) {
					this.$message({
						showClose: true,
						message: "只能上传JPG,PNG,PDF文件",
						type: "warning",
						duration: 1000
					});
					this.deviceForm.prove = "";
					return;
				}
				if(!isLt10M) {
					this.$message({
						showClose: true,
						message: "上传文件大小不能超过 10MB!",
						type: "warning",
						duration: 1000
					});
					this.deviceForm.prove = "";
					return;
				}
				if(this.file0_linshi.find(item => file.name == item.name)) {
					this.$message({
						showClose: true,
						message: '所选文件已经在上传列表',
						type: 'warning',
						duration: 2000
					})
					return
				}
				for(var i = 0; i < this.file0_linshi.length; i++) {
					if(file.name == this.file0_linshi[i].name) {
						this.$message({
							showClose: true,
							message: '所选文件已经在上传列表',
							type: 'warning',
							duration: 2000
						})
						return
					}
				}
				this.file0_linshi.push(file);
				console.log('临时', this.file0_linshi.length)
				console.log('上传', this.fileList0.length)

			},
			//msa报告上传时的判断
			fileChange1: function(file, fileList) {
				let isPDF = file.raw.type === "application/pdf"
				let isJPG = file.raw.type === "image/jpeg"
				let isPNG = file.raw.type === "image/png"
				let isLt10M = file.raw.size / 1024 / 1024 < 10;
				if(!isJPG && !isPDF && !isPNG) {
					this.$message({
						showClose: true,
						message: "只能上传JPG,PNG,PDF文件",
						type: "warning",
						duration: 1000
					});
					return;
				}
				if(!isLt10M) {
					this.$message({
						showClose: true,
						message: "上传文件大小不能超过 10MB!",
						type: "warning",
						duration: 1000
					});
					return;
				}
				for(var i = 0; i < this.file1_linshi.length; i++) {
					if(file.name == this.file1_linshi[i].name) {
						this.$message({
							showClose: true,
							message: '所选文件已经在上传列表',
							type: 'warning',
							duration: 2000
						})
						return
					}
				}
				this.file1_linshi.push(file);
			},
			//测量报告上传时的判断
			fileChange2: function(file, fileList) {
				let isPDF = file.raw.type === "application/pdf"
				let isJPG = file.raw.type === "image/jpeg"
				let isXLS = file.raw.type === 'application/vnd.ms-excel'
				let isXLSX = file.raw.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				let isPNG = file.raw.type === "image/png"
				let isLt10M = file.raw.size / 1024 / 1024 < 10;
				if(!isJPG && !isPDF && !isPNG && !isXLSX && !isXLS) {
					this.$message({
						showClose: true,
						message: "只能上传JPG,PNG,PDF,EXCEL文件",
						type: "warning",
						duration: 1000
					});
					return;
				}
				if(file.name.substr(-3, 3) == 'csv') {
					this.$message({
						showClose: true,
						message: "只能上传JPG,PNG,PDF,EXCEL文件",
						type: "warning",
						duration: 1000
					});
					return;
				}
				if(!isLt10M) {
					this.$message({
						showClose: true,
						message: "上传文件大小不能超过 10MB!",
						type: "warning",
						duration: 1000
					});
					return;
				}
				for(var i = 0; i < this.file2_linshi.length; i++) {
					if(file.name == this.file2_linshi[i].name) {
						this.$message({
							showClose: true,
							message: '所选文件已经在上传列表',
							type: 'warning',
							duration: 2000
						})
						return
					}
				}
				this.file2_linshi.push(file);
			},
			//上传和修改计量证书对话框的关闭键
			handleClose0(done) {
				done();
				this.canel0()
			},
			//上传和修改msa报告对框的关闭键
			handleClose(done) {
				done()
				this.canel()
			},
			//上传和修改的测量报告对话框的关闭键
			handleClose1(done) {
				done();
				this.canel1()
			},
			//预览对话框的关闭键
			handleClose2(done) {
				done()
			},
			//输入框对话框关闭键
			handleClose3(done) {
				done()
			},
			//Y变N有内容提示对话框
			handleClose5(done) {
				done()
				this.deviceForm.msaYn = 'Y'
				this.showYesItem('Y')
			},
			//上传计量证书的取消按钮
			canel0() {
				this.dialogVisible0 = false
				this.file0_linshi = []
				this.file0_linshi.push(...this.fileList0)

				if(this.file0_linshi.length != 0) {
					this.deviceForm.prove = '已上传' + this.fileList0.length + '个文件,点击查看'
				}
				this.fileDel = []
				console.log('临时', this.file0_linshi.length)
				console.log('上传', this.fileList0.length)
			},
			//上传msa报告的取消按钮
			canel() {
				this.dialogVisible = false
				this.file1_linshi = []
				this.file1_linshi.push(...this.fileList1)
				if(this.file1_linshi.length != 0) {
					this.deviceForm.msaeReport = '已上传' + this.fileList1.length + '个文件,点击查看'
				}
				this.fileDel = []
			},
			//上传测量报告的取消按钮
			canel1() {
				this.dialogVisible1 = false
				this.file2_linshi = []
				this.file2_linshi.push(...this.fileList2)
				if(this.file2_linshi.length != 0) {
					this.deviceForm.msaMeter = '已上传' + this.fileList2.length + '个文件,点击查看'
				}
				this.fileDel = []
			},
			//			Y变N提示对话框的取消键
			canel5() {
				this.dialogVisible5 = false
				this.deviceForm.msaYn = 'Y'
				this.showYesItem('Y')
			},
			//点哪个选择文件
			choose_file(x) {
				if(x == 1) {
					this.dialogVisible = true
				} else if(x == 2) {
					this.dialogVisible1 = true
				} else {
					this.dialogVisible0 = true
				}
			},
			//上传文件上面的删除键name是删除的名字list哪个报告或证书
			delupload(name, list) {
				//				如果是msa报告
				if(list == 1) {
					for(var i = 0; i < this.file1_linshi.length; i++) {
						if(name == this.file1_linshi[i].name) {
							if(this.$route.query.type === 'set') {
								if('id' in this.file1_linshi[i]) {
									this.fileDel.push(this.file1_linshi[i].id)
								}
							}
							this.file1_linshi.splice(i, 1)
							//							一次只删除一个就返回,防止重名
							return
						}
					}
					//如果是测量报告
				} else if(list == 2) {
					for(var i = 0; i < this.file2_linshi.length; i++) {
						if(name === this.file2_linshi[i].name) {
							if(this.$route.query.type === 'set') {
								if('id' in this.file2_linshi[i]) {
									this.fileDel.push(this.file2_linshi[i].id)
								}
							}
							this.file2_linshi.splice(i, 1)
							return
						}
					}
				} else {
					for(var i = 0; i < this.file0_linshi.length; i++) {
						if(name === this.file0_linshi[i].name) {
							if(this.$route.query.type === 'set') {
								if('id' in this.file0_linshi[i]) {
									this.fileDel.push(this.file0_linshi[i].id)
								}
							}
							this.file0_linshi.splice(i, 1)
							return
						}
					}
				}
			},
			//上传时对话框的保存按钮
			save_upload(x) {
				if(x == 1) {
					this.dialogVisible = false
					this.fileList1 = []
					this.fileList1.push(...this.file1_linshi)
					if(this.fileList1.length == 0) {
						this.deviceForm.msaeReport = ''
						return
					}
					this.deviceForm.msaeReport = '已上传' + this.fileList1.length + '个文件,点击查看'
				} else if(x == 2) {
					this.dialogVisible1 = false
					this.fileList2 = []
					this.fileList2.push(...this.file2_linshi)
					if(this.fileList2.length == 0) {
						this.deviceForm.msaMeter = ''
						//						不让下面的赋值执行
						return
					}
					this.deviceForm.msaMeter = '已上传' + this.fileList2.length + '个文件,点击查看'
				} else {
					this.dialogVisible0 = false
					this.fileList0 = []
					this.fileList0.push(...this.file0_linshi)
					if(this.fileList0.length == 0) {
						this.deviceForm.prove = ''
						//						不让下面的赋值执行
						return
					}
					this.deviceForm.prove = '已上传' + this.fileList0.length + '个文件,点击查看'
				}
			},
			//点击预览放大图片对话框
			preview(name, url) {
				if(!this.$route.query.type) {
					if(name == 'xlx' || name == 'xlsx') {
						return
					}
				}
				//如果是图片预览图片
				if(name == 'jpg' || name == 'png') {
					this.dialogVisible2 = true
					this.tupian = url
					//pdf或者excel下载
				} else {
					open(url)
				}
			},
			//控制输入框对话框的显示内容
			check(list) {
				if(list == 1) {
					if(this.deviceForm.msaeReport == '') {
						return
					}
					this.check_baogao = '查看MSA报告'
					this.check1 = true
					this.check2 = false
					this.check0 = false
					this.check_mark = '点击图片预览'
					this.check_xiazai = '下载'
					this.dialogVisible3 = true
				} else if(list == 2) {
					if(this.deviceForm.msaMeter == '') {
						return
					}
					this.check_baogao = '查看测量报告'
					this.check2 = true
					this.check1 = false
					this.check0 = false
					this.check_mark = '点击图片预览,点击excel进行下载'
					this.check_xiazai = '全部下载'
					this.dialogVisible3 = true
				} else {
					if(this.deviceForm.prove == '') {
						return
					}
					this.check_baogao = '查看计量证书'
					this.check2 = false
					this.check1 = false
					this.check0 = true
					this.check_mark = '点击图片预览'
					this.check_xiazai = '下载'
					this.dialogVisible3 = true
				}
			},
			//查看和修改的全部下载按钮
			all_download() {
				let me = this
				let a
				if(this.check1 == true) {
					a = 2
				} else if(this.check2 == true) {
					a = 3
				} else {
					a = 1
				}
				let file = {
					'id': this.$route.query.id,
					"fileType": a
				}
				downFileByType({
					method: 'post',
					url: '/meter/downFileByType',
					responseType: "blob",
					data: file,
					timeout: 30000,
					onDownloadProgress: function(progressEvent) {
						//        						console.log(progressEvent);
						me.pro = Number((progressEvent.loaded / progressEvent.total) * 100)
						if(me.pro == 100) {
							//									me.dialogVisible = false
							me.$message({
								showClose: true,
								message: '下载成功',
								type: 'success',
								duration: 1000,
							})
						}
					}
				}).then(function(res) {
					if(true) {
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
					}
				})
			},
			//判断是查修改还是添加
			judge(type, id) {
				var me = this
				var data = {
					"id": id
				}
				//查看
				if(type === 'view') {
					this.xuanze = ''
					this.shuru = ''
					this.all_down = true
					this.type = true
					//查看接口
					meter_getGaugeBaseInfo(data).then(function(res) {
						if(res.code === '200') {
							me.deviceForm.companyFormat = res.data.companyType + '-' + res.data.companyId
							//me.$set(me.deviceForm,'companyFormat',res.data.companyType+'-'+res.data.companyId)
							me.deviceForm.manageCode = res.data.manageCode
							me.deviceForm.name = res.data.name
							me.deviceForm.scope = res.data.scope
							me.deviceForm.accuracy = res.data.accuracy
							me.deviceForm.manufacturer = res.data.manufacturer
							me.deviceForm.factoryCode = res.data.factoryCode
							me.deviceForm.calibrationCycle = res.data.calibrationCycle
							me.deviceForm.calibrationTime = res.data.calibrationTime
							me.deviceForm.mvperiod = res.data.mvperiod
							if(res.data.deviceStateId!=''){
								me.deviceForm.deviceStateId = Number(res.data.deviceStateId)
								
							}
							//							查看时如果设备状态选择了新购入把之后的必填项变不必填
							me.deviceState()
							if(res.data.verificationState != null) {
								//如果填写了检定状态把检定状态变成字符串类型
								me.deviceForm.verificationState = res.data.verificationState.toString()
							}
							//后台添加时如果不填写使用现场或管理人后台返回的都是0
							if(res.data.jobsiteId != '') {
								me.deviceForm.jobsiteId = Number(res.data.jobsiteId)
							}
							if(res.data.managerId != '') {
								me.deviceForm.managerId = Number(res.data.managerId)

							}
							me.deviceForm.msaYn = res.data.msaYn
							me.deviceForm.remark = res.data.remark
							//判断MSA管理是Y还是N决定是否显示之后的内容
							me.showYesItem(me.deviceForm.msaYn)
							//导入文件
							let file0 = {
								'id': id,
								"fileType": 1
							}
							//导入文件接口
							check_files(file0).then(function(res) {
								//								if(res.code == '200') {
								//									me.file0_linshi = []
								//									me.fileList0 = []
								//									if(res.data.length != 0) {
								//										me.file0_linshi = []
								//										me.fileList0 = []
								//										let a = res.data[0].osskey.split('/')[4].substr(-3, 3)
								//										let t = ''
								//										if(a == 'jpg' || a == 'fif'  ||a == 'peg') {
								//											t = 'image/jpeg'
								//										} else if(a == 'png') {
								//											t = 'image/png'
								//										} else {
								//											t = 'application/pdf'
								//										}
								//										me.file0_linshi.push({
								//											'name': me.deviceForm.prove,
								//											'raw': {
								//												'type': t
								//											},
								//											"url": res.data[0].ossurl
								//										})
								//										me.fileList0.push({
								//											'name': me.deviceForm.prove,
								//											'raw': {
								//												'type': t
								//											},
								//											"url": res.data[0].ossurl
								//										})
								//									}
								//								}
								for(var i = 0; i < res.data.length; i++) {
									let a = res.data[i].osskey.split('/')[4].substr(-3, 3)
									let t = ''
									if(a == 'jpg' || a == 'fif' || a == 'peg') {
										t = 'image/jpeg'
									} else if(a == 'png') {
										t = 'image/png'
									} else {
										t = 'application/pdf'
									}
									me.fileList0.push({
										'name': res.data[i].osskey.split('/')[4],
										'raw': {
											'type': t
										},
										"url": res.data[i].ossurl,
										'id': res.data[i].id

									})
									me.file0_linshi.push({
										'name': res.data[i].osskey.split('/')[4],
										'raw': {
											'type': t
										},
										"url": res.data[i].ossurl,
										'id': res.data[i].id

									})
								}
								if(res.data.length != 0) {
									me.deviceForm.prove = '已上传' + res.data.length + '个文件,点击查看'
								}

							})
							if(me.deviceForm.msaYn === 'Y') {
								me.deviceForm.msaExpiryDay = res.data.msaExpiryDay
								if(res.data.msaState != null) {
									me.deviceForm.msaState = res.data.msaState.toString()
								}
								let file1 = {
									'id': id,
									"fileType": 2
								}
								let file2 = {
									'id': id,
									"fileType": 3
								}
								check_files(file1).then(function(res) {
									if(res.code == '200') {
										me.file1_linshi = []
										me.fileList1 = []
										for(var i = 0; i < res.data.length; i++) {
											let a = res.data[i].osskey.split('/')[4].substr(-3, 3)
											let t = ''
											if(a == 'jpg' || a == 'fif' || a == 'peg') {
												t = 'image/jpeg'
											} else if(a == 'png') {
												t = 'image/png'
											} else {
												t = 'application/pdf'
											}
											me.fileList1.push({
												'name': res.data[i].osskey.split('/')[4],
												'raw': {
													'type': t
												},
												"url": res.data[i].ossurl
											})
											me.file1_linshi.push({
												'name': res.data[i].osskey.split('/')[4],
												'raw': {
													'type': t
												},
												"url": res.data[i].ossurl
											})
										}
										me.deviceForm.msaeReport = '已上传' + res.data.length + '个文件,点击查看'
									}
								})
								check_files(file2).then(function(res) {
									if(res.code == '200') {
										me.file2_linshi = []
										me.fileList2 = []
										for(var i = 0; i < res.data.length; i++) {
											let a = res.data[i].osskey.split('/')[4].substr(-3, 3)
											let t = ''
											if(a == 'jpg' || a == 'fif' || a == 'peg') {
												t = 'image/jpeg'
											} else if(a == 'png') {
												t = 'image/png'
											} else if(a == 'pdf') {
												t = 'application/pdf'
											} else if(a == 'xls') {
												t = 'application/vnd.ms-excel'
											} else {
												t = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
											}
											me.fileList2.push({
												'name': res.data[i].osskey.split('/')[4],
												'raw': {
													'type': t
												},
												"url": res.data[i].ossurl
											})
											me.file2_linshi.push({
												'name': res.data[i].osskey.split('/')[4],
												'raw': {
													'type': t
												},
												"url": res.data[i].ossurl
											})
										}
										me.deviceForm.msaMeter = '已上传' + res.data.length + '个文件,点击查看'
									}
								})
							}
						}
					})
					//修改
				} else if(type === 'set') {
					this.xuanze = '请选择'
					this.shuru = '请输入'
					this.all_down = false
					this.type = false
					meter_getGaugeBaseInfo(data).then(function(res) {
						if(res.code === '200') {
							me.deviceForm.companyFormat = res.data.companyType + '-' + res.data.companyId
							//me.$set(me.deviceForm,'companyFormat',res.data.companyType+'-'+res.data.companyId)
							me.deviceForm.manageCode = res.data.manageCode
							me.deviceForm.name = res.data.name
							me.deviceForm.scope = res.data.scope
							me.deviceForm.accuracy = res.data.accuracy
							me.deviceForm.manufacturer = res.data.manufacturer
							me.deviceForm.factoryCode = res.data.factoryCode
							me.deviceForm.calibrationCycle = res.data.calibrationCycle
							me.deviceForm.calibrationTime = res.data.calibrationTime
							me.deviceForm.mvperiod = res.data.mvperiod
							if(res.data.deviceStateId!=''){
								me.deviceForm.deviceStateId = Number(res.data.deviceStateId)
								
							}
							me.deviceState()
							if(res.data.verificationState != null) {
								me.deviceForm.verificationState = res.data.verificationState.toString()
							}
							if(res.data.jobsiteId != '') {
								me.deviceForm.jobsiteId = Number(res.data.jobsiteId)
							}
							if(res.data.managerId != '') {
								me.deviceForm.managerId = Number(res.data.managerId)
							}
							me.deviceForm.msaYn = res.data.msaYn
							me.deviceForm.remark = res.data.remark
							//判断MSA管理是Y还是N
							me.showYesItem(me.deviceForm.msaYn)
							//导入文件
							let file0 = {
								'id': id,
								"fileType": 1
							}
							check_files(file0).then(function(res) {
								if(res.code == '200') {
									me.file0_linshi = []
									me.fileList0 = []
									//									if(res.data.length != 0) {
									//										
									//										let a = res.data[0].osskey.split('/')[4].substr(-3, 3)
									//										let t = ''
									//										if(a == 'jpg' || a == 'fif'  ||a == 'peg') {
									//											t = 'image/jpeg'
									//										} else if(a == 'png') {
									//											t = 'image/png'
									//										} else {
									//											t = 'application/pdf'
									//										}
									//										me.file0_linshi = []
									//										me.file0_linshi.push({
									//											'name': me.deviceForm.prove,
									//											'raw': {
									//												'type': t
									//											},
									//											"url": res.data[0].ossurl,
									//											'id':res.data[0].id
									//										})
									//										me.fileList0 = []
									//										me.fileList0.push({
									//											'name': me.deviceForm.prove,
									//											'raw': {
									//												'type': t
									//											},
									//											"url": res.data[0].ossurl,
									//											'id':res.data[0].id
									//											
									//										})
									//									}
									for(var i = 0; i < res.data.length; i++) {
										let a = res.data[i].osskey.split('/')[4].substr(-3, 3)
										let t = ''
										if(a == 'jpg' || a == 'fif' || a == 'peg') {
											t = 'image/jpeg'
										} else if(a == 'png') {
											t = 'image/png'
										} else {
											t = 'application/pdf'
										}
										me.fileList0.push({
											'name': res.data[i].osskey.split('/')[4],
											'raw': {
												'type': t
											},
											"url": res.data[i].ossurl,
											'id': res.data[i].id

										})
										me.file0_linshi.push({
											'name': res.data[i].osskey.split('/')[4],
											'raw': {
												'type': t
											},
											"url": res.data[i].ossurl,
											'id': res.data[i].id

										})
									}
									if(res.data.length != 0) {
										me.deviceForm.prove = '已上传' + res.data.length + '个文件,点击查看'
									}

								}
							})
							if(me.deviceForm.msaYn === 'Y') {
								me.deviceForm.msaExpiryDay = res.data.msaExpiryDay
								if(res.data.msaState != null) {
									me.deviceForm.msaState = res.data.msaState.toString()
								}
								let file1 = {
									'id': id,
									"fileType": 2
								}
								let file2 = {
									'id': id,
									"fileType": 3
								}
								check_files(file1).then(function(res) {
									if(res.code == '200') {
										me.file1_linshi = []
										me.fileList1 = []
										for(var i = 0; i < res.data.length; i++) {
											let a = res.data[i].osskey.split('/')[4].substr(-3, 3)
											let t = ''
											if(a == 'jpg' || a == 'fif' || a == 'peg') {
												t = 'image/jpeg'
											} else if(a == 'png') {
												t = 'image/png'
											} else {
												t = 'application/pdf'
											}
											me.fileList1.push({
												'name': res.data[i].osskey.split('/')[4],
												'raw': {
													'type': t
												},
												"url": res.data[i].ossurl,
												'id': res.data[i].id

											})
											me.file1_linshi.push({
												'name': res.data[i].osskey.split('/')[4],
												'raw': {
													'type': t
												},
												"url": res.data[i].ossurl,
												'id': res.data[i].id

											})
										}
										me.deviceForm.msaeReport = '已上传' + res.data.length + '个文件,点击查看'

									}
								})
								check_files(file2).then(function(res) {
									if(res.code == '200') {
										me.file2_linshi = []
										me.fileList2 = []
										for(var i = 0; i < res.data.length; i++) {
											let a = res.data[i].osskey.split('/')[4].substr(-3, 3)
											let t = ''
											if(a == 'jpg' || a == 'fif' || a == 'peg') {
												t = 'image/jpeg'
											} else if(a == 'png') {
												t = 'image/png'
											} else if(a == 'pdf') {
												t = 'application/pdf'
											} else if(a == 'xls') {
												t = 'application/vnd.ms-excel'
											} else {
												t = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
											}
											me.fileList2.push({
												'name': res.data[i].osskey.split('/')[4],
												'raw': {
													'type': t
												},
												"url": res.data[i].ossurl,
												'id': res.data[i].id
											})
											me.file2_linshi.push({
												'name': res.data[i].osskey.split('/')[4],
												'raw': {
													'type': t
												},
												"url": res.data[i].ossurl,
												'id': res.data[i].id

											})
										}
										me.deviceForm.msaMeter = '已上传' + res.data.length + '个文件,点击查看'
									}
								})
							}
						}
					})
				} else {
					this.xuanze = '请选择'
					this.shuru = '请输入'
					this.all_down = false
				}
			},
			//获取使用现场和管理人下拉框
			job_man() {
				let me = this
				search_getJobsite().then(function(res) {
					if(res.code === '200') {
						me.jobsiteId = res.data
					}
				})
				add_getManager().then(function(res) {
					if(res.code === '200') {
						me.managerId = res.data
					}
				})
				search_getDevice().then(res=>{
					if(res.code==200){
						this.device=res.data
					}
				})
			},
			//获取公司下拉输入框
			do_search_company() {
				let me = this
				search_company().then(function(res) {
					if(res.code === '200') {
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

			//如果是新购入改变不需要必须输入的状态
			deviceState() {
				if(this.deviceForm.deviceStateId == 4) {
					this.rules.calibrationTime[0].required = false
					this.rules.mvperiod[0].required = false
					this.rules.verificationState[0].required = false
//					this.rules.calibrationCycle[0].required = false
					this.rules.managerId[0].required = false
					this.rules.prove[0].required = false
					this.rules.msaYn[0].required = false
					this.rules.jobsiteId[0].required = false
					this.rules.calibrationCycle[0].required = false
					
					//					this.rules.msaExpiryDay[0].required = false
					//					this.rules.msaState[0].required = false
					//					this.rules.msaeReport[0].required = false
					//					this.rules.msaMeter[0].required = false
				} else {
					this.rules.calibrationTime[0].required = true
					this.rules.mvperiod[0].required = true
					this.rules.verificationState[0].required = true
//					this.rules.calibrationCycle[0].required = true
					if(this.deviceForm.deviceStateId == 3){
						this.rules.jobsiteId[0].required = true
					}else{
						this.rules.jobsiteId[0].required = false
					}
					this.rules.managerId[0].required = true
					this.rules.prove[0].required = true
					this.rules.msaYn[0].required = true
					this.rules.calibrationCycle[0].required = true
					
					//					this.rules.msaExpiryDay[0].required = true
					//					this.rules.msaState[0].required = true
					//					this.rules.msaeReport[0].required = true
					//					this.rules.msaMeter[0].required = true
				}
				
			}

		},
		//名字太长的过滤器
		filters: {
			name(x) {
				if(x.length > 15) {
					var y = x.substr(0, 12) + '...'
					return y
				} else {
					let y = x.split('.')[0]
					return y
				}
			}
		},
		//		观察管理编号不能重复
		watch: {
			'deviceForm.manageCode': {
				handler(newName, oldName) {
					if(this.deviceForm.manageCode != '') {
						let me = this
						search_getCodeCount({
							'code': this.deviceForm.manageCode.trim(),
							'id': this.$route.query.id
						}).then(function(res) {
							if(res.data == 1) {
								me.repeat = 1
							} else {
								me.repeat = 0
							}
						})
					}
				},
			}
		}
	};
</script>
<style>
	.grg_upload {
		display: inline-block;
		width: 30%;
		position: absolute;
		top: 39px;
		left: 73%;
	}
	
	.grg_select_btn {
		width: 100%;
		border-radius: 4px;
		background: #d69201;
		color: #fff;
	}
	
	.grg_select_btn:hover {
		opacity: 0.8;
	}
	
	.grg_btns {
		width: 400px;
		height: 50px;
		margin-top: -50px;
		padding-top: 7px;
	}
	
	.title {
		position: absolute;
		top: 15px;
		left: 15px;
		color: #1E556B;
		font-size: 16px;
	}
	
	.check_title {
		position: absolute;
		top: 15px;
		left: 15px;
		color: #1E556B;
		font-size: 16px;
	}
	
	h5 {
		float: left;
		color: #999999;
	}
	
	.list {
		width: 148px;
		height: 150px;
		float: left;
		margin: 10px 5px;
		border-left: 1px solid whitesmoke;
		border-right: 1px solid whitesmoke;
		border-bottom: 1px solid whitesmoke;
	}
	
	.image {
		width: 148px;
		height: 130px;
		overflow: hidden;
		position: relative;
		background-color: #F5F5F5;
	}
	
	.name {
		width: 148px;
		height: 20px;
		border-top: 1px solid whitesmoke;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	
	.picture {
		position: absolute;
		top: 10px;
		z-index: 0;
	}
	
	.del_img {
		position: absolute;
		left: 64px;
		top: 0px;
		z-index: 1;
	}
	
	.clear {
		clear: both;
	}
</style>