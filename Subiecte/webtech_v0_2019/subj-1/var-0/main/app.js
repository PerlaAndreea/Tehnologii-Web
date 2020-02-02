/*
 - funcția distance primește ca parametrii două array-uri
 - fiecare element poate apărea cel mult o dată într-un array; orice apariții suplimentare sunt ignorate 
 - distanța dintre cele 2 array-uri este numărul de elemente diferite dintre ele
 - dacă parametrii nu sunt array-uri se va arunca o excepție ("InvalidType")
*/
/*
 - the distance function receives as parameters two arrays
 - each element can appear in each array at most once; any duplicates are ignored
 - the distance between the 2 arrays is the number of different elements between them
 - if the parameters are not arrays an exception is thrown ("InvalidType")
*/

function distance(first, second){
	// check if we have arrays
	if (!Array.isArray(first) || !Array.isArray(second)) {
		throw new Error('InvalidType');
	} else {
		// remove the duplicate values from the arrays
		first = first.filter((element, index) => first.indexOf(element) === index);
		second = second.filter((element, index) => second.indexOf(element) === index);

		// filter the arrays and get the difference between them
		let unique1 = first.filter(element => second.indexOf(element) === -1);
		let unique2 = second.filter(element => first.indexOf(element) === -1);

		// concatenate the arrays and get their length (similar to: unique1.length + unique2.length);
		return (unique1.concat(unique2)).length;
	}
}


module.exports.distance = distance