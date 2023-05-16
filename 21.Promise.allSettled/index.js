

function PromiseAllSettled(promises) {
	const results = []
	return new Promise(resolve => {
		promises.forEach((promise, index) => {
			Promise.resolve(promise)
				.then(value => {
					results[index] = {
						status: 'fulfilled',
						value
					}
				})
				.catch(err => {
					results[index] = {
						status: 'rejected',
						reason: err
					}
				})
				.finally(() => {
					if (results.length === promise.length) {
						resolve(results)
					}
				})
		})
	})
}