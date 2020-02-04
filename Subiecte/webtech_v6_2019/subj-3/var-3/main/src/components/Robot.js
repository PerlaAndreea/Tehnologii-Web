import React, { Component } from 'react'

class Robot extends Component {
  constructor(props) {
    super(props)

    this.handleClick = () => {
      this.props.onSelect(this.props.item)
    }
  }

  render() {
  	let {item} = this.props
    return (
      <div>
  		Hello, my name is {item.name}. I am a {item.type} and weigh {item.mass}
      <input type="button" value="select" onClick={this.handleClick}/>
      </div>
    )
  }
}

export default Robot
