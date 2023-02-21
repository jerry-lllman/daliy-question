## 浅拷贝

实现浅拷贝有几种方式
1. Object.assign
2. {...object} or [...array]
3. 封装函数通过遍历属性实现浅拷贝

```javascript
const obj = {
	a: 1,
	b: 2,
	c: { 
		d: 3
	}
}

function clone(target) {
	if (typeof target !== 'object' || target === null) return target
	if (Array.isArray(target)) {
		return target.map(item => item)
	}
	const newValue = {}
	if (typeof target === 'function') return newValue

	Object.keys(target).forEach(key => {
		newValue[key] = target[key]
	})
	return newValue
}

```


## 深拷贝

1. JSON.parse(JSON.stringify(object))。简单方便，但是遇到函数、undefined、symbol 值时，属性会丢失。遇到对象中存在循环引用时会出错。以下是 JSON 支持的数据类型：

* object
* array
* string
* number
* "true"
* "false"
* "null"

2. 使用`MessageChannel`解决循环引用问题。前提是对象内不包含函数类型的属性。
```javascript
function structuralClone(obj) {
	return new Promise(resolve => {
		const {port1, port2} = new MessageChannel()
		port2.onmessage = ev => resolve(ev.data)
		port1.postMessage(obj)
	})
}

var obj = {
	a: 1,
	b: { 
		c: 2
	}
}

obj.b.d = obj.b

const obj2 = await structuralClone(obj)

```

3. 递归手写`deepClone`。可能存在爆栈的情况
```javascript
let map = new WeakMap()

function deepClone(target) {
	if (target instanceof Object) {
		if (map.has(target)) return map.get(target)

		let result
		if (Array.isArray(target)) {
			result = []
		} else if (typeof target === 'function') {
			result = function() {
				return obj.apply(this, arguments)
			}
		} else if (target instanceof RegExp) {
			result = new RegExp(target.source, target.flags)
		} else if (target instanceof Date) {
			result = new Date(target)
		} else {
			result = {}
		}

		let desc = Object.getOwnPropertyDescriptors(target)
		let clone = Object.create(Object.getPrototypeOf(target), desc)
		map.set(target, clone)
		for (let key in target) {
			if (target.hasOwnProperty(key)) {
				result[key] = deepClone(target[key])
			}
		}
		return result
	}


	return target
}

```
