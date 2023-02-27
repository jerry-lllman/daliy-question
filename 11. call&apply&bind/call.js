Function.prototype.myCall = function(target, ...args) {
	target.fn = this
	const res = target.fn(...args)
	Reflect.deleteProperty(target, 'fn')
	return res
}


function test(arg) {
	console.log(this.num, arg)
}

var num = 1

var obj = {
	num: 10
}

test.myCall(obj, 100)
// apply 实现一致，使用不同
// test.myApply(obj, [1, 2, 3])