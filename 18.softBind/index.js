Function.prototype.softBind = function(target, ...preParams) {
	const fn = this

	function bound(...params) {
		const ctx = (!this || (this === (window || global))) ? target : this
		fn.apply(ctx, preParams.concat(params))
	}

	// 原方法的原型也需要copy一下
	bound.prototype = Object.create(fn.prototype)

	return bound
}