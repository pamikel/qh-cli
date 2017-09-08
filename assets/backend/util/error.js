const {
	Code,
	CodeMsg,
	StatusCode
} = require('../config/resource')

class Error {
	constructor(status, code, msg) {
		this.status = status || StatusCode.Error
		this.code = code || Code.Error
		this.msg = msg || CodeMsg[code] || CodeMsg[Code.Error]
	}
}

module.exports = (status, code, msg) => {
	return new Error(status, code, msg)
}