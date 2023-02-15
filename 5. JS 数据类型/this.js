
// 以下代码将输出什么？

const a = {
	b: 2,
	foo: function() {
		console.log(this.b)
	}
}

function b(foo) {
	foo()
}

b(a.foo)




// 答案是 function b(foo) { foo() }
