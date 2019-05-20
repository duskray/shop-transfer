import axios from 'axios';
import { message } from 'antd'

const q = (method = 'get', url = '', data = {}) => {
  const params = method === 'get' ? 'params' : 'data';
  // const p = method === 'get' ? data : qs.stringify(data, { arrayFormat: 'brackets' })
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      [params]: data,
      withCredentials: true,
    }).then(r => {
      if (r.status >= 200 && r.status < 300) {
        if (r.data.success) {
          if (r.data.message) {
            message.success(r.data.message)
          }
          resolve(r.data)
        } else {
          if (r.data.message) {
            message.warn(r.data.message)
          }
          reject(r.data);
        }
      } else {
        if (r.data.message) {
          message.warn(r.data.message)
        }
        reject(r.data);
      }
    }).catch(e => {
      reject(e)
      // const status = e.response.status
      // if (status === 401) {
      //   Toast.fail(e.response.data.message, 2, null, false)
      //   return;
      // }
      if (e.response) {
        console.log(e.response)
        message.error(e.response.data.message || e.response.statusText)
      } else if (e.request) {
        console.log(e.request);
        message.error('网络连接失败')
      } else {
        console.log('链接发生错误', e.message);
      }
    })
  })
}

const ax = {};
ax.get = (url, data) => {
  return q('get', url, data);
}
ax.post = (url, data) => q('post', url, data);
ax.patch = (url, data) => q('patch', url, data);
ax.put = (url, data) => q('put', url, data);
ax.delete = (url, data) => q('delete', url, data);
ax.all = axios.all;
ax.spread = axios.spread;

export default ax;
