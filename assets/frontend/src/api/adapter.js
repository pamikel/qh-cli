/**
 * adapter, use plugin from vue-resource
 *  github: https://github.com/pagekit/vue-resource
 *  blog:   http://www.cnblogs.com/keepfool/p/5657065.html
 */

import Vue from 'vue'
import {store} from '../stores/'
import VueResource from 'vue-resource'
Vue.use(VueResource)

// console.log('adapter.js')
// window.store = store
// http request and response hook
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Futures-Token', store.state.user.token)
  // can add loading
  next(async (response) => {
    // 统一后端接口， 禁止返回状态500， 代码中异常返回4xx
    return response
  })
})


/**
 * @describetion of http methods
 * http: {
 *    get(url, [options])
 *    head(url, [options])
 *    delete(url, [options])
 *    jsonp(url, [options])
 *    post(url, [body], [options])
 *    put(url, [body], [options])
 *    patch(url, [body], [options])
 * }
 */
const httpMethods = ['get', 'head', 'delete', 'jsonp', 'post', 'put', 'patch']
const http = httpMethods.reduce((pre, method) => {
  pre[`${method}Request`] = async (...args) => {
    try{
      const response = await Vue.http[method](...args)
      return response.body
    }catch(e) {
      //when http request response status: 4xx 5xx
      return e.body
    }
  }
  return pre
}, {})

export default http

export const getRequest = http.getRequest
export const headRequest = http.headRequest
export const deleteRequest = http.deleteRequest
export const jsonpRequest = http.jsonpRequest
export const postRequest = http.postRequest
export const putRequest = http.putRequest
export const patchRequest = http.patchRequest
