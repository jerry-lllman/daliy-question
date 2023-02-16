
function compose(...funcs) {
	if (funcs.length === 0) return arg => arg
	if (funcs.length === 1) return funcs[0]

	return funcs.reduce((a, b) => (...args) => a(b(...args)))
}


function fn1(arg) {
	console.log('fn1')
	return arg
}

function fn2(arg) {
	console.log('fn2')
	return arg
}

function fn3(arg) {
	console.log('fn2')
	return arg
}


const res = compose(fn1, fn2, fn3)('params')
