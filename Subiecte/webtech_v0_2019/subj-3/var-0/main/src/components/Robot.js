import React, { Component } from 'react'

class Robot extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id : this.props.item.id,
            name : this.props.item.name,
            type : this.props.item.type,
            mass : this.props.item.mass
        }
        
        this.handleClick = () => {
            console.log('this.state.id: ' + this.state.id)
            this.props.onDelete(this.state.id)
        }
    }
    
    render() {
        return (
            <div>
                Robot name: {this.state.name}, type: {this.state.type}, mass: {this.state.mass}
                <input type="button" value="delete" onClick={this.handleClick}/>
            </div>
            )
    }
}

export default Robot