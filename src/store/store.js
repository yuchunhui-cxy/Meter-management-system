import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		page_number:1
	},
	mutations:{
		save(state,data){
			state.page_number = data
		}
	}
})