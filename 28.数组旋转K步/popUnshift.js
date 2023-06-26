

// 复杂度高
const arr = [1, 2, 3, 4, 5, 6, 7]
const k = 3

function reverseK(target = [], k = 0) {
	for(let i = 0; i < k; i++) {
		target.unshift(target.pop())
	}

	return target
}

const result = reverseK(arr, k)
console.log(result)