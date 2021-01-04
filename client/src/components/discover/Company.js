import React from 'react'
import PropTypes from 'prop-types'
import {Redirect, useHistory} from 'react-router-dom'
import {Moment} from 'react-moment'


const Company = ({company}) => {
    let history = useHistory();
    return (
        <div className = "company-item" onClick = {e => history.push(`/company/${company._id}`)}>
          <div className="company__top">
                <h1>{company.organization}</h1>
              </div>
           <div className= "company-content">

                <p className = "description"> {company.bio}</p>
                {/* {company.website ? <p className = "website">{company.website}</p> : <p>Organizer didn't link their website!</p>} */}
                <div className="company__location">
                  <i class="fas fa-map-marker-alt"></i>
                  <p>{company.location}</p>
                </div>
           </div>
           <p className = 'company-widget-donations'>{Object.keys(company.donationTypes).map((key, index) => {
         return company.donationTypes[key] ? (<span className = 'donButton' key={index}>{key.substring(0,1).toUpperCase() + key.substring(1)}</span>) : <span key={index}>{""}</span>})}</p>
       </div> 
    )
}

Company.propTypes = {

}

export default Company
