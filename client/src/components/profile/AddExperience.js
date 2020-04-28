import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addExperience} from '../../actions/ProfileActions';
import {withRouter} from 'react-router-dom';
import {TextField} from '../layout/TextField';

class AddExperience extends Component {
    constructor(props){
        super(props)

        this.state = {
            company: '',
            position: '',
            from: '',
            to: '',
            current: false,
            location: '',
            description: '',
            disabled: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggleCurrent = this.toggleCurrent.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault

        let experienceData = {
            company: this.state.company,
            position: this.state.position,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            location: this.state.location,
            description: this.state.description,
        }

        this.props.addExperience(experienceData, this.props.history);
    }

    toggleCurrent(e){
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                <TextField
                name="company"
                value={this.state.company}
                onChange={this.state.handleChange}
                placeholder="Enter the company/institution name"
                />
                <TextField
                name="position"
                value={this.state.position}
                onChange={this.state.handleChange}
                placeholder="What was your position?"
                />
                <TextField
                name="description"
                value={this.state.description}
                onChange={this.state.handleChange}
                placeholder="Describe what you did."
                />
                <TextField
                name="location"
                value={this.state.location}
                onChange={this.state.handleChange}
                placeholder="Where was this?"
                />
                <TextField
                name="from"
                value={this.state.from}
                onChange={this.state.handleChange}
                placeholder="MM/DD/YYYY"
                />
                <TextField
                name="to"
                value={this.state.to}
                onChange={this.state.handleChange}
                placeholder="MM/DD/YYYY"
                disabled={this.state.disabled}
                />
                <button onClick={this.toggleCurrent}>Are you currently pursuing this experience?</button>
                </form>
            </div>
        )
    }
}

export default connect(null, {addExperience})(withRouter(AddExperience))
