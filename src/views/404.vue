<template>
  <div class="page_404">
    <div class="con_404">
      <img :src="img_404" alt="">
      <div class="text_404">
        <span>您找的页面已失踪.....</span>
        <p>
          <i>{{seconds}}</i>
          秒跳转到上一页，如没有跳转，请<i @click="jumpToPrev()">点击这里</i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import img_404 from "@/assets/404_images/404.png";
export default {
  data: function() {
    return {
      img_404,
      seconds:5,
      timer:null
    };
  },
  mounted: function() {
    this.setTime()
  },
  destoryed:function(){
    clearInterval(this.timer)
  },
  methods: {
    setTime:function(){
      let me = this;
      this.timer = setInterval(function(){
        if( 0 == me.seconds ){
          me.jumpToPrev()
          clearInterval(me.timer)
        }else{
          me.seconds--;
        }
      },1000)
    },
    jumpToPrev:function(){
      this.$router.go(-1)
    }
  }
};
</script>

<style>
.page_404 {
  width: 100%;
  height: 100%;
  background: #f4f8fb;
  padding: 100px 0 0 0;
}
.con_404 {
  width: 605px;
  margin: 0 auto;
  text-align: center;
}
.text_404{
  width: 100%;
  text-align: center;
  padding-top: 40px;
  font-size: 24px;
  color: #333333;
}
.text_404 span {
  
}
.text_404 p{

}
.text_404 p i{
  font-style: normal;
  margin: 0 5px;
  color: #6fa210;
}
</style>

