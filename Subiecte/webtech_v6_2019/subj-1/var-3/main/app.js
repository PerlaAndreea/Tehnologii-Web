 /*
 - funcția capitalize primește ca parametrii un string și un array
 - dicționarul conține o serie de termeni
 - in textul ințial cuvintele sunt separate de spațiu
 - fiecare termen din dicționar trebuie să apară capitalizat în rezultat
 - rezultatul este un string nou, fără modificarea celui inițial
 - dacă textul nu este un string sau dicționarul nu este un array de string-uri se va arunca o excepție (mesajul TypeError)
*/

/*
 - the capitalize function receives as parameters a string and an array
 - the dictionary (the array) contains a series of words
 - in the initial text the words are separated by space
 - each dictionary term has to appear capitalized in the result
 - the result is a new string without modifying the initial one
 - if the text is not string or the dictionary not an array of strings an exception is thrown (message is TypeError)
*/

function capitalize(text, dictionary){
	// check if text is a string
	if (typeof text !== 'string') {
		throw new Error('TypeError');
	}

	// check if dictionary is an array and has string elements
	if (!Array.isArray(dictionary) || dictionary.filter(word => typeof word !== 'string').length > 0) {
		throw new Error('TypeError');
	}

	let words = text.split(' ');
	dictionary.forEach(dictionaryWord => {
		if (words.indexOf(dictionaryWord) !== -1) {
			let index = words.indexOf(dictionaryWord);
			
			let copy = words[index][0].toUpperCase();
			for (let i = 1; i < words[index].length; ++i) {
				copy += words[index][i];
			}
			words[index] = copy;

		}
	});

	let output = '';
	words.forEach(word => {
		output += word + ' ';
	});

	return output.trim();
}

console.log(capitalize('this is a text', ['text', 'this']));



module.exports.capitalize = capitalize