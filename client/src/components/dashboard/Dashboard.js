import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const Dashboard = props => {
    return (
        <Fragment>
            <Link to='/profile' className="btn btn-lg btn-info">Your Profile</Link> 
        </Fragment>
    )
}

Dashboard.propTypes = {

}

export default Dashboard
