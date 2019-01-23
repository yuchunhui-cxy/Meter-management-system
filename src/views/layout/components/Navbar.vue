<template>
	<el-menu class="navbar" mode="horizontal">
		<div class="sys-logo">
			<router-link to="/">
				<img :src="slogo">
			</router-link>
			<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :icon="sidebar.opened ? 'close':'open'"></hamburger>
		</div>
		<span class="sysName lineHei">计量管理系统</span>
		<div class="avatar-container">
			<!--登录用户信息-->
			<div class="avatar-wrapper lineHei">
				<img class="user-avatar" :src="profile">
				<span>{{userName}}</span>
			</div>
			<!-- <div class="avatar-wrapper">
        <el-badge :value="12" class="item">
          <svg-icon icon-class="notice"></svg-icon>
        </el-badge>
      </div>
      <div class="avatar-wrapper">
        <el-badge :value="666" class="item">
          <svg-icon icon-class="audit"></svg-icon>
        </el-badge>
      </div> -->
			<!--<div class="avatar-wrapper">
				<svg-icon icon-class="language"></svg-icon>
			</div>
			<div class="avatar-wrapper">
				<svg-icon icon-class="skin"></svg-icon>
			</div>-->
			<div class="avatar-wrapper">
				<!--<svg-icon icon-class="logout" @click.native="logout()"></svg-icon>-->
				<img :src='tuichu' style='width: 20px; height: 20px;' @click="dialogVisible=true" class='user-avatar'>
			</div>
		</div>
		<el-dialog title="退出系统" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<span>您确定要现在退出系统吗?</span>
			<span slot="footer" class="dialog-footer">
   	 	<el-button @click="dialogVisible = false">取 消</el-button>
   		<el-button type="primary" @click="exit">退出</el-button>
 			</span>
		</el-dialog>
	</el-menu>
	
</template>

<script>
	import { mapGetters } from "vuex";
	import hamburger from "@/components/Hamburger";
	//加载图片
	import profile from "@/assets/images/profile.png";
	//加载图片
	import slogo from "@/assets/images/slogo.png";
	import tuichu from "@/assets/images/tuichu.png";
	export default {
		data: function() {
			return {
				profile,
				slogo,
				tuichu,
				dialogVisible: false
			};
		},
		components: {
			hamburger
		},
		computed: {
			...mapGetters(["sidebar"]),
			userName() {
				return this.$store.getters.userInfo.username;
			}
		},
		methods: {
			toggleSideBar: function() {
				this.$store.dispatch("ToggleSideBar");
			},
			logout() {
				this.$store.dispatch("LogOut");
			},
			handleClose(done) {
            done();
     },
     exit(){
     	this.logout()
     }
		}
	};
</script>
<style>
	.navbar {
		height: 60px;
		border-radius: 0px !important;
		background-image: linear-gradient(-180deg, #f5f8fa 0%, #eeeeee 100%);
		border-bottom: none;
		color: #176785;
	}
	
	.sys-logo {
		float: left;
		width: 240px;
		height: 60px;
		line-height: 60px;
		padding-left: 20px;
		color: #ffffff;
		background: #176785;
		display: block;
		transition: 0.28s;
		position: fixed;
	}
	
	.sys-logo img {
		position: relative;
		width: 35px;
		left: 50px;
		top: 10px;
	}
	
	.sys-logo svg {
		position: relative;
		left: -30px;
		color: #ffffff;
	}
	
	#app .hideSidebar .sys-logo {
		position: absolute;
		z-index: 2;
		width: 100px;
		height: 80px;
		transition: 0.28s;
		border-bottom-right-radius: 100%;
	}
	
	#app .hideSidebar .sys-logo img {
		position: relative;
		width: 35px;
		left: 0px;
		top: 5px;
	}
	
	#app .hideSidebar .sys-logo svg {
		position: relative;
		left: -30px;
		top: 25px;
	}
	
	.navbar .avatar-container {
		height: 60px;
		display: inline-block;
		float: right;
		margin-right: 20px;
	}
	
	.avatar-container .avatar-wrapper {
		display: inline-block;
		cursor: pointer;
		font-size: 17px;
		padding: 0 15px;
	}
	
	.avatar-container .avatar-wrapper:hover {
		color: #1b4a5c;
	}
	
	.avatar-container .avatar-wrapper .user-avatar {
		width: 30px;
		height: 30px;
		margin-right: 10px;
		vertical-align: middle;
	}
	
	.navbar .sysName {
		display: inline-block;
		font-size: 20px;
		padding: 0 25px;
		margin-left: 240px;
	}
	
	#app .hideSidebar .navbar .sysName {
		margin-left: 100px;
	}
	
	.lineHei {
		line-height: 60px;
	}
	
	.btnMarR {
		margin-right: 40px;
	}
	
	.hamburger-container {
		display: inline-block;
		width: 20px;
		height: 20px;
	}
</style>