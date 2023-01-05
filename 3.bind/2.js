
Function.prototype.myBind = function (target) {
	const that = this
	const argv = [...arguments].slice(1)

	return function () {
		that.apply(target, argv.concat([...arguments]))
	}
}

function a(...rest) {
	console.log(this, ...rest)
}

const obj = {
	x: 1
}

const b = a.myBind(obj, 1, 2)

b(3, 4)
b(5, 6)