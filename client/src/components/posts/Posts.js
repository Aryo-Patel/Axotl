import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {createPost, editPost, getPosts} from '../../actions/post';
import {connect} from 'react-redux'
import {Redirect, Link, withRouter} from 'react-router-dom';
import CreatePost from './CreatePost'
import Post from './Post'
import Spinner from '../common/Spinner'

import './styling/posts.css'

const Posts = ({getPosts, createPost, editPost, posts, loading}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts])
    const [search, setSearch] = useState('')
    const onChange = e => {
        setSearch(e.target.value);
    }
    return (
        <div className = 'posts'>
            <h3 className="heading">Posts</h3>
            <form className="searchingContainer">
                <input type="text" className="searchBar" placeholder='Search for a sponsor...' onChange = {e => onChange(e)} value= {search}/>
                <input type='submit' className = 'search' value='Search'/>
            </form>
            <CreatePost createPost = {createPost} />
            <div className="posts__container">
                {loading ? <Spinner /> : posts.filter(post => {
                    console.log(post.title.substring(0,search.length).toUpperCase() == search.toUpperCase() || post.name.substring(0,search.length).toUpperCase() == search.toUpperCase())
                    return post.title.substring(0,search.length).toUpperCase() == search.toUpperCase() || post.name.substring(0,search.length).toUpperCase() == search.toUpperCase()
                }).map(post => (
                    <Post post={post} />
                ))}
            </div>
        </div>
    )
}

Posts.propTypes = {
    getPosts : PropTypes.func.isRequired,
    createPost : PropTypes.func.isRequired,
    editPost : PropTypes.func.isRequired,
    posts : PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    posts : state.post.posts.posts,
    loading : state.post.loading
})

export default connect(mapStateToProps, {getPosts, createPost, editPost})(withRouter(Posts))
