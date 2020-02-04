import React from 'react';
import AddEmployee from './AddEmployee';

export class EmployeeList extends React.Component {
    constructor(){
        super();
        this.state = {
            employees: []
        };

        this.add = (employee) => {
            this.state.employees.push(employee)
        }
    }

    render(){
        return(
            <div>
                
                <AddEmployee onAdd={this.add}/>
            </div>
        )
    }
}

export default EmployeeList;