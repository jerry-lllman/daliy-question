
// Promise.race 返回一个新的 Promise，该 Promise 将会和数组中的第一个 Promise 状态保持一致。
// 也就是说，如果数组中的第一个 Promise 成功，Promise.race 将会返回成功的 Promise，反之如果数组中的第一个 Promise 失败，Promise.race 将会返回失败的 Promise。
function PromiseRace(requests) {
	return new Promise((resolve, reject) => {
		requests.forEach(request => {
			request.then(resolve).catch(reject)
		})
	})
}