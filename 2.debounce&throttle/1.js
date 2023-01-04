
function debounce(fn, delay) {
	let timer = null

	return function () {
		if (timer) clearTimeout(timer)

		timer = setTimeout(() => {
			fn.apply(this, arguments)
		}, delay)
	}

}

function throttle(fn, delay) {
	let lastTriggerTime = 0

	return function () {
		const nowTime = +new Date()

		if (nowTime - lastTriggerTime >= delay) {
			fn.apply(this, arguments)
			lastTriggerTime = nowTime
		}
	}
}


function throttlePlus(fn, delay) {
	let lastTriggerTime = 0
	let timer = null

	return function () {
		if (timer) clearTimeout(timer)

		const nowTime = +new Date()

		if (nowTime - lastTriggerTime < delay) {
			timer = setTimeout(() => {
				fn.apply(this, arguments)
				lastTriggerTime = nowTime
			}, delay)
		} else {
			fn.apply(this, arguments)
			lastTriggerTime = nowTime	
		}
	}
}