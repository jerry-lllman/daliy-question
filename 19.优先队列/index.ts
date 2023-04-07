class Heap {

  data: number[]

	constructor(data = []) {
		this.data = data

		for (let i = (data.length >> 1) - 1; i >= 0; i--) {
			this.shiftDown(i)
		}
	}

	compare = (a: number, b: number) => this.data[a] - this.data[b] < 0

	swap = (a: number, b: number) => [this.data[a], this.data[b]] = [this.data[b], this.data[a]]

	shiftDown(index: number) {
		const lastIndex = this.data.length - 1
		while (index * 2 + 1 <= lastIndex) {
			let leftIndex = index * 2 + 1
			let rightIndex = leftIndex + 1
			let tempIndex = index
			if (tempIndex < lastIndex && this.compare(leftIndex, tempIndex)) {
				tempIndex = leftIndex
			}
			if (tempIndex < lastIndex && this.compare(rightIndex, tempIndex)) {
				tempIndex = rightIndex
			}

			if (tempIndex === index) return
			this.swap(tempIndex, index)
			index = tempIndex
		}
	}

	shiftUp(index: number) {
		while (index > 0) {
			const parentIndex = index >> 1
			if (this.compare(parentIndex, index)) {
				this.swap(parentIndex, index)
				index = parentIndex
			} else {
				return
			}
		}
	}

	pop() {
		if (!this.data.length) return undefined
		const res = this.data[0]
		const last = this.data.pop()!
		if (this.data.length > 0) {
			this.data[0] = last
			this.shiftDown(0)
		}
		return res
	}

	push(value: number) {
		this.data.push(value)
		this.shiftUp(this.data.length - 1)
	}

	peek() {
		return this.data[0]
	}
}
