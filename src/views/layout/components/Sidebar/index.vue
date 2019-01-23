<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      :default-active="$route.path"
      mode="vertical"
      router
      :show-timeout="200"
      :collapse="isCollapse"
      background-color="#176785"
      text-color="#ffffff"
      active-text-color="#ffffff"
      unique-opened
    >
      <sidebar-item :routes="menus" v-show="sidebar.opened"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";




export default {
  data: function() {
    return {
      
    };
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters(["sidebar"]),
    menus() {
      return this.$store.getters.userInfo.menus;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },

  mounted: function() {},
  methods: {
    toggleSideBar: function() {
      this.$store.dispatch("ToggleSideBar");
    }
  }
};
</script>
<style>


</style>

