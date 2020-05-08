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
            <div>
                <form onSubmit={this.onSubmit}>
                <TextField
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder="Name of the hackathon."
                required
                />
                <TextField
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                placeholder="Describe what you did/built."
                required
                />
                <TextField
                name="location"
                value={this.state.location}
                onChange={this.handleChange}
                placeholder="Where was this?"
                />
                <TextField
                name="date"
                value={this.state.date}
                onChange={this.handleChange}
                placeholder="MM/DD/YYYY"
                />
                <br></br>
                <input type="submit" value="Submit" className="btn btn-success"></input>
                </form>
            </div>
        )
    }
}

export default connect(null, {})(withRouter(AddPreviousHackathon))
