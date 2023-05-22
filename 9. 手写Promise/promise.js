const p = new Promise((resolve, reject) => {
	setTimeout(() => {
		reject(100)
	}, 1000)
})

console.log(1)

p.then((res) => {
	console.log(res)
})

p.catch(err => {
	console.log('err 1', err)
	return err + 1
}).catch(err => {
	console.log('err 2', err)
})

console.log(2)
