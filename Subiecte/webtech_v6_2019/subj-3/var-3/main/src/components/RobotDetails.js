import React, { Component } from 'react'

class RobotDetails extends Component {
    constructor(props) {
        super(props)

        this.handleClick = () => {
            this.props.onCancel()
        }
    }

    render() {
        let {item} = this.props
        return (
            <div>
                Details: {item.name}. {item.type}, {item.mass}
                <input type="button" value="cancel" onClick={this.handleClick} />
            </div>
        )
    }
}

export default RobotDetails