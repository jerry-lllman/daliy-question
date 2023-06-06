function flat(list) {
	// 判断是否有嵌套的数组
	const isDeep = list.some(item => item instanceof Array)

	if (!isDeep) return list

	// 利用 Array.concat 做拍平 concat(1, [2, 3]) => [1, 2, 3]
	const res = Array.prototype.concat.apply([], list)

	// 递归拍
	return flat(res)
}

const res= flat([1,2,[3,4,[5,6,[7]], 12, 0], [39], [11, 43, [33]], 122])
