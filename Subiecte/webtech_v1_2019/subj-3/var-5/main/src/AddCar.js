import React from 'react';

export class AddCar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            make: '',
            model: '',
            price: ''
        }

        // handle changes to the input text-fields to get the input values
        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name] : evt.target.value
            })
        }

        this.handleClick = () => {
            this.addCar();
        }
    }

    addCar = () => {
        let car = {
            make: this.state.make,
            model: this.state.model,
            price: this.state.price
        };
        this.props.onAdd(car);
    }

    render(){
        return (
            <div>
                <input type="text" id="make" name="make" onChange={this.handleChange}/>
                <input type="text" id="model" name="model" onChange={this.handleChange}/>
                <input type="text" id="price" name="price" onChange={this.handleChange}/>

                <input type="button" value="add car" onClick={this.handleClick}/>
            </div>
        )
    }
}

export default AddCar;