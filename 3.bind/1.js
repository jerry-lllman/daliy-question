
Function.prototype.myBind = function (target) {
	const that = this
	return function () {
		that.apply(target)
	}
}

function a() {
	console.log(this)
}

const obj = {
	x: 1
}

const b = a.myBind(obj)

b()