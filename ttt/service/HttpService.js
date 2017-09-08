/**
 * Created by wudi on 17/3/3.
 * 
 * HTTP 服务
 * 继承自基础服务类BaseService
 * 基础服务类BaseService提供http请求
 * 
 * 发送请求案例
 * this.getRequest({
 *  route: 'user/:id',
 *  params: {
 *    header: {
 *     'token': '111223333',
 *     'Content-Type': 'application/json'
 *    },
 *    qs: {
 *      username: 'seed'
 *    },
 *    body: {
 *      country: 'China'
 *    }
 *  }
 * })
 * 
 * 以上是发送get请求，同理发送post、put、delete请求为
 * this.postRequest(requestObj)
 * this.putRequest(requestObj)
 * this.deleteRequest(requestObj)
 * 
 * this.xxxRequest 方法返回promise对象
 */

const BaseService = require('./BaseService')
const {apiRoute, server} = require('../config')
const {appLogger} = require('../util/log')
const {tracer={id:{}}} = require('../util/zipkin.js')

const {article} = apiRoute

class HttpService extends BaseService {
  constructor() {
    super(server.testPath)
  }

  testGetMethods(obj = {}) {
    return this.getRequest({route:article.testGetMethodRoute,params:obj}).then(res=>{
      return res
    })
  }

  testGetMethods1(obj = {}) {
    return this.getRequest({route:article.testGetMethodRoute,params:obj})
  }
}
module.exports = new HttpService()
