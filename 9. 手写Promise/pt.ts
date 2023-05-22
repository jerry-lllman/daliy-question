
class TPromise {

	status: 'pending' | 'fulfilled' | 'rejected' = 'pending'
	value: any
	reason: any
	private resolveCallbacks: Function[] = []
	private rejectCallbacks: Function[] = []

	constructor(execute: (resolve: any, reject: any) => void) {
		try {
			execute(this.resolveHandle, this.rejectHandle)
		} catch (error) {
			this.rejectHandle(error)
		}
	}

	private resolveHandle = (value: any) => {
		if (this.status === 'pending') {
			this.status = 'fulfilled'
			this.value = value
			this.resolveCallbacks.forEach(callback => callback(this.value))
		}
	}

	private rejectHandle = (reason: any) => {
		if (this.status === 'pending') {
			this.status = 'rejected'
			this.reason = reason
			this.rejectCallbacks.forEach(callback => callback(this.reason))
		}
	}

	then(successFn: any, errorFn?: any) {
		successFn = typeof successFn === 'function' ? successFn : value => value
		errorFn = typeof errorFn === 'function' ? errorFn : reason => reason

		if (this.status === 'pending') {
			return new TPromise((resolve, reject) => {
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
							const errorFnValue = errorFn(this.reason)
							reject(errorFnValue)
						} catch (error) {
							reject(error)
						}
					})
				})
			})
		}

		if (this.status === 'fulfilled') {
			return new TPromise((resolve, reject) => {
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

		if (this.status === 'rejected') {
			return new TPromise((resolve, reject) => {
				queueMicrotask(() => {
					try {
						const errorFnValue = errorFn(this.reason)
						reject(errorFnValue)
					} catch (error) {
						reject(error)
					}
				})
			})
		}
	}

	catch(errorFn: (reason: any) => void) {
		return this.then(null, errorFn)
	}
}