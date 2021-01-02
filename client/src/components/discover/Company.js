import React from 'react'
import PropTypes from 'prop-types'
import {Redirect, Link} from 'react-router-dom'
import {Moment} from 'react-moment'


const Company = ({company}) => {
    
    return (
        <div className = "company-item">
           <div className= "company-content">
                <h1>{company.organization}</h1>

                <p className = "description"> {company.bio}</p>
                {/* {company.website ? <p className = "website">{company.website}</p> : <p>Organizer didn't link their website!</p>} */}

                <p>{company.location}</p>
                <div><Link to={`/company/${company._id}`} className="btn btn-primary">View Company</Link></div>
           </div>
           <p className = 'company-widget-donations'>{Object.keys(company.donationTypes).map((key, index) => {
         return company.donationTypes[key] ? (<span className = 'donButton' key={index}>{key.substring(0,1).toUpperCase() + key.substring(1)}</span>) : <span key={index}>{""}</span>})}</p>
       </div> 
    )
}

Company.propTypes = {

}

export default Company
