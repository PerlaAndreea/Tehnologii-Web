import React from 'react';

export class AddEmployee extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            surname: '',
            experience: ''
        };

        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name] : evt.target.value
            })
        }

    }

    addEmployee = () => {
        let employee = {
            name: this.state.name,
            surname: this.state.surname,
            experience: this.state.experience
        };
        this.props.onAdd(employee);
    }

    render(){
        return (
            <div>
                <input type="text" id="name" name="name" placeholder="name" onChange={this.handleChange}/>
                <input type="text" id="surname" name="surname" placeholder="surname" onChange={this.handleChange}/>
                <input type="text" id="experience" name="experience" placeholder="experience" onChange={this.handleChange}/>

                <input type="button" id="add employee" value="add employee" onClick={this.addEmployee}/>
            </div>
        )
    }
}

export default AddEmployee;