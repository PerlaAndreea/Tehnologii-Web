function calculateFrequencies(input, stopWords){
    // check if input is a string
    if (typeof input !== 'string') {
        throw new Error('Input should be a string');
    }

    if (stopWords.filter(element => typeof element !== 'string').length > 0) {
        throw new Error('Invalid dictionary format');
    }

    // split the input into a vector, separate by white-space
    let words = input.split(' ');

    // get how many OK words we have in total
    let totalWords = 0;
    for (let i = 0; i < words.length; ++i) {
        if (checkIfInStopWords(words[i], stopWords)) {
            ++totalWords;
        }
    }

    //console.log('Total OK words: ' + totalWords);

    // get each word's frequency
    let frequency = [];

    // first assign each frequency with 0
    for (let i = 0; i < words.length; ++i) {
        if (checkIfInStopWords(words[i], stopWords)) {
            // make sure the specific word is OK to use -> not present in the stopWords array
            frequency[words[i]] = 0;
        }
    }

    // now get the actual OK words frequency
    for (let i = 0; i < words.length; ++i) {
        if (checkIfInStopWords(words[i], stopWords)) {
            // make sure the specific word is OK to use -> not present in the stopWords array
            ++frequency[words[i]];
        }
    }

    //console.log('Frequency: ');
    //console.log(frequency);

    let dictionary = {};
    // now to calculate relativeFrequency and construct our dictionary that needs to be returned
    for (let i = 0; i < words.length; ++i) {
        if (checkIfInStopWords(words[i], stopWords)) {
            let relativeFrequency = (totalWords - frequency[words[i]]) / totalWords;
            
            let theKey = words[i].toLowerCase(); // !!!!!!!!!!!
            let value = relativeFrequency;

            dictionary[theKey] = value;
        }
    }

    return dictionary;
}

function checkIfInStopWords(word, stopWords) {
    for (let i = 0; i < stopWords.length; ++i) {
        if (word.toUpperCase() === stopWords[i].toUpperCase())
        return false;
    }

    return true;
}

const app = {
    calculateFrequencies
};


const input1 = 'unforseen problems'
const input2 = 'a cat on the roof'
const input3 = 'The Cat on the Roof'

const dictionary0 = ['a', 10]
const dictionary1 = ['a', 'the', 'on']

console.log(calculateFrequencies(input3, dictionary1));

module.exports = app;