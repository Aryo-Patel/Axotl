import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCompanies, getDistances} from '../../actions/companies'
import Spinner from '../common/Spinner'
import Company from './Company'

//import css
import './styling/hackathons.css'

const Companies = ({companies : {loading, companyList}, getCompanies, getDistances}) => {
    useEffect(() => {
        getCompanies()
    }, [getCompanies])
    
    const [query, setQuery] = useState('')

    const [donTag, setDonTag] = useState([])

    const [distFilter, setDistFilter] = useState('')

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

    const locationRouting = e => {
        console.log(e.target.classList)
        const isCurr = e.target.innerHTML == distFilter;
        console.log(isCurr)
        Array.from(e.target.parentNode.childNodes).forEach(tag => tag.classList.contains('pressedTag') ? tag.classList.remove('pressedTag') : null)
        if(isCurr) {
        e.target.classList.remove('pressedTag')
        } else {
            e.target.classList.add('pressedTag')
        }
        setDistFilter(e.target.innerHTML)
        /**
         * TODO
         * dispatch action to get distances
         * set up back end distance matrix api
         */
    }

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
                <h3 style = {{display: 'inline-block'}}>Contribution Tags: </h3>
                {prizeTypes.map((prizeType, index) => (<div id = {prizeType} key = {index} className = 'donTag' onClick = {e => addTag(e)}>{prizeType}</div>))}
            </div>
            <div className="locationTags">
                <h3 style = {{display: 'inline-block'}}>Within: </h3>
                <div className="locTag" onClick = {e => locationRouting(e)}>10 miles</div>
                <div className="locTag" onClick = {e => locationRouting(e)}>25 miles</div>
                <div className="locTag" onClick = {e => locationRouting(e)}>50 miles</div>
                <div className="locTag" onClick = {e => locationRouting(e)}>100 miles</div>
                <div className="locTag" onClick = {e => locationRouting(e)}>250 miles</div>
            </div>
            <div className = "company-holder">
                {!loading ?
                companyList.filter(company => {
                    let tagsTrue = true;
                    for(let i = 0; i < donTag.length; i++) {
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

export default connect(mapStateToProps, {getCompanies, getDistances})(Companies);
