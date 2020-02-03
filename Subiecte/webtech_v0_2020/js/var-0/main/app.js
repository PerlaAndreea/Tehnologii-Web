function bowdlerize(input, dictionary){
    // check if input is a string
    if (typeof input !== 'string') {
        //console.log('Input should be a string');
        throw new Error('Input should be a string');
    }

    // check if dictionary contains only strings
    if (dictionary.filter(element => typeof element !== 'string').length > 0) {
        //console.log('Invalid dictionary format')
        throw new Error('Invalid dictionary format');
    }
    
    let newInput = '';
    let output = '';
    let words = input.split(' ');

    for (let i = 0; i < words.length; ++i) {
        for (let j = 0; j < dictionary.length; ++j) {
            if (words[i].toUpperCase() === dictionary[j].toUpperCase()) {
                //console.log(words[i].toUpperCase() + " " + dictionary[j].toUpperCase());

                newInput += words[i][0];

                let wordLength = words[i].length;
                for (let k = 0; k < wordLength - 2; ++k) {
                    newInput += '*';
                }

                newInput += words[i][wordLength - 1];
                words[i] = newInput;
            }
            newInput = '';
        }
        output += words[i] + ' ';
    }
    newInput = output.trim();
    return newInput;
}

const app = {
    bowdlerize
};

input = 'This is my input';
dictionary = ['something', 'yeah'];

let test = 'test';
console.log(test.trim());

const input1 = 'Lorem ipsum dolor sit amet consectetur adipiscing elit';
const dictionary1 = ['ipsum', 'elit'];

let vector = ['aa', 'bb', 'cc', 'ddd'];
vector[vector.indexOf('bb')] = 'schimbat haha';
console.log(vector);


console.log(bowdlerize(input1, dictionary1));



module.exports = app;