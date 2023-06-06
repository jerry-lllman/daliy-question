
function isObject(obj) {
	return typeof obj === 'object' && obj !== null
}

function isEqual(obj1, obj2) {
	if (!isObject(obj1) || isObject(obj2)) return obj1 === obj2

	if (obj1 === obj2) return true

	if (Object.keys(obj1).length !== Object.keys(obj2).length) return false

	for (const key in obj1) {
		if (!isEqual(obj1[key], obj2[key])) return false
	}

	return true
}