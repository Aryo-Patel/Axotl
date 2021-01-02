import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Redirect, Link } from 'react-router-dom'


const Hackathon = ({ hackathon }) => {
    let i = 0;
    const onClick = (e) => {
        return <Redirect to={`/hackathon/${hackathon._id}`} />
    }
    return (
        <div className="hackathon-item" onClick={e => onClick(e)}>
            <div className="hackathon-content">
                <h1>{hackathon.title}</h1>

                <p className="description">{hackathon.description}</p>
                {hackathon.website ? <p className="website">{hackathon.website}</p> : <p>Organizer didn't link their website!</p>}
                <div className = "donations-container">
                    <span>Donations requested: </span>
                    {hackathon.donations.map(donation => (
                        donation.received.length > 0 ?
                            <Fragment></Fragment>
                            :
                            <span>{donation.type} </span>
                    ))}
                </div>
                {hackathon.location ? <p>Location : {hackathon.location}</p> : <p>Organizer did not link hackathon's location</p>}
                <p><Moment format='MM/DD/YYYY'>{hackathon.startDate}</Moment> - <Moment format='MM/DD/YYYY'>{hackathon.endDate}</Moment></p>
                <Link to={`/hackathon/${hackathon._id}`} className="btn btn-primary">
                    View Hackathon
                </Link>
            </div>

        </div>
    )
}

Hackathon.propTypes = {
    hackathon: PropTypes.object.isRequired
}

export default Hackathon;