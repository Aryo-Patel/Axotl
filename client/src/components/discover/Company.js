import React from 'react'
import PropTypes from 'prop-types'
import {Redirect, Link} from 'react-router-dom'
import {Moment} from 'react-moment'


const Company = ({company}) => {
    
    return (
        <div className = "company-item">
           <div className= "company-content">
                <h1>Title: {company.organization}</h1>

                <p className = "description"> {company.bio}</p>
                {/* {company.website ? <p className = "website">{company.website}</p> : <p>Organizer didn't link their website!</p>} */}

                <p>Location : {company.location}</p>
                <Link to={`/company/${company._id}`} className="btn btn-primary">
          View Company
        </Link>
           </div>

       </div> 
    )
}

Company.propTypes = {

}

export default Company
