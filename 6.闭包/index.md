# 闭包

闭包的正确定义：<strong>假如一个函数能访问外部的变量，那么就形成了一个闭包，而不是一定要返回一个函数。</strong>

```javascript
let a = 1
// 产生闭包
function fn() {
	console.log(a)
}

function fn1() {
	let a = 1

	// 产生闭包
	return () => {
		console.log(a)
	}
}

const fn2 = fn1()
fn2()

```

闭包的作用：<strong>为了能重复利用变量，并且能避免变量污染</strong>

### 常见考点

有几种方式能得到想要的答案
```javascript
for (var i = 0; i < 10; i++) {
	setTimeout(() => {
		console.log(i)
	})
}
```

1. 将`var`修改成`let`
2. 利用闭包每次`console.log`都形成单独的作用域
```javascript
for (var i = 0; i < 10; i++) {
	setTimeout(((i) => () => console.log(i))(i))

	// function fn(i) {
	// 	return () => {
	// 		console.log(i)
	// 	}
	// }
	// setTimeout(fn(i))
}
```