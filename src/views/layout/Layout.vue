<template>
  <div class="app-wrapper" :class="classObj">
    <navbar></navbar>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container clearfix">
      <breadcrumb></breadcrumb>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from "./components";
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: "layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    Breadcrumb
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
      };
    }
  },
  methods: {

  }
};
</script>

<style>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>


