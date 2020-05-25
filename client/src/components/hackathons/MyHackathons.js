import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserHackathons } from '../../actions/hackathonActions';

import RecipientHackathon from './RecipientHackathon';
//spinner
import Spinner from '../common/Spinner';
const MyHackathons = ({ getUserHackathons, id, hackathons, loading }) => {

    useEffect(() => {
        getUserHackathons(id)
    }, [getUserHackathons, id])

    console.log('test');
    return (
        <Fragment>
            <div className="hackathon-container">
                {!loading ?
                    hackathons.map((hackathon, index) => (
                        <RecipientHackathon hackathon={hackathon} key={index} />
                    ))
                    :
                    <Spinner />
                }
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    id: state.auth.user.user._id,
    hackathons: state.hackathons.hackathonList,
    loading: state.hackathons.loading,
})

MyHackathons.propTypes = {
    getUserHackathons: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    hackathons: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, { getUserHackathons })(MyHackathons);