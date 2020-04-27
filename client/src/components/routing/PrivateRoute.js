import React from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'

const PrivateRoute = props => {
    return (
        <div>
            {}
        </div>
    )
}

PrivateRoute.propTypes = {

}

const mapStateToProps = state => ({
    
})

export default connect(mapStateToProps, {})(PrivateRoute)
