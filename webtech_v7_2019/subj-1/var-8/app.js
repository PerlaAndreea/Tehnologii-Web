function addTokens(input, tokens){
    // check if input is a string
    if (typeof input !== 'string') {
        throw new Error('Invalid input');
    }

    // check input length
    if (input.length < 6) {
        throw new Error('Input should have at least 6 characters');
    }

    // check tokens format
    if (tokens.filter(token => token.tokenName === undefined || typeof token.tokenName !== 'string').length > 0) {
        throw new Error('Invalid array format');
    }

    if (!input.includes('...')) {
        return input;
    } else {
        let words = input.split(' ');
        let tokenIndex = 0;
        let output = '';
        words.forEach(word => {
            if (word.includes('...')) {
                word = word.replace('...', '${' + tokens[tokenIndex].tokenName + '}');
                ++tokenIndex;
            }
            output += word + ' ';
        });

        return output.trim();
    }
}

const app = {
    addTokens: addTokens
}

console.log(addTokens('Subsemnatul ...', [{tokenName: 'eu'}]));

module.exports = app;