
function PromiseAll(promises) {
	const list = []
	return new Promise((resolve, reject) => {
		for (let i = 0; i < promises.length; i++) {
			Promise.resolve(promises[i]).then(value => {
				list.push(value)
				if (list.length === promises.length) {
					resolve(list)
				}
			}).catch(err => reject(err))
		}
	})

}
