<template>
  <div class="hh">
    <section>
      <div>拼团列表页面</div>
      <div>拼团中</div>
      <button @click="qrImg()">邀请好友参团</button>
    </section>
    <img src="" id="srcImg"></img>
    <div class="test" v-show="false">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import QRCode from 'qrcode'
  import config from '~/common/js/config.js'
  Vue.use(QRCode);
  export default {
    name:'payment',
    data() {
      return {
        url:config.domain,
        bgSrc:require('@/common/img/test.jpg')
      }
    },
    methods:{
      qrImg(){
        var that = this;
        var canvas = document.getElementById('canvas')
        QRCode.toCanvas(canvas, `${this.url}?openID=${this.getCookie('pingTeam')}`, function (error) {
            if (error) console.error(error);
        })

        var c=document.createElement('canvas');
        var context=c.getContext('2d')

        var bgImg = new Image();
        console.log('this.bgSrc',this.bgSrc)
        bgImg.src = this.bgSrc;
        c.width = 400;
        c.height = 400;

        bgImg.onload = function() {
          context.drawImage(bgImg,0,0,bgImg.width,bgImg.height);
          context.drawImage(canvas,200,200,200,200);
          var srcImg = c.toDataURL("image/png");
          document.getElementById("srcImg").setAttribute('src',srcImg);
        }
      },
      getCookie(str) {
        if (process.browser) {
          // var match = `/(?:(?:^|.*;s*)${str}*=s*([^;]*).*$)|^.*$/`
          // var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)pingTeam\s*\=\s*([^;]*).*$)|^.*$/, "$1");
          var cookieArr = document.cookie.split('; ')
          console.log('cookieArr',cookieArr)
          var cookieJSON = {};
          cookieArr.map((item) => {
            cookieJSON[item.split('=')[0]] = item.split('=')[1]
          })
          return cookieJSON[str]
        }
      }
    }
  }
</script>