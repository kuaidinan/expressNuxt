<template>
  <section class="container">
    <nuxt-child/>
  </section>
</template>

<script>
  import config from '~/common/js/config.js'
  import { getJSSDKSign } from '~/common/js/api/wechat.js'
  if (process.browser) {
    getJSSDKSign({href:location.href.split('#')[0]}).then((res) => {
      wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: config.wechat.appID, // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.noncestr, // 必填，生成签名的随机串
          signature: res.jsapi_ticket,// 必填，签名
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo'
          ] // 必填，需要使用的JS接口列表
      });
    })
    wx.ready(() => {
      wx.onMenuShareTimeline({
        title: '分享到朋友圈', // 分享标题
        link: 'http://wechat.xuqiang.site/activity/pingteam', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3088020551,4198140884&fm=96', // 分享图标
        success: function (res) {
        // 用户确认分享后执行的回调函数
          console.log('success',res)
        },
        cancel: function (err) {
        // 用户取消分享后执行的回调函数
          console.log('success',err)
        }
      })
      wx.onMenuShareAppMessage({
        title: '分享给朋友', // 分享标题
        desc: '分享描述', // 分享描述
        link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3088020551,4198140884&fm=96', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      });
    })
  }
  export default {
    // head () {
    //   return {
    //     title: '拼团',
    //     meta: [
    //       { hid: 'description', name: 'description', content: 'My custom description' }
    //     ]
    //   }
    // },
    created() {

    },
    mounted() {
    },
    methods: {
      initConfig() {
        wx.ready(() => {
          wx.onMenuShareTimeline({
            title: '分享到朋友圈', // 分享标题
            link: 'http://wechat.xuqiang.site/activity/pingteam', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3088020551,4198140884&fm=96', // 分享图标
            success: function (res) {
            // 用户确认分享后执行的回调函数
              console.log('success',res)
            },
            cancel: function (err) {
            // 用户取消分享后执行的回调函数
              console.log('success',err)
            }
          })
          wx.onMenuShareAppMessage({
            title: '分享给朋友', // 分享标题
            desc: '分享描述', // 分享描述
            link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          });
        })
      }
    }
  }
</script>

<style lang="less">
  // .container{
    // background:red;
  // }
</style>