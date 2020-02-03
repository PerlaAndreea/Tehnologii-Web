import React from 'react';
import { AddStudent } from './AddStudent';

export class StudentList extends React.Component {
    constructor(){
        super();
        this.state = {
            students: []
        };

        this.add = (student) => {
            this.state.students.push(student)
            console.log(this.state.students)
        }
    }

    render(){
        return (
            <div>
               <AddStudent onAdd={this.add}/>
            </div>
        )
    }
}