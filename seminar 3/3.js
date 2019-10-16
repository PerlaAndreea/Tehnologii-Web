//i will be a little module

const doStuff = () => {
    console.log("I am doing module stuff")
}

class Robot {
    constructor(robotname) {
        this.robotname = robotname
    }

    move() {
        console.log(`${this.robotname} is moving`)
    }
}


module.exports = {
    doStuff, Robot
}