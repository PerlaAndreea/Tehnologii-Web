let sampleString = 'the quick brown fox jumps over the lazy dog'

let getCount = (text) => {
    let words = text.split(' ')
    let result = { }
    for (let word of words) {
        if (word in result) {
            result[word]++
        } else {
            result[word] = 1;
        }
    }

    return result
}

let getCountLetters = (text) => {
    let words = text.split(' ')
    let result = { }

    for (let word of words) {
        for (var pos = 0; pos < word.length; ++pos) {
            if (word[pos] in result) {
                result[word[pos]]++
            } else {
                result[word[pos]] = 1
            }
        }
    }

    for (let key in result) {
        result[key] /= text.length
    } //transform in frecventa de distributie

    return result
}

let checkPrime = (number) => {
    console.log(`Is ${number} prime? -> `)
    for (var index = 2; index <= Math.sqrt(number); ++index) {
        if (number % index == 0)
            return false
    }

    return true
}

//console.log(getCountLetters(sampleString))
console.log(checkPrime(10))

//console.log(`${10} is ${checkPrime ? 'prime' : 'not prime'}`)