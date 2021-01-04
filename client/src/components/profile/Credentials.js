import React, { Component } from 'react'
// import Hackathon from '../hackathons/Hackathon';
import Moment from 'react-moment';
import {deleteExperience, deleteEducation, deletePreviousHackathon} from '../../actions/ProfileActions';
import {Link} from 'react-router-dom';

export default class Education extends Component {
    // constructor(props){
    //     super(props)
    // }

    deleteExp(id){
        deleteExperience(id);
        window.location.reload();
    }
    deleteEdu(id){
        deleteEducation(id);
        window.location.reload();
    }
    deletePH(id){
        deletePreviousHackathon(id);
        window.location.reload();
    }
    render() {
        let {education, experience, previousHackathons} = this.props.profile;

        let educationContent = education.map(education => {
            return (
                <div className="cred-row">
                    <strong><p className="head-cred">{education.school}</p></strong>
                    <span className="cred-dates"><Moment format="MM/DD/YYYY">{education.from}</Moment> - {education.current ? "Now" : <Moment format="MM/DD/YYYY">{education.to}</Moment>}</span>
                    <br></br>
                    {education.degree ? <p className="sub-cred">{education.degree}</p> : <p>No degree obtained</p>}
                    <br/>
                    <p className="sub-cred">{education.fieldOfStudy}</p>
                    <br/>
                    <p className="cred-descr">{education.description}</p>
                    <br />
                    
                    <br></br>
                    {/*<button className="btn btn-danger" onClick={this.deleteEdu.bind(this, education._id)}>Delete Education</button>*/}
                </div>
            )
        })
        let experienceContent = experience.map(experience => {
            return (
                <div className="cred-row">
                    {experience.company? <strong><p className="head-cred">{experience.company}</p></strong> : <strong><p className="head-cred">Unaffiliated</p></strong>}
                    <span className="cred-dates"><Moment format="MM/DD/YYYY">{experience.from}</Moment> - {experience.current ? "Now" : <Moment format="MM/DD/YYYY">{experience.to}</Moment>}</span>
                    <br></br>
                    {experience.position ? <p className="sub-cred">{experience.position}</p> : <p>No specified position</p>}
                    <br/>
                    <p className="cred-descr">{experience.description}</p>
                    <br />
                    <br/>
                    {/*<button className="delete-btn btn btn-danger" onClick={this.deleteExp.bind(this, experience._id)}>Delete Experience</button>*/}
                </div>
            )
        })
        let hackathonContent = previousHackathons.map(hackathon => {
            return (
                <div className="cred-row">
                    <strong><p className="head-cred">{hackathon.name}</p></strong>
                    {hackathon.date ?  <span className="cred-dates"><Moment format="MM/DD/YYYY">{hackathon.date}</Moment></span> : <span>No date specified.</span>}
                    <br></br>
                    {hackathon.location ? <p className="sub-cred">{hackathon.location}</p> : <p>No specified location</p>}
                    <br/>
                    <p className="cred-descr">{hackathon.description}</p>
                    <br />
                    <br/>
                    {/*<button className="btn btn-danger" onClick={this.deletePH.bind(this, hackathon._id)}>Delete Hackathon</button>*/}
                </div>
                
            )
        })

        return (
        <div>
            <div><h5><strong><u>Education</u></strong>   <Link to='/add-education' className="btn btn-lg btn-info btn-sm">+</Link></h5></div>
                {educationContent}
            <div><h5><strong><u>Experiences</u></strong>   <Link to='/add-experience' className="btn btn-lg btn-info btn-sm">+</Link></h5></div>
                {experienceContent}             
            <div><h5><strong><u>Hackathons</u></strong>   <Link to='/add-previous-hackathon' className="btn btn-lg btn-info btn-sm">+</Link></h5></div>
                {hackathonContent}
        </div>
        )
    }
}
