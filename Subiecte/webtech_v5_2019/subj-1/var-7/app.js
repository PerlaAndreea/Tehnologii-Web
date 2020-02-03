function applyDiscount(vehicles, discount){
    // function needs to return a Promise
    return new Promise((resolve, reject) => {
        // check the type of discount
        if (typeof discount !== 'number') {
            reject(new Error('Invalid discount'));
        }

        // check vehicles format
        if (vehicles.filter(vehicle => vehicle.make === undefined || typeof vehicle.make !== 'string'
            || vehicle.price === undefined || typeof vehicle.price !== 'number').length > 0) {
                reject(new Error('Invalid array format'));
        }

        // get an array only with vehicle's price
        const prices = vehicles.map(vehicle => vehicle.price);
        const minPrice = Math.min(...prices);

        // check if discount is ok
        if (discount > minPrice * 0.5) {
            reject('Discount too big');
        }

        const vehiclesWithDiscount = vehicles.map(vehicle => JSON.parse(JSON.stringify(vehicle)));
        vehiclesWithDiscount.forEach(vehicle => {
            vehicle.price -= discount;
        })
        resolve(vehiclesWithDiscount)
    });
}

const app = {
    applyDiscount: applyDiscount
};

const vehicles = [
    {
        make: "Audi A5",
        price: 15000,
    },
    {
        make: "BMW X6",
        price: 30000,
    }
];

applyDiscount(vehicles, 10);

module.exports = app;