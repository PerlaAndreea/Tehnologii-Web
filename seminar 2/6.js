let dictionary = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog']

let sampleText = `
    best
    read
    on
    windy
    nights`

let checkAcrostih = (text) => {
    let candidate = text.split('\n').map((e) => e.trim()).filter((e) => e).map((e) => e[0]).join('')
    
    return dictionary.indexOf(candidate) !== -1
}

// b r o w n -> care exista in dictionar
//iau prima litera de la fiecare cuvand nevid
console.log(checkAcrostih(sampleText))