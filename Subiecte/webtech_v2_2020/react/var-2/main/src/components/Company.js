import React, { Component } from 'react'

class Company extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      isEditing : false,
      name : this.props.item.name,
      employees : this.props.item.employees,
      revenue : this.props.item.revenue
    }

    this.select = () => {
      this.props.onSelect(this.props.item)
    }
  }

  render() {
  	let {item} = this.props
    return (
      <div>
    		Name {item.name} with {item.employees} employees {item.revenue} revenue
        <input type="button" id="select" value="select" onClick={this.select}/>
      </div>
    )
  }
}

export default Company
