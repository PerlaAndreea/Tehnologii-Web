import React from 'react';
import AddVacation from './AddVacation'

export default class VacationList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
          };

        this.itemAdded = (item) => {
            this.state.data.push(item);
        }
    }

    render() {
        return (
            <div>
                <AddVacation itemAdded={this.itemAdded} />
            </div>
        );
    }
}