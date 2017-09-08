// 用户token换user

const BaseService =  require('../service/BaseService.js')
const error = require('./error')
const {user} = require('../config/apiRoute')
const {server} =require('../config')
const baseService = new BaseService()

module.exports = (req, res, next) => {
  const token = req.get('Futures-Token')
  if(token == '7855c1b0-c20d-4d8a-ad76-3c20ddc00a04'){
    req.middlewareData = {user: {userId:0,level:'VISITOR'}}
    return next()
  }
  if (!token) {
    req.middlewareData = {user: {userId:0,level:'VISITOR'}}
    return next()
  }

  baseService.postRequest({path: server.authPath, route:user.session, params: { body: {token}}}).then( (ret)=> {
    if( ret.code != 0 ) return next(error(401,ret.code,'授权已过期,请重新登录'));
    req.middlewareData = {user: ret.data}
    next()
  }).catch((ret) => {
    next(ret)
  })
}
