
function testFunction(a, b, c) {
    for (let i = 0; i < 10000; ++i) {
        console.log(a + b + c)
    }
}

function getTimedFunction(f) {
    return function(...args) {
        let before = Date.now()
        
        f(...args)
        console.log(`${f.name} took ${Date.now() - before} milliseconds to run`)
    }
}

let timeTestFunction = getTimedFunction(testFunction)
timeTestFunction(1, 2, 3)