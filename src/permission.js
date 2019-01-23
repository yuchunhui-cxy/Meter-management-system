import router from './router'
import store from './store'
import { Message } from 'element-ui'

router.beforeEach((to, form, next) => {
  if (store.getters.userInfo.menus.length === 0) {
    store.dispatch('GetInfo').then(res => { // 拉取用户信息及菜单
      next()
    }).catch((err) => {
      store.dispatch('FedLogOut').then(() => {
        Message.error(err || 'Verification failed, please login again')
        window.location.href = process.env.LOGIN_URL
        next()
      })
    })
  } else {
    next()
  }
})

router.afterEach(() => {
})
