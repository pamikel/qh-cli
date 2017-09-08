const morgan = require('morgan')
const {appLogger} = require('../util/log')

morgan.token('input', (req, res) => {
	let str = ''
	if (req.body && Object.keys(req.body).length > 0) {
		str += ` body: ${JSON.stringify(req.body)}`
	}
	if (req.query && Object.keys(req.query).length > 0) {
		str += ` query: ${JSON.stringify(req.query)}`
	}
	if (req.params && Object.keys(req.params).length > 0) {
		str += ` params: ${JSON.stringify(req.params)}`
	}
	return str
})

morgan.token('output', (req, res) => {
	let str = ''
	if (res._returnData) {
		str += ` output: ${JSON.stringify(res._returnData)}`
	}
	return str
})

morgan.token('id', function getId (req) {
  return req.id
})

exports.morgan_immediate = morgan('begin :id :method :url :remote-addr :input', {
	stream: {
		write: (str) => {
			appLogger.info(str)
		}
	},
	immediate: true
})

exports.morgan = morgan('end :id :method :url :output :status - :response-time ms', {
	stream: {
		write: (str) => {
			appLogger.info(str)
		}
	}
})