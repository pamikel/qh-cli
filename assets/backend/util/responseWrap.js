const {
  isFunction
} = require('lodash')
const {
  StatusCode,
  Code,
  CodeMsg
} = require('../config/resource')
const Error = require('./error')
class Response {
  constructor(code, msg, data) {
    this.code = code
    this.errorMessage = msg
    this.data = data
  }
}

module.exports = (fn) => {
  return (req, res, next) => {
    try {
      let result = fn(req, res)
      if (result && result.then && isFunction(result.then)) {
        result.then((data) => {
          res.status(StatusCode.OK)
          res.send(new Response(Code.OK, null, data))
        }).catch(next)
      } else {
        res.status(StatusCode.OK)
        res.send(new Response(Code.OK, null, result))
      }
    } catch (error) {
      next(error)
    }
  }
}