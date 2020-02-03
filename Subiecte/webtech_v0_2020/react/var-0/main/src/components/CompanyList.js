import React, { Component } from 'react'
import CompanyStore from '../stores/CompanyStore'
import Company from './Company';

class CompanyList extends Component {
	constructor(){
		super()
		this.state = {
			companies : []
		}

		this.delete = (id) => {
			this.store.deleteOne(id);
		}
	}
	componentDidMount(){
		this.store = new CompanyStore()
		this.setState({
			companies : this.store.getAll()
		})
		this.store.emitter.addListener('UPDATE', () => {
			this.setState({
				companies : this.store.getAll()
			})			
		})
	}
  render() {
    return (
      <div>
		  {
			  this.state.companies.map((element, index) =>
			  	<Company item={element} key={index} onDelete={this.delete}/>)
		  }
      </div>
    )
  }
}

export default CompanyList
