import React, { Component } from 'react'

class CompanyDetails extends Component{
    constructor(props) {
        super(props)

        this.cancel = () => {
            this.props.onCancel()
        }
    }

    render() {
        let {item} = this.props
        return (
            <div> Company details: {item.name}, {item.employees}, {item.revenue}

            <input type="button" id="cancel" value="cancel" onClick={this.cancel}/>
            
            </div>
        )
    }
}

export default CompanyDetails
