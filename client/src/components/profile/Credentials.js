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
                <dl className="row" style={{backgroundColor:"#85e085"}}>
                    <dt className="col-sm-3">{education.school}</dt>
                    <dd className="col-sm-9">
                        {education.degree ? <p>{education.degree}</p> : <p>No degree obtained</p>}
                        <p>{education.fieldOfStudy}</p>
                        <p>{education.description}</p>
                        <p><Moment format="MM/DD/YYYY">{education.from}</Moment> - {education.current ? <p>Now</p> : <Moment format="MM/DD/YYYY">{education.to}></Moment>}</p>
                        <button className="btn btn-danger" onClick={this.deleteEdu.bind(this, education._id)}>Delete Education</button>
                    </dd>
                </dl>
            )
        })
        let experienceContent = experience.map(experience => {
            return (
                <dl className="row" style={{backgroundColor:"#71da71"}}>
                    {experience.company ? <dt className="col-sm-3">{experience.company}</dt> : <dt className="col-sm-3">Unaffiliated</dt>}
                    <dd className="col-sm-9">
                    {experience.position ? <p>{experience.position}</p> : <br></br>}
                    <p>{experience.description}</p>
                    <p><Moment format="MM/DD/YYYY">{experience.from}</Moment> - {experience.current ? <p>Now</p> : <Moment format="MM/DD/YYYY">{experience.to}></Moment>}</p>
                    <button className="btn btn-danger" onClick={this.deleteExp.bind(this, experience._id)}>Delete Experience</button>
                    </dd>
                </dl>
            )
        })
        let hackathonContent = previousHackathons.map(hackathon => {
            return (
                <dl className="row" style={{backgroundColor:"#32cd32"}}>
                    <dt className="col-sm-3">{hackathon.name}</dt>
                    <dd className="col-sm-9">
                        <p>{hackathon.description}</p>
                        <p>{hackathon.location ? <p>{hackathon.location}</p> : <p>No location specified.</p>}</p>
                        <p>{hackathon.date ? <Moment format="MM/DD/YYYY">{hackathon.date}</Moment> : <p>No date specified.</p>}</p>
                        <button className="btn btn-danger" onClick={this.deletePH.bind(this, hackathon._id)}>Delete Hackathon</button>
                    </dd>
                </dl>
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
