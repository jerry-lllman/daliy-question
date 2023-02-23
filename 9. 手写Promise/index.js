

const PENDING = 'pending'
const REJECTED = 'rejected'
const FULFILLED = 'fulfilled'

class MyPromise {

	state = PENDING
	value = null
	resolvedCallbacks = []
	rejectedCallbacks = []

	constructor(execute) {
		try {
			execute(this.resolve, this.reject)
		} catch (error) {
			this.reject(error)
		}
	}

	resolve = (value) => {
		if (this.state === PENDING) {
			this.state = FULFILLED
			this.value = value
			this.resolvedCallbacks.forEach(cb => cb(this.value))
		}
	}

	reject = (value) => {
		if (this.state === PENDING) {
			this.state = REJECTED
			this.value = value
			this.rejectedCallbacks.forEach(cb => cb(this.value))
		}
	}

	then = (onFulfilled, onRejected) => {
		onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
		onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }

		if (this.state === PENDING) {
			this.resolvedCallbacks.push(onFulfilled)
			this.rejectedCallbacks.push(onRejected)
		}
		if (this.state === FULFILLED) {
			onFulfilled(this.value)
		}
		if (this.state === REJECTED) {
			onRejected(this.value)
		}
	}
	
}

new MyPromise((resolve, reject) => {
	setTimeout(() => resolve(1), 1000)
}).then(value => console.log(value))