
Function.prototype.myBind = function (target, ...preArgs) {

	const fn = this

	function boundFn(...args) {
		if (this instanceof boundFn) {
			return new fn(...preArgs, ...args)
		}

		return fn.apply(target, preArgs.concat(args))
	}

	Object.setPrototypeOf(boundFn.prototype, fn.prototype)

	Object.getOwnPropertyNames(fn).forEach(prop => {
		if (!boundFn.hasOwnProperty(prop)) {
			boundFn[prop] = fn[prop]
		}
	})

	return boundFn
}