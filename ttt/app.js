const express = require('express')
const path = require('path')
const {morgan, morgan_immediate} = require('./middleware/customMadeMorgan')
const {zipkin} = require('./middleware/zipkin.js')
const {errLogger} = require('./util/log')
const bodyParser = require('body-parser')
const cors = require('./middleware/cors')
const {StatusCode, Code, CodeMsg} = require('./config/resource')
const uuid = require('node-uuid')

const routes = require('./routes/api/index.js')

const app = express()

function assignReqId (req, res, next) {
  req.id = uuid.v4()
  next()
}
app.use(zipkin)
app.use(assignReqId)
app.use(morgan)
app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({limit: '10mb',extended: false }))
app.use(morgan_immediate)
app.use(cors)

app.use('/', routes)

// for slb health check
app.use('/healthCheck', (req, res) => res.end('ok'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  errLogger.error(err)
  res.status(err.status || StatusCode.ERROR)
  return res.send({
    code: err.code || Code.ERROR,
    errorMessage: err.msg || CodeMsg[err.code] || CodeMsg[Code.ERROR],
    data: err.data || null
  })
})

module.exports = app
