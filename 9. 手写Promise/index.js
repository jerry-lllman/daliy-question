
const PENDING = 'pending'
const REJECTED = 'rejected'
const FULFILLED = 'fulfilled'

class APromise {
	status = PENDING
	value
	reason

	resolveCallbacks = []
	rejectCallbacks = []

	constructor(execute) {

		const resolveHandle = value => {
			if (this.status === PENDING) {
				this.status = FULFILLED
				this.value = value
				this.resolveCallbacks.forEach(callback => callback(this.value))
			}
		}

		const rejectHandle = reason => {
			if (this.status === REJECTED) {
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
			return new APromise((resolve, reject) => {

				this.resolveCallbacks.push(() => {
					queueMicrotask(() => {
						try {
							const resolveValue = successFn(this.value)
							resolve(resolveValue)
						} catch (error) {
							reject(error)
						}
					})
				})

				this.rejectCallbacks.push(() => {
					queueMicrotask(() => {
						try {
							const failReason = failFn(this.reason)
							resolve(failReason)
						} catch (error) {
							reject(error)
						}
					})
				})

			})
		}

		if (this.status === FULFILLED) {
			// 需要支持链式调用
			return new APromise((resolve, reject) => {
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
			return new APromise((resolve, reject) => {
				queueMicrotask(() => {
					try {
						const failFnReason = failFn(this.reason)
						reject(failFnReason)
					} catch (error) {
						reject(error)
					}
				})

			})
		}
	}

	catch(errorFn) {
		return this.then(null, errorFn)
	}

}


const p = new APromise((resolve, reject) => {
	setTimeout(() => {
		resolve(100)
	}, 1000)
})

console.log(1)

p.then((res) => {
	console.log(res)
})

console.log(2)

