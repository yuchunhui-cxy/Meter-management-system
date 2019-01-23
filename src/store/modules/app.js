const app = {
  state: {
    sidebar: {
      opened: !!+localStorage.getItem('sidebarStatus'),
      withoutAnimation: false
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        localStorage.setItem('sidebarStatus', 0)
      } else {
        localStorage.setItem('sidebarStatus', 1)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    }
  }
}

export default app
