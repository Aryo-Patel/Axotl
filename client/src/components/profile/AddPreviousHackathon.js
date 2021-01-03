import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addPreviousHackathon} from '../../actions/ProfileActions';
import {withRouter} from 'react-router-dom';
import TextField from '../layout/TextField';

class AddPreviousHackathon extends Component {
    constructor(props){
        super(props)

        this.state = {
            name: '',
            location: '',
            description: '',
            date: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        let hackathonData = {
            name: this.state.name,
            date: this.state.date,
            location: this.state.location,
            description: this.state.description,
        }

        addPreviousHackathon(hackathonData, this.props.history);
    }


    render() {
        return (
            <div className = "educationWrapper">
                <form onSubmit={this.onSubmit}>
                <h1 className = "educ-header">Add to your past hackathons</h1>
                <TextField
                name="name"
                
                value={this.state.name}
                onChange={this.handleChange}
                placeholder="Name of the hackathon."
                parentClassName = "educ spacer"
                required = {true}
                />
                <TextField
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                placeholder="Describe what you did/built."
                parentClassName = "educ spacer"
                required = {true}
                />
                <TextField
                name="location"
                value={this.state.location}
                onChange={this.handleChange}
                placeholder="Where was this?"
                parentClassName = "educ spacer"
                required = {true}
                />
                <TextField
                name="date"
                value={this.state.date}
                onChange={this.handleChange}
                placeholder="MM/DD/YYYY"
                parentClassName = "educ spacer"
                required = {true}
                />
                <div className = "form-actions-educ">
                    <input type="submit" value="Submit" className="hackathon-button btn btn-success"></input>
                </div>
               
                </form>
            </div>
        )
    }
}

export default connect(null, {})(withRouter(AddPreviousHackathon))
