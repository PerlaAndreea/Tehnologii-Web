function genCheckPrime() {
    let cache = [2, 3]

    let checkAgainstChache = (n) => {
        for (let e of cache) {
            if (! (n % e)) {
                return false;
            } 

        }
        return true;
    }

    return (n) => {
        let found = cache.indexOf(n) !== -1
        if (found) {
            return true
        } else {
            if (n < cache[cache.length - 1]) {
                return false;
            } else {
                for (let i = cache[cache.length - 1] + 1; i < Math.sqrt(n); ++i) {
                    if (checkAgainstChache(i)) {
                        cache.push(i)
                    }
                }
                
                console.log('CACHE: ')
                console.log(cache)
                console.log('INPUT NUMBER: ' + n)
                return checkAgainstChache(n) + "\n"
            }
        }
    }
}

let checkPrime = genCheckPrime()
console.log(checkPrime(88))
console.log(checkPrime(17))
console.log(checkPrime(47))
console.log(checkPrime(225))
