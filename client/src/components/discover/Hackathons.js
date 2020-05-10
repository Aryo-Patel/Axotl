import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

//import the CSS
import './styling/hackathons.css';
//import the actions
import {getHackathons} from '../../actions/hackathonActions';

//import components
import Spinner from '../common/Spinner';
import Hackathon from './Hackathon';
const Hackathons = ({getHackathons, hackathons: {hackathonList, loading}}) => {
    //calls the get hackathon page when loading
    useEffect(() => {
        getHackathons()
    }, [getHackathons])
    const [query, setQuery] = useState('')

    const [donTag, setDonTag] = useState([])

    const [distFilter, setDistFilter] = useState('')

    const [distFilterToggle, setDistFilterToggle] = useState(false)

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
                <h1>Find upcoming hackathons, or checkout past results!</h1>
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
                <div className="locTag" onClick = {e => locationRouting(e)}>1000 miles</div>
            </div>
            <div className = "hackathon-holder">
                {!loading ?
                hackathonList.filter(hackathon => {
                    let distTrue = true;
                    let tagsTrue = true;
                    // for(let i = 0; i < donTag.length; i++) {
                    //     if(!hackathon.donationTypes[donTag[i]]) {
                    //         tagsTrue = false;
                    //     }
                    // }
                    // console.log(`distfiltertoggle : ${distFilterToggle}`)
                    // console.log(`distFilter: ${distFilter}`)
                    // console.log(hackathon.distanceFromUser.split(" ")[0].split(",").join(""))
                    // if(distFilterToggle && Number(hackathon.distanceFromUser.split(" ")[0].split(",").join("")) > Number(distFilter.split(" ")[0])) {
                    //     distTrue = false;
                    // }
                    return hackathon.title.substring(0, query.length).toUpperCase() == query.toUpperCase() && tagsTrue && distTrue}).map((hackathon, index) => (
                    <Hackathon key = {index} hackathon = {hackathon} />
                ))
                : <Spinner />}
            </div>
        </Fragment>
    )
}

Hackathons.propTypes = {
    getHackathons: PropTypes.func.isRequired,
    hackathons: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    hackathons : state.hackathons
})

export default connect(mapStateToProps, {getHackathons})(Hackathons);