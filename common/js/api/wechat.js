import fetch from './fetch.js';

export function getJSSDKSign(option) {
  return fetch({
      url:'/api/wechat/getSignature',
      method:'post',
      data:option
  })
}