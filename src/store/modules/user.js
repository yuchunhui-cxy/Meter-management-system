import { logout, getInfo } from '@/api/login'

const user = {
  state: {
    userInfo: {
      menus: []
    }
  },

  mutations: {
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 获取用户信息
    GetInfo ({ commit }) {
      getInfo({
        'sysCode': 'sys_gms'
      }).then(response => {
        if ('200' == response.code) {
          commit('SET_USERINFO', response.data)
        } else {
          commit('SET_USERINFO', {})
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 登出
    LogOut ({ commit }) {
      logout().then(() => {
        commit('SET_USERINFO', {});
        location.reload();
      }).catch(error => {
        console.log(error)
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        localStorage.removeItem('sidebarStatus')
        resolve()
      })
    }
  }
}

export default user
