<template>
  <section>
    <div class="home">
      <div class="home_head">拼团首页</div>
      <button class="home_ptbn" @click="goNext()">我的拼团</button>
      <footer class="home_footer">
        原件{{22}}团购价{{10}}
        <div class="home_ptbn" @click="shareFlag=true">发起拼团</div>
      </footer>
    </div>
    <!-- 拼团分享页面 -->
    <div class="share" v-show="shareFlag" @click="showPing()">
      点我分享
    </div>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        shareFlag:false
      }
    },
    methods:{
      goNext() {
        this.$router.push('/activity/pingteam/list')
      },
      showPing() {
        this.shareFlag = true;
      }
    }
  }
</script>

<style lang="less">
  @import '../../../../common/less/base.less';
  .home{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-around;
    &_head{
      width:200/@REM;
      height:200/@REM;
      text-align:center;
    }
    &_pbtn{
      width:200/@REM;
    }
    &_footer{
      
    }
  }
  .share{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    text-align:right;
    background:rgba(0,0,0,0.7);
    color:white;
  }
</style>