module.exports = {
	delay: (duration) => {
		return function(...args) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(...args)
				}, duration)
			})
		}
	}
}