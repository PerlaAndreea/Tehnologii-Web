/*function format(s, formatSpec) {
    let modified = s
    for (let prop in formatSpec) {
        if (s.indexOf("{" + prop + "}") !== -1) {
            modified = modified.replace("{" + prop + "}", formatSpec[prop])
        }
    }


    return modified
}

console.log(format("i am {name} and i am a {role}", {
    name: "jim", role: "programmer"
}))*/

String.prototype.format = function(formatSpec) {
    let modified = this
    for (let prop in formatSpec) {
        if (this.indexOf("{" + prop + "}") !== -1) {
            modified = modified.replace("{" + prop + "}", formatSpec[prop])
        }
    }


    return modified
}

console.log("i am {name} and i am a {role}".format({
    name: "jim", role: "programmer"
}))