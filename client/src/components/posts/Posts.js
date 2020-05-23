import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {createPost, editPost, getPosts} from '../../actions/post';
import {connect} from 'react-redux'
import {Redirect, Link, withRouter} from 'react-router-dom';

const Posts = ({}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts])
    const [search, setSearch] = useState('')
    return (
        <div className = 'posts'>
            <h3 className="heading">Posts</h3>
            <form className="searchingContainer" onSubmit = {e=> onSubmit(e)}>
                <input type="text" className="searchBar" placeholder='Search for a sponsor...' onChange = {e => onChange(e)} value= {search}/>
                <input type='submit' className = 'search' value='Search'/>
            </form>
        </div>
    )
}

Posts.propTypes = {

}

export default connect(null, {})(Posts)
