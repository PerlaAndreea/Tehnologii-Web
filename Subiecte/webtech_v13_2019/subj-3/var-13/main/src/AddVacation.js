import React from 'react';

export default class AddVacation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            destination: '',
            locationType: '',
            price: 0
        };

        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name] : evt.target.value
            })
        }
    }

    render(){
        return (
        <div>
            <input type="text" id="vacation-destination" name="destination" placeholder="vacation-destination" onChange={this.handleChange}/>
            <input type="text" id="vacation-location-type" name="locationType" placeholder="vacation-location-type" onChange={this.handleChange}/>
            <input type="text" id="vacation-price" name="price" placeholder="vacation-price" onChange={this.handleChange}/>

            <input type="button" id="add vacation" value="add vacation" onClick={this.handleAdd} />
        </div>
        );
    }

    handleAdd = () => {
        let item = {
            destination : this.state.destination,
            locationType : this.state.locationType,
            price : this.state.price
        }
        this.props.itemAdded(item);
    }
}