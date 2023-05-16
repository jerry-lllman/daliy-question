
function delay(fn, seconds, ...args) {
	return new Promise(resolve => {
		setTimeout(() => {
			Promise.resolve(fn(...args)).then(resolve)
		}, seconds)
	})	
}