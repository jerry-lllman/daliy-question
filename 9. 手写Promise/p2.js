
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class BPromise {

	status = PENDING

	value

	reason

	resolveCallbacks = []
	rejectCallbacks = []

	constructor(execute) {
		const resolveHandle = (value) => {
			if (this.status === PENDING) {
				this.status = FULFILLED
				this.value = value
				this.resolveCallbacks.forEach(callback => callback(this.value))
			}
		}

		const rejectHandle = (reason) => {
			if (this.status === PENDING) {
				this.status = REJECTED
				this.reason = reason
				this.rejectCallbacks.forEach(callback => callback(this.reason))
			}
		}

		try {
			execute(resolveHandle, rejectHandle)
		} catch (error) {
			rejectHandle(error)
		}
	}

	then(successFn, failFn) {
		successFn = typeof successFn === 'function' ? successFn : value => value
		failFn = typeof failFn === 'function' ? failFn : reason => reason

		if (this.status === PENDING) {
			return new BPromise((resolve, reject) => {
				// 添加回调到队列中
				this.resolveCallbacks.push(() => {
					queueMicrotask(() => {
						try {
							const successFnValue = successFn(this.value)
							resolve(successFnValue)
						} catch (error) {
							reject(error)
						}
					})
				})

				this.rejectCallbacks.push(() => {
					queueMicrotask(() => {
						try {
							const failFnValue = failFn(this.reason)
							reject(failFnValue)
						} catch (error) {
							reject(error)
						}
					})
				})
			})
		}

		if (this.status === FULFILLED) {
			return new BPromise((resolve, reject) => {
				queueMicrotask(() => {
					try {
						const successFnValue = successFn(this.value)
						resolve(successFnValue)
					} catch (error) {
						reject(error)
					}
				})
			})
		}

		if (this.status === REJECTED) {
			return new BPromise((resolve, reject) => {
				queueMicrotask(() => {
					try {
						const failFnValue = failFn(this.reason)
						reject(failFnValue)
					} catch (error) {
						reject(error)
					}
				})
			})
		}
	}

	catch(failFn) {
		return this.then(null, failFn)
	}
}


const p = new BPromise((resolve, reject) => {
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

