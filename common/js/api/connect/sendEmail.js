import fetch from '../fetch.js';

export function sendEmail(option) {
  return fetch({
      url:'/api/connect/sendEmail',
      method:'get',
      data:option
  })
}