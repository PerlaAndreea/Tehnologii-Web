import React from 'react';
import AddCar from './AddCar';

export class CarList extends React.Component {
    constructor(){
        super();
        this.state = {
            cars: []
        };

        this.add = (car) => {
            this.state.cars.push(car);
        }
    }   

    render(){
        return (
            <div>
                A list of cars :P
                {
                    this.state.cars.map((e, i) => 
                        <div>Car make: {e.make}, category: {e.category}, Price: {e.price} </div>
                    )
                }
                <AddCar onAdd={this.add}/>
            </div>
        )
    }
}