const arr = [1, 2, 3, 4, 5, 6, 7]
const k = 3

function reverseK(target = [], k = 0) {
	const len = target.length - k

	const left = target.slice(0, len)
	const right = target.slice(len)
	
	return right.concat(left)
}

const result = reverseK(arr, k)
console.log(result)