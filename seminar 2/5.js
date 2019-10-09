let sampleArray = [1, 2, 3, 4, 5]

let map = (a, t) => {
    let results = []
    for (let e of a) {
        results.push(t(e))
    }

    return results
}


console.log(map(sampleArray, (x) => x * 2))