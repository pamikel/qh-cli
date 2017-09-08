const __request = require('request')
const querystring = require('querystring')
const Error = require('../util/error')

const {
  appLogger
} = require('../util/log')
const {
  zipkinRequest,
  tracer
} = require('../util/zipkin.js')
// const {tracer} = require('../util/')

class BaseService {
  /**
   * Creates an instance of BaseService.
   * @param {any} baseDomain 
   * 
   * @memberof BaseService
   */
  constructor(baseDomain) {
    this.$$baseDomain = baseDomain
    this._setBaseMethods()
  }


  /**
   * _setBaseMethods
   * set methods: optionsRequest, getRequest, headRequest, 
   *              postRequest, putRequest, deleteRequest, patchRequest
   * 
   * @memberof BaseService
   */
  _setBaseMethods() {
    const that = this

    that.suffix = 'Request'

    that.instanceSource = {
      method: [
        'OPTIONS',
        'GET',
        'HEAD',
        'POST',
        'PUT',
        'DELETE',
        'PATCH'
      ]
    }

    for (let key in that.instanceSource) {
      that.instanceSource[key].forEach((method, index) => {
        that[method.toLowerCase() + that.suffix] = (requestObject) => that._defaultRequest(method, requestObject)
      })
    }
  }


  /**
   * _setUrl
   * 根据routeName和dRoute参数生成真实的url
   * eg: routeName = 'user/:userId' dRoute = {userId:12}
   *     return 'user/12'
   * 
   * @param {any} routeName 
   * @param {any} [dRoute={}] 
   * @returns 
   * 
   * @memberof BaseService
   */
  _setUrl(routeName, dRoute = {}) {
    let actRoute = ''
    if (!routeName) return actRoute
    routeName.split('/').map(route => {
      if (route && route[0] !== ':') actRoute += `/${route}`
      if (route[0] == ':') actRoute += `/${dRoute[route.substring(1)]}`
    })
    return actRoute
  }

  /**
   * _setQs
   * 根据qs对象生成路径
   * eg: url = 'http://www.xyz.com' qs:{a:1}
   *     return 'http://www.xyz.com?a=1'
   * 
   * @param {any} url 
   * @param {any} [qs={}] 
   * @returns 
   * 
   * @memberof BaseService
   */
  _setQs(url, qs = {}) {
    let queryString = querystring.stringify(qs);
    return queryString ? `${url}?${queryString}` : `${url}`
  }

  /**
   * _defaultRequest
   * 
   * @param {string} [method=''] request method
   * @param {any} requestObject 
   * @returns 
   * 
   * @memberof BaseService
   */
  _defaultRequest(method = '', requestObject) {
    let {
      path,
      route,
      params = {}
    } = requestObject
    const $$header = Object.assign({
      'Content-Type': 'application/json'
    }, params.header)
    const $$url = this._setQs(`${path || this.$$baseDomain}${this._setUrl(route, params.route)}`, params.qs)

    const $$body = params.body

    // 注入拦截器
    const chainInterceptors = (promise, interceptors) => {
      for (let i = 0, ii = interceptors.length; i < ii;) {
        let thenFn = interceptors[i++]
        let rejectFn = interceptors[i++]
        promise = promise.then(thenFn, rejectFn)
      }
      return promise
    }

    // 请求参数配置
    const $$config = Object.assign({
      url: $$url,
      header: $$header,
      method: method,
      body: $$body,
      json: true
    })

    let requestInterceptors = []
    let responseInterceptors = []
    let reversedInterceptors = this.setInterceptors()
    let promise = this.__resolve($$config)

    // 缓存拦截器
    reversedInterceptors.forEach((n, i) => {
      if (n.request || n.requestError) {
        requestInterceptors.push(n.request, n.requestError)
      }
      if (n.response || n.responseError) {
        responseInterceptors.unshift(n.response, n.responseError)
      }
    })

    // 注入请求拦截器
    promise = chainInterceptors(promise, requestInterceptors)

    // 发起HTTPS请求
    promise = promise.then(this.__http)

    // 注入响应拦截器
    promise = chainInterceptors(promise, responseInterceptors)

    // 接口调用成功
    promise = promise.then(res => res, err => Promise.reject(err))

    return promise
  }


  /**
   * __http
   * http请求
   * 
   * @param {any} obj 
   * @returns 
   * 
   * @memberof BaseService
   */
  __http(obj) {
    return new Promise((resolve, reject) => {
      zipkinRequest(obj).then(({
        response,
        body
      }) => {
        if (response.statusCode < 200 || response.statusCode > 300) {
          return reject(
            Error(response.statusCode,
              body ? body.code : null,
              body ? body.errorMessage : null)
          )
        }
        resolve(body)
      }).catch(err => {
        return reject(Error(500))
      })
    })
  }


  /**
   * __resolve
   * 
   * @param {any} res 
   * @returns 
   * 
   * @memberof BaseService
   */
  __resolve(res) {
    return new Promise((resolve, reject) => {
      resolve(res)
    })
  }

  /**
   * __reject
   * 
   * @param {any} res 
   * @returns 
   * 
   * @memberof BaseService
   */
  __reject(res) {
    return new Promise((resolve, reject) => {
      reject(res)
    })
  }

  /**
   * setInterceptors
   * 
   * @returns 
   * 
   * @memberof BaseService
   */
  setInterceptors() {
    return [{
      request: (request) => {
        request.header = request.header || {}
        return request
      },
      requestError: (requestError) => {
        return Promise.reject(requestError)
      },
      response: (response) => {
        return response
      },
      responseError: (responseError) => {
        return Promise.reject(responseError)
      },
    }]
  }
}

module.exports = BaseService