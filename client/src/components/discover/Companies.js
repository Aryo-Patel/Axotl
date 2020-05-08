import React, {Fragment, useEffect, useState} from 'react'
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
    
    const [query, setQuery] = useState('')

    const [donTag, setDonTag] = useState([])

    const onSubmit = e => {
        e.preventDefault();
        console.log('submission');
    }

    const onChange = e => {
        setQuery(e.target.value)
    }

    const addTag = e => {
        if(!e.target.classList.contains('pressedTag')) {
        e.target.classList.add('pressedTag')
        console.log('first hit')
        setDonTag([...donTag, e.target.id])
        } else {
            console.log('second hit')
            e.target.classList.remove('pressedTag')
            setDonTag(donTag.filter(tag => tag != e.target.id))
        }
        
    }

    const prizeTypes = ['merch', 'prizes', 'food', 'drinks', 'workshop Hosting', 'judging', 'other']

    return (
        <Fragment>
            <div className = "header">
                <h1>Find and connect with potential sponsors!</h1>
            </div>
            <form className="searchingContainer" onSubmit = {e=> onSubmit(e)}>
                <input type="text" className="searchBar" placeholder='Search for a sponsor...' onChange = {e => onChange(e)} value= {query}/>
                <input type='submit' className = 'search' value='Search'/>
            </form>
            <div className="donTags">
                <h3>Contribution Tags</h3>
                {prizeTypes.map((prizeType, index) => (<div id = {prizeType} key = {index} className = 'donTag' onClick = {e => addTag(e)}>{prizeType}</div>))}
            </div>
            <div className = "company-holder">
                {!loading ?
                companyList.filter(company => {
                    let tagsTrue = true;
                    for(let i = 0; i < donTag.length; i++) {
                        console.log(donTag.length)
                        console.log(donTag)
                        console.log(Object.keys(company.donationTypes))
                        if(!company.donationTypes[donTag[i]]) {
                            tagsTrue = false;
                        }
                    }
                    return company.organization.substring(0, query.length).toUpperCase() == query.toUpperCase() && tagsTrue}).map((company, index) => (
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
