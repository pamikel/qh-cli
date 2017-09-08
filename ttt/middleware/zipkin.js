const {tracer} = require('../util/zipkin.js')

const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;

exports.zipkin = zipkinMiddleware({
  tracer,
  serviceName: 'serviceName'
})
// module.exports = {
//   tracer,
//   zipkinMiddleware
// }