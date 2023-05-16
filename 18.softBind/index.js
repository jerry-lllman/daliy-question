function softBind(target, ...preParams) {

	function bound(...params) {
		const ctx = (!this || (this === (global||window))) ? target : fn
		fn.apply(ctx, preParams.concat(params))
	}

	Object.setPrototypeOf(bound, fn.prototype)

	return bound
}

function fn(b, c, d, e) {
	console.log(this.a, b, c, d, e)
}

const obj = {
	a: 1
}

const softFn = softBind(fn, obj, 2, 3)

softFn(4, 5)