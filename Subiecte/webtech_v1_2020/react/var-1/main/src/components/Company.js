import React, { Component } from 'react'

class Company extends Component {
	constructor(props){
		super(props)
    
    let {item} = this.props
    
    this.state = {
			name : item.name,
			employees : item.employees,
      revenue : item.revenue,
      isEditing : false
    }
    
		this.handleChange = (evt) => {
			this.setState({
				[evt.target.name] : evt.target.value
      })      
    }
    
    this.handleEditClick = () => {
      this.setState({
        isEditing : true
      })
    }

    this.handleCancelClick = () => {
      this.setState({
        isEditing : false
      })
    }

    this.handleSaveClick = () => {
      this.props.onUpdate(item.id, {
        name : this.state.name,
        employees : this.state.employees,
        revenue : this.state.revenue
      })

      this.setState({
        isEditing : false
      })
    }
	}
  render() {
    let {item} = this.props
    if (this.state.isEditing){
      return (
        <div>
          <input type="text" id="name" placeholder="name" name="name" defaultValue={item.name} onChange={this.handleChange}/>
          <input type="text" id="employees" placeholder="employees" name="employees" defaultValue={item.employees} onChange={this.handleChange}/>
          <input type="text" id="revenue" placeholder="revenue" name="revenue" defaultValue={item.revenue} onChange={this.handleChange}/>

          <input type="button" value="save" onClick={this.handleSaveClick}/>
          <input type="button" value="cancel" onClick={this.handleCancelClick}/>						
        </div>
      )
    }
    else{
      return (
        <div>
          Name {item.name} with {item.employees} employees {item.revenue} revenue
          <input type="button" value="edit" onClick={this.handleEditClick}/>        
        </div>
      )
    }
  }
}

export default Company
