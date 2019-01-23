<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <template v-if="!item.children">
          <el-menu-item :index="item.url" :key="item.url" :class="($route.path.indexOf(item.url) > -1)?'is-active':''">
              <!-- <svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon> -->
              <span slot="title" class="firstTitle">{{item.name}}</span>
          </el-menu-item>
      </template>
      <template v-else>
          <el-submenu :index="item.id +''" :key="item.id">
              <template slot="title">
                  <svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
                  <span slot="title">{{item.name}}</span>
              </template>
              <!--递归组件调用-->
              <SidebarItem :routes="item.children"></SidebarItem>
          </el-submenu>
      </template>
  </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "SidebarItem",
  props: {
    routes: {
      type: Array
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
};
</script>

<style>
  
</style>

