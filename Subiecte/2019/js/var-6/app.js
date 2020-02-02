function applyBonus(employees, bonus) {
    // function needs to return a Promise
    return new Promise((resolve, reject) => {
        // check if bonus is a number
        if (typeof bonus !== 'number') {
            reject(new Error('Invalid input'));
        }

        // check if employees is an array and has the correct key-value pair
        if (!Array.isArray(employees) || employees.filter(element =>
            element.name === undefined || typeof element.name !== 'string'
            || element.salary === undefined || typeof element.salary !== 'number').length > 0) {
            reject(new Error('Invalid array format'));
        }

        // get the maximum salary from the employees
        const salaries = employees.map(employee => employee.salary);
        const max = Math.max(...salaries);

        // check the minBonus
        const minBonus = max * 0.1;
        if (bonus < minBonus) {
            reject('Bonus too small');
        }

        // deep copy employees -> test wants an employee array with the updated bonus
        const employeesWithBonus = employees.map(employee => JSON.parse(JSON.stringify(employee)));
        employeesWithBonus.forEach(employee => {
            employee.salary += bonus;
        });
        resolve(employeesWithBonus);
    });
}

let app = {
    applyBonus: applyBonus,
}

console.log(applyBonus([], 'asdf'));

module.exports = app;