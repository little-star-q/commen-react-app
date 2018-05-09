import React from 'react';
import {Component} from 'react-dom'
class Input extends Component {
    constructor(){
        super()
        this.state = {
            number: 0,
        }
    }

    handleChange(event){
        this.setState({number: event.target.value})
        this.props.onChange(event.target.value)
    }
    render () {
        return (
            <div>
                <input type='number' onChange={this.handleChange.bind(this)} value={this.state.number}/>
            </div>
        )
    }
}
//{(this.props.number)*100.toFixed(2)}%
class PercentageShower extends Component {
    render () {
        let num = this.props.number
        num = (num*100).toFixed(2)
        num = num + '%'
        return (
            <div>{num}</div>
        )
    }
}

class PercentageApp extends Component {
    constructor(){
        super()
        this.state = {
            number: 0
        }
    }
    handleInput(number){
        this.setState({
            number: number
        })
    }
    render () {
        return (
            <div>
                <Input onChange={this.handleInput.bind(this)}/>
                <PercentageShower number={this.state.number}/>
            </div>
        )
    }
}

export default PercentageApp