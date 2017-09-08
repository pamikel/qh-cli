const log4js = require('log4js')
const {tracer={id:{}}} = require('./zipkin.js')

log4js.configure('./config/log4js.json')

class LogService {
	constructor(tag) {
		this.logger = log4js.getLogger(tag)
		this._setBaseMethods()
	}

	_setBaseMethods() {
		let that = this
		that.instanceSource = {
			severity: [
				'ALL',
				'DEBUG',
				'ERROR',
				'FATAL',
				'INFO',
				'OFF',
				'TRACE',
				'WARN'
			]
		}

		for (let key in that.instanceSource) {
			that.instanceSource[key].forEach((severity, index) => {
				that[severity.toLowerCase()] = (...args) => that._defaultLogger(severity, ...args)
			})
		}
	}
	_defaultLogger(severity, data, className) {
		const info = {
			timestamp: new Date().getTime(),
			severity: severity,
			trace: tracer.id.traceId,
			span:tracer.id.spanId,
			parent:tracer.id.parentId,
			service: 'serviceName',
			class: className,
			rest: data
		}

		this.logger[severity.toLowerCase()](JSON.stringify(info))
	}
}

module.exports = {
	appLogger: new LogService('app'),
	errLogger: new LogService('err'),
	dbLogger: new LogService('db'),
	thirdLogger: new LogService('third')
}