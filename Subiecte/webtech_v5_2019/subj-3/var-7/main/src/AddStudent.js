import React from 'react';

export class AddStudent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            surname: '',
            age: ''
        };

        this.handleChange = (evt) => {
            this.setState({
                [evt.target.name] : evt.target.value
            })
        }
    }

    addStudent = () => {
        let student = {
            name: this.state.name,
            surname: this.state.surname,
            age: this.state.age
        };
        this.props.onAdd(student);
    }

    render(){
        return (
            <div>
                <input type="text" id="name" name="name" onChange={this.handleChange}/>
                <input type="text" id="surname" name="surname" onChange={this.handleChange}/>
                <input type="text" id="age" name="age" onChange={this.handleChange}/>
                
                <input type="button" value="add student" onClick={this.addStudent}/>
            </div>
        )
    }
}