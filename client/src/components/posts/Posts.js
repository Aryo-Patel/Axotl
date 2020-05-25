import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {createPost, editPost, getPosts, deletePost} from '../../actions/post';
import {connect} from 'react-redux'
import {Redirect, Link, withRouter} from 'react-router-dom';
import CreatePost from './CreatePost'
import EditPost from './EditPost'
import ConfirmationModal from '../common/ConfirmationModal'
import Post from './Post'
import Spinner from '../common/Spinner'

import './styling/posts.css'

const Posts = ({getPosts, createPost, editPost, deletePost, posts, loading}) => {
    useEffect(() => {
        getPosts(pageNumber);
    }, [getPosts])
    const [search, setSearch] = useState('')
    const onChange = e => {
        setSearch(e.target.value);
    }
    const [pageNumber, setPageNumber] = useState(1)
    const paginate = e => {
        setPageNumber(pageNumber+1);
        getPosts(pageNumber);
    }
    const [modal, modalToggle] = useState('closed');
    const [confirmationModal, setConfirmationModal] = useState('closed');
    const [post, setPost] = useState({})
    const [confirmationPost, setConfirmationPost] = useState({})
    return (
        <div className = 'posts'>
            <h3 className="heading">Posts</h3>
            <form className="searchingContainer">
                <input type="text" className="searchBar" placeholder='Search for a sponsor...' onChange = {e => onChange(e)} value= {search}/>
                <input type='submit' className = 'search' value='Search'/>
            </form>
            <CreatePost createPost = {createPost} />
            <EditPost postState = {post} editPost = {editPost} modal = {modal} modalToggle = {modalToggle}/>
            <ConfirmationModal setConfirmationModal = {setConfirmationModal} confirmationModalToggle={setConfirmationModal} modal = {confirmationModal} setModal = {setConfirmationModal} text = 'Are you sure you want to do this?' parentClassName='posts' confirmationModal={confirmationModal} confirmationPost = {confirmationPost} deletePost = {deletePost}/>
            <div className="posts__container">
                {loading ? <Spinner /> : posts.filter(post => {
                    console.log(post.title.substring(0,search.length).toUpperCase() == search.toUpperCase() || post.name.substring(0,search.length).toUpperCase() == search.toUpperCase())
                    return post.title.substring(0,search.length).toUpperCase() == search.toUpperCase() || post.name.substring(0,search.length).toUpperCase() == search.toUpperCase()
                }).map((post, index) => (
                    <Post thisPostState = {post} setPost = {setPost} modal = {modal} key = {index} post={post} editPost = {editPost} deletePost={deletePost} modalToggle = {modalToggle} confirmationModalToggle= {setConfirmationModal} confirmationModal={confirmationModal} setConfirmationPost = {setConfirmationPost} confirmationPost = {confirmationPost}/>
                ))}
            </div>
            <button className="posts__see-more button" onClick = {e => paginate(e)}>See More Posts</button>
        </div>
    )
}

Posts.propTypes = {
    getPosts : PropTypes.func.isRequired,
    createPost : PropTypes.func.isRequired,
    editPost : PropTypes.func.isRequired,
    posts : PropTypes.array
}

const mapStateToProps = state => ({
    posts : state.post.posts.posts,
    loading : state.post.loading
})

export default connect(mapStateToProps, {getPosts, createPost, editPost, deletePost})(withRouter(Posts))
