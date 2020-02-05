function toCamelCase(input) {
  if (typeof input !== 'string' && !(input instanceof String)) {
    throw new Error('Input must be a string primitive or a string object');
  }

  input = replaceInInput(' ', input);
  input = replaceInInput('-', input);
  input = replaceInInput('_', input);

  return input;
}

function replaceInInput(separator, input) {
  let words = input.split(separator);
  let output = '';
  let stop = 0;
  words.forEach(word => {
    let newWord = '';
    if (stop == 0) {
      newWord += word[0].toLowerCase();

      for (let i = 1; i < word.length; ++i) {
        newWord += word[i];
      }
    } else {
      newWord += word[0].toUpperCase();

      for (let i = 1; i < word.length; ++i) {
        newWord += word[i];
      }
    }
    ++stop;
    output += newWord;
  });

  return output.trim();
}

const app = {
  toCamelCase: toCamelCase
}

console.log(toCamelCase(new String('a-small-cat')));

module.exports = app