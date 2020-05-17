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
        getDistances()
    }, [getDistances])
    
    const [search, setSearch] = useState('')

    const [donTag, setDonTag] = useState([])

    const [distFilter, setDistFilter] = useState('')

    const [distFilterToggle, setDistFilterToggle] = useState(false)

    const onSubmit = e => {
        e.preventDefault();
        console.log('submission');
    }

    const onChange = e => {
        setSearch(e.target.value);
    }

    const addTag = e => {
        if(!e.target.classList.contains('pressedTag')) {
        e.target.classList.add('pressedTag')
        
        setDonTag([...donTag, e.target.id])
        } else {
            
            e.target.classList.remove('pressedTag')
            setDonTag(donTag.filter(tag => tag != e.target.id))
        }
        
    }

    const prizeTypes = ['merch', 'prizes', 'food', 'drinks', 'workshop Hosting', 'judging', 'other']

    const locationRouting = async (e) => {
        const isCurr = e.target.innerHTML == distFilter;
        Array.from(e.target.parentNode.childNodes).forEach(tag => tag.classList.contains('pressedTag') ? tag.classList.remove('pressedTag') : null)
        if(isCurr) {
        e.target.classList.remove('pressedTag')
        setDistFilterToggle(false)
        } else {
            e.target.classList.add('pressedTag')
            setDistFilterToggle(true)
        }
        setDistFilter(e.target.innerHTML)

    }

    return (
        <Fragment>
            <div className = "header">
                <h1>Find and connect with potential sponsors!</h1>
            </div>
            <form className="searchingContainer" onSubmit = {e=> onSubmit(e)}>
                <input type="text" className="searchBar" placeholder='Search for a sponsor...' onChange = {e => onChange(e)} value= {search}/>
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
                <div className="locTag" onClick = {e => locationRouting(e)}>1000 miles</div>
            </div>
            <div className = "company-holder">
                {!loading ?
                companyList.filter(company => {
                    let distTrue = true;
                    let tagsTrue = true;
                    for(let i = 0; i < donTag.length; i++) {
                        if(!company.donationTypes[donTag[i]]) {
                            tagsTrue = false;
                        }
                    }
                    
                    if(distFilterToggle && Number(company.distanceFromUser.split(" ")[0].split(",").join("")) > Number(distFilter.split(" ")[0])) {
                        distTrue = false;
                    }
                    return company.organization.substring(0, search.length).toUpperCase() == search.toUpperCase() && tagsTrue && distTrue}).map((company, index) => (
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
