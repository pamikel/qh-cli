const CLSContext = require('zipkin-context-cls');

const {
  Tracer
} = require('zipkin');

const request = require('request')


const {BatchRecorder,ConsoleRecorder} = require('zipkin');
const {HttpLogger} = require('zipkin-transport-http');
const {zipkinRecorderUrl} = require('./../config')
const wrapRequest = require('./wrapRequest.js')
const recorder = new ConsoleRecorder();
// const recorder = new BatchRecorder({
//   logger: new HttpLogger({
//     endpoint: `${zipkinRecorderUrl}/api/v1/spans`
//   })
// });
const ctxImpl = new CLSContext('zipkin');

const tracer = new Tracer({
  ctxImpl,
  recorder
});
exports.tracer = tracer
exports.zipkinRequest = wrapRequest(request, {tracer, serviceName: 'serviceName'});
