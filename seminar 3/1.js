class Robot {
    constructor(robotname) {
        this.robotname = robotname
    }

    move() {
        console.log(`${this.robotname} is moving`)
    }
}

class Weapon {
    constructor(description) {
        this.description = description
    }

    fire() {
        console.log(`${this.description} is firing`)
    }
}

class CombatRobot extends Robot {
    constructor(name) {
        super(name)
        this.weapons = []
    }

    addWeapon(w) {
        this.weapons.push(w)
    }

    fire() {
        for (let w of this.weapons) {
            w.fire()
        }
    }
}

let laser = new Weapon("pew pew laser")

let robo = new Robot("RoboDani")
robo.move() 

let combatRobot = new CombatRobot("CombatRobot")
combatRobot.addWeapon(laser)
combatRobot.fire()

Robot.prototype.fly = function() {
    console.log(`${this.robotname} is flying`)
}

combatRobot.fly()

let f0 = combatRobot.fly
f0()
f0.apply(combatRobot)
f0.call(combatRobot)