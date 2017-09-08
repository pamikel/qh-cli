module.exports = {
	formatURL: (url) => {
		let t1, t2 = url
		if (url) {
			do {
	      t1 = t2
	      t2 = decodeURI(t1)
	    } while (t2 !== t1)
	    return encodeURI(t1)
		}
		return url
	}
}
