function textProcessor(input, tokens){
    // check if input is a string
    if (typeof input !== 'string') {
        throw new Error('Input should be a string');
    }

    // check the length of the input
    if (input.length < 6) {
        throw new Error('Input should have at least 6 characters');
    }

    // check tokens format
    if (tokens.filter(element => element.tokenName === undefined || element.tokenValue === undefined).length > 0) {
        throw new Error('Invalid array format');
    }

    // split the input into an array of words separated by white space
    let words = input.split(' ');
    let tokenIndex = 0;
    let output = '';
    for (let i = 0; i < words.length; ++i) {
        if (words[i][0] === '$'){
            let dollarValue = getDollarValue(words[i]);
            for (let j = 0; j < tokens.length; ++j) {
                if (dollarValue.includes(tokens[j].tokenName)) {
                    words[i] = tokens[j].tokenValue;
                }
            }
        }
        output += words[i] + ' ';
    }
    
    if (input[input.length - 1] === '.') {
        output = output.trim() + '.';
    }
    
    return output.trim();
}

function getDollarValue(word) {
    let value = ''
    for (let i = 0; i < word.length; ++i) {
        if (word[i] !== '$' && word[i] !== '}' && word[i] !== '{') {
            value += word[i];
        }
    }

    return value;
}

const app = {
    textProcessor: textProcessor
};

const input = "Hello ${name} from the other ${surname}.";
const tokens = [
    {
        tokenName: "name",
        tokenValue: "John"
    },
    {
        tokenName: "surname",
        tokenValue: "Doe"
    }
];

console.log(textProcessor(input, tokens));

module.exports = app;