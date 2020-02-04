import React, { Component } from 'react'
import RobotStore from '../stores/RobotStore'
import Robot from './Robot'

// TODO: adăugați posibilitatea de a filtra roboții după name și type
// filtrarea se face pe baza a 2 text input-uri și se produce la fiecare tastă apăsată

// TODO: add the possiblity to filter robots according to name and type
// filtering is done via 2 text inputs and happens whenever a key is pressed

class RobotList extends Component {
	constructor(){
		super()
		this.state = {
			robots : [],
			nameFilter : '',
			typeFilter : ''
		}

		this.handleChange = (evt) => {
			this.setState({
				[evt.target.name] : evt.target.value
			})
			
			console.log(evt.target.value);
			if (evt.target.name === 'nameFilter') {
				this.state.robots = this.state.robots.filter(robot => robot.name.includes(evt.target.value))
			}
			
			if (evt.target.name === 'typeFilter') {
				this.state.robots = this.state.robots.filter(robot => robot.type.includes(evt.target.value))
			}
		}
	}
	componentDidMount(){
		this.store = new RobotStore()
		this.setState({
			robots : this.store.getRobots()
		})
		this.store.emitter.addListener('UPDATE', () => {
			this.setState({
				robots : this.store.getRobots()
			})			
		})
	}
	render() {
		return (
			<div>
				{
					this.state.robots.map((e, i) => 
						<Robot item={e} key={i} />
					)					
				}
				<input type="text" id="nameFilter" name="nameFilter" placeholder="nameFilter" onChange={this.handleChange}/>
				<input type="text" id="typeFilter" name="typeFilter" placeholder="typeFilter" onChange={this.handleChange}/>
			</div>
		)
	}
}

export default RobotList
