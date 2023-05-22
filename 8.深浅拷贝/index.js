

function deepClone(initialTarget) {
	const map = new WeakMap()
	function internalClone(target) {
		// 边界条件1 非引用类型直接返回
		if (!(target instanceof Object)) {
			return target
		}

		// 边界条件2 已存在 map 里面的值直接返回该值
		if (map.has(target)) {
			return map.get(target)
		}

		let result
		// 根据不同的类型进行拷贝
		if (Array.isArray(target)) {
			result = []
		} else if (typeof target === 'function') {
			result = function(...args) {
				return target.apply(this, args)
			}
		} else if (target instanceof Date) {
			result = new Date(target)
		} else if (target instanceof RegExp) {
			result = new RegExp(target.source, target.flags)
		} else {
			result = {}
		}

		map.set(target, result)

		for (const key in target) {
			if (target.hasOwnProperty(key)) {
				result[key] = internalClone(target[key])
			}
		}

		return result
	}
	return internalClone(initialTarget)
}

const obj = {
	a: 1,
	b: {
		b1: 1,
	},
	f: () => { console.log(this) },
	d: new Date(),
	e: /^d/i
}

const copy = deepClone(obj) 

console.log(copy.e.test(1))
copy.f()
