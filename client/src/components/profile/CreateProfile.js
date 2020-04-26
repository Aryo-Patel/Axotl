import React, { Component } from 'react';
const fs = require('fs');
import TextField from '../layout/TestField';
import { createProfile } from '../../actions/ProfileActions';


export default class CreateProfile extends Component {
    constructor(props){
        super(props)

        this.state = {
            handle: '',
            organization: '',
            bio: '',
            location: '',
        }
    }
    addLocation(){
        let output;
        fs.readFile('../../utils/locations.json', 'utf8', (err, jsonString) => {
            if(err) {
                console.log("Error reading file from disk: " + err);
                return;
            }
            try{
                const locations = JSON.parse(jsonString)
                for(i = 0; i < locations.length; i++){
                    output += (
                        <option>{locations[i].name}</option>
                    )
                }
                return output;
            }
            catch(err) {
                console.log('Error parsing JSON string:', err)
            }
        })
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        let profileData = {
            handle: this.state.handle,
            organization: this.state.organization,
            location: this.state.location,
            bio: this.state.bio
        }

        createProfile(profileData, this.props.history);
    }
    render() {
        return (
        <div>
            <form>
                <TextField
                placeholder="Enter a unique handle for your profile!"
                name="handle"
                type="text"
                value={this.state.handle}
                onChange={this.state.handleChange}
                />
                <TextField
                placeholder="What organization are you currently a part of?"
                name="organization"
                type="text"
                value={this.state.organization}
                onChange={this.state.handleChange}
                />
                <div class="form-group">
                    <label for="location">Location</label>
                    <select class="form-control" name='location' id="location" value={this.state.location} onChange={this.handleChange}>
                    {addLocation}
                    </select>
                </div>

                <div class="form-group">
                    <label for="Bio">Biography</label>s
                    <textarea class="form-control" name='bio' value={this.state.bio} id="Bio" rows="4"></textarea>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        )
    }
}
