Function.prototype.myBind = function (target, ...args) {
	return (...rest) => {
		return this.call(target, ...args, ...rest)
	}
}


function test(name, age) {
	console.log(this, name, age)
}


var obj = {
	name: 'obj'
}

var newFn = test.myBind(obj, '小明')

newFn(18)