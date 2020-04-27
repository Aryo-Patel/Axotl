import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

//import the CSS
import './styling/hackathons.css';
//import the actions
import {getHackathons} from '../../actions/hackathonActions';

//import components
import Spinner from '../common/Spinner';
import Hackathon from './Hackathon';
const Hackathons = ({getHackathons, hackathons: {hackathonList, loading}}) => {
    //calls the get hackathon page when loading
    useEffect(() => {
        getHackathons()
    }, [getHackathons])

    return (
        <Fragment>
            <div className = "header">
                <h1>Find upcoming hackathons, or checkout past results!</h1>
            </div>
            <div className = "hackathon-holder">
                {!loading ?
                hackathonList.map((hackathon, index) => (
                    <Hackathon key = {index} hackathon = {hackathon} />
                ))
                : <Spinner />}
            </div>
        </Fragment>
    )
}

Hackathons.propTypes = {
    getHackathons: PropTypes.func.isRequired,
    hackathons: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    hackathons : state.hackathons
})

export default connect(mapStateToProps, {getHackathons})(Hackathons);