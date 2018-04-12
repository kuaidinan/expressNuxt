import axios from 'axios';

export default function fetch(options) {
  return new Promise((resolve, reject) => {
      let option = {
          withCredentials: true,
          headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type':'application/json;charset=UTF-8',
          }
      }
      const instance = axios.create(option);
      instance(options)
          .then(response => {
              const res = response.data;
              resolve(res);
          })
          .catch(error => {
              this.$Message({
                  message: '数据请求失败,请刷新页面重试',
                  type: 'error',
                  duration: 5 * 1000
              });
              console.log(error); // for debug
              reject(error);
          });
  });
}