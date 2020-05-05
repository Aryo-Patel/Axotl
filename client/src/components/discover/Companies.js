import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCompanies} from '../../actions/companies'
import Spinner from '../common/Spinner'
import Company from './Company'

//import css
import './styling/hackathons.css'

const Companies = ({companies : {loading, companyList}, getCompanies}) => {
    useEffect(() => {
        getCompanies()
    }, [getCompanies])
    
    return (
        <Fragment>
            <div className = "header">
                <h1>Find and connect with potential sponsors!</h1>
            </div>
            <div className = "company-holder">
                {!loading ?
                companyList.map((company, index) => (
                    <Company key = {index} company = {company} />
                ))
                : <Spinner />}
            </div>
        </Fragment>
    )
}

Companies.propTypes = {
    companies : PropTypes.object,
    getCompanies : PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    companies : state.companies
})

export default connect(mapStateToProps, {getCompanies})(Companies);
