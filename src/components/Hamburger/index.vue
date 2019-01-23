<template>
  <div>
    <svg-icon :icon-class="icon" @click.native="toggleClick" class="hamburger"></svg-icon>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    },
    icon: {
      type: String,
      default: 'close'
    }
  }
}
</script>

<style>
.hamburger {
	display: inline-block;
	cursor: pointer;
	width: 25px;
	height: 25px;
	/* transition: .38s; */
  vertical-align: middle;
}
</style>
