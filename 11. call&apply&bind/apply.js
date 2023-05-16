

function apply(fn, target, params) {
	const fnName = 'fn' + Math.random().toString(32).slice(2)
	target[fnName] = fn

	const res = target[fnName](...params)
	Reflect.deleteProperty(target, fnName)

	return res
}

function fn(b, c) {
	console.log(this.a, b, c)
}

const obj = {
	a: 1
}

apply(fn, obj, [2, 3])