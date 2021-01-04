import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import getDateRange from "./util/getRange"
import { Redirect, useHistory} from 'react-router-dom'


const Hackathon = ({ hackathon }) => {
    const history = useHistory();
    let i = 0;
    const onClick = (e) => {
        history.push(`/hackathon/${hackathon._id}`);
    }
    return (
        <div className="hackathon-item" onClick={e => onClick(e)}>
            <div className="hackathon__top">
                    <h1>{hackathon.title}</h1>
                    {hackathon.website ? <a href={`http://${hackathon.website}`} className="website">{hackathon.website}</a> : null}
                </div>
            <div className="hackathon-content">

                <p className="description">{hackathon.description}</p>
                <div className = "donations-container">
                    {hackathon.donations.length > 0 ? (
                    <span>Goals: </span>) : (<span>Goals: TBD</span>)}
                    {hackathon.donations.map((donation, index) => {
                        // return donation.received.length > 0 ?
                        //     <Fragment></Fragment>
                        //     : 
                        return index != 0 ?
                            <span>&#8226; {donation.type} </span> : <span>{donation.type} </span>
                    })}
                </div>
                <div className="bottom">
                    <div className="hackathon__date">
                        <i class="far fa-calendar-alt"></i>
                        <p>{getDateRange(hackathon.startDate, hackathon.endDate)}</p>
                    </div>
                    <div className="hackathon__location">
                        <i class="fas fa-map-marker-alt"></i>
                        {hackathon.location ? <p>{hackathon.location}</p> : <p>TBD</p>}
                    </div>
                </div>
            </div>

        </div>
    )
}

Hackathon.propTypes = {
    hackathon: PropTypes.object.isRequired
}

export default Hackathon;