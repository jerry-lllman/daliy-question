void(async ()=> {
	function sleep(seconds) {
		return new Promise(resolve => setTimeout(resolve, seconds))
	}
	
	console.log(1)
	await sleep(3000)
	console.log(2);
})()