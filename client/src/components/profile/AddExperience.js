import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addExperience} from '../../actions/ProfileActions';
import {withRouter} from 'react-router-dom';
import TextField from '../layout/TextField';

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
        e.preventDefault();

        let experienceData = {
            company: this.state.company,
            position: this.state.position,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            location: this.state.location,
            description: this.state.description,
        }

        addExperience(experienceData, this.props.history);
    }

    toggleCurrent(e){
        e.preventDefault();
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
                onChange={this.handleChange}
                placeholder="Enter the company/institution name"
                />
                <TextField
                name="position"
                value={this.state.position}
                onChange={this.handleChange}
                placeholder="What was your position?"
                required
                />
                <TextField
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                placeholder="Describe what you did."
                required
                />
                <TextField
                name="location"
                value={this.state.location}
                onChange={this.handleChange}
                placeholder="Where was this?"
                />
                <TextField
                name="from"
                value={this.state.from}
                onChange={this.handleChange}
                placeholder="MM/DD/YYYY"
                required
                />
                <TextField
                name="to"
                value={this.state.to}
                onChange={this.handleChange}
                placeholder="MM/DD/YYYY"
                disabled={this.state.disabled}
                required
                />
                <button onClick={this.toggleCurrent}>Are you currently pursuing this experience?</button>
                <br></br>
                <input type="submit" value="Submit" className="btn btn-success"></input>
                </form>
            </div>
        )
    }
}

export default connect(null, {})(withRouter(AddExperience))
