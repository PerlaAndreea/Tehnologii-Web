function distance(first, second){
	// check if we actually recieve arrays
	if (first.constructor != Array ||
			second.constructor != Array) {
				throw new Error('InvalidType');
			}
	else {
		// remove duplicates from the arrays
		first = first.filter((element, index) => first.indexOf(element) === index);
		second = second.filter((element, index) => second.indexOf(element) === index);

		// filter both of the arrays and get the difference between them
		let unq1 = first.filter((element) => second.indexOf(element) == -1);
		let unq2 = second.filter((element) => first.indexOf(element) == -1);

		// concatenate the arrays for the final result
		const unq = unq1.concat(unq2);
		return unq.length;

	}
}

module.exports.distance = distance

//console.log(distance([1, 2, 3, 4, 5],[1, 3, 8]))
try {
console.log(distance('a', []));
} catch (e) {
	console.error(e);
}