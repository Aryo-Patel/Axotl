import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Redirect, Link } from 'react-router-dom'

const RecipientHackathon = ({ hackathon }) => {
    let i = 0;
    const onClick = (e) => {
        return <Redirect to={`/hackathon/${hackathon._id}`} />
    }
    return (
        <div className="hackathon-item" onClick={e => onClick(e)}>
            <div className="hackathon-content">
                <h1>Title: {hackathon.title}</h1>

                <p className="description">Description: {hackathon.description}</p>
                {hackathon.website ? <p className="website">Website: {hackathon.website}</p> : <p>Organizer didn't link their website!</p>}
                <p>Donations requested: </p>
                {hackathon.donations.map(donation => (
                    donation.received.length > 0 ?
                        <p></p>
                        :
                        <p>{donation.type}</p>
                    // donation.received.length > 0 ?
                    //     donation.received.map(received_singular => (
                    //         <p key={i++}>Received {received_singular.type} : {received_singular.description}</p>
                    //     ))
                    //     :
                    //     <Fragment></Fragment>
                ))}
                {hackathon.location ? <p>Location : {hackathon.location}</p> : <p>Organizer did not link hackathon's location</p>}
                <p>Start Date: <Moment format='MM/DD/YYYY'>{hackathon.startDate}</Moment></p>

                <p>End Date: <Moment format='MM/DD/YYYY'>{hackathon.endDate}</Moment></p>
                <Link to={`/hackathon/${hackathon._id}`} className="btn btn-primary">
                    View Hackathon
                </Link>
            </div>

        </div>
    )
}

export default RecipientHackathon;