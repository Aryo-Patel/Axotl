import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';
import Spinner from '../common/Spinner';

const PrivateRoute = ({ component: Component, loading, history, isAuthenticated, ...rest }) => {
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            history.push('/login')
        }
    }, [loading])
    return ( <
        Route {...rest }
        render = {
            props =>
            (loading ? < Spinner / > : !isAuthenticated ? < Redirect to = '/login' / > : <
                Component {...props }
                />
            )
        }
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
})

export default connect(mapStateToProps, {})(withRouter(PrivateRoute))