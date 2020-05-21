import React from 'react'
import PropTypes from 'prop-types'
import Hackathons from './Hackathons'
import Companies from './Companies'
import {connect} from 'react-redux'

const Discover = ({isSponsor}) => {
    return (
        <div className = 'discoverContainer'>
           {isSponsor ? <Hackathons /> : <Companies />} 
        </div>
    )
}

Discover.propTypes = {

}

const mapStateToProps = state => ({
    isSponsor : state.auth.user.user.sponsor
})

export default connect(mapStateToProps, {})(Discover);
