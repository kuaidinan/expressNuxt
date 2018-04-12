<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
import fetch from '../common/js/fetch.js'
export default {
  name: 'defualt',
  mounted() {
    this.getJSSign();
  },
  methods:{
    getJSSign() {
      fetch({
        url:'/api/wechat/getSignature',
        method:'post',
        data:{
          href:location.href.split('#')[0]
        }
      }).then((res) => {
        // wx.config({
        //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //     appId: '', // 必填，公众号的唯一标识
        //     timestamp: , // 必填，生成签名的时间戳
        //     nonceStr: '', // 必填，生成签名的随机串
        //     signature: '',// 必填，签名
        //     jsApiList: [] // 必填，需要使用的JS接口列表
        // });
        console.log(res);
      })
    }
  }
}
</script>
<style lang="less">
@import '../common/less/base.less';
</style>
