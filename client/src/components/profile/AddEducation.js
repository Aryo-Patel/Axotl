import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addEducation} from '../../actions/ProfileActions';
import {withRouter} from 'react-router-dom';
import TextField from '../layout/TextField';

class AddEducation extends Component {
    constructor(props){
        super(props)

        this.state = {
            school: '',
            degree: '',
            from: '',
            to: '',
            current: false,
            fieldOfStudy: '',
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

        let educationData = {
            school: this.state.school,
            degree: this.state.degree,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            fieldOfStudy: this.state.fieldOfStudy,
            description: this.state.description,
        }
        console.log('onsubmit fired')

        addEducation(educationData, this.props.history);
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
            <div className = 'educationWrapper'>
                <form onSubmit={this.onSubmit}>
                <h1 className = "educ-header">Update your education info</h1>
                <TextField
                parentClassName = "educ educ-shool-name"
                name="school"
                value={this.state.school}
                onChange={this.handleChange}
                placeholder="Enter the school/institution name"
                required = {true}
                />
                <TextField
                name="degree"
                parentClassName = "educ educ-shool-degree"
                value={this.state.degree}
                onChange={this.handleChange}
                placeholder="What kind of degree did you receive?"
                required = {true}
                />
                <TextField
                name="description"
                parentClassName = "educ educ-shool-description"
                value={this.state.description}
                onChange={this.handleChange}
                placeholder="Describe what you studied and/or the institution."
                required = {true}
                />
                <TextField
                name="fieldOfStudy"
                parentClassName = "educ educ-shool-major"
                value={this.state.fieldOfStudy}
                onChange={this.handleChange}
                placeholder="What was your major/focus?"
                required = {true}
                />
                <TextField
                name="from"
                parentClassName = "educ date educ-school-from"
                value={this.state.from}
                onChange={this.handleChange}
                placeholder="MM/DD/YYYY"
                required = {true}
                />
                <TextField
                name="to"
                parentClassName = "educ educ-shool-to date"
                value={this.state.to}
                onChange={this.handleChange}
                placeholder="MM/DD/YYYY"
                disabled={this.state.disabled}
                required = {true}
                />
                <div className = "form-actions-educ">
                    <button className = "educ-current" onClick={this.toggleCurrent}>Are you currently pursuing this education?</button>

                    <input type="submit" className = "educ-submit" value="Submit" className="btn btn-success"></input>
                </div>

                </form>
            </div>
        )
    }
}

export default connect(null, {})(withRouter(AddEducation))
