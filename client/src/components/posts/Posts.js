import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {createPost, editPost, getPosts, deletePost, addComment, addLike, addReply, deleteComment, deleteReply, editComment} from '../../actions/post';
import {connect} from 'react-redux'
import {Redirect, Link, withRouter} from 'react-router-dom';
import CreatePost from './CreatePost'
import EditPost from './EditPost'
import ConfirmationModal from '../common/ConfirmationModal'
import EditComment from './EditComment'
import Post from './Post'
import Spinner from '../common/Spinner'

import './styling/posts.css'

const Posts = ({getPosts, createPost, editPost, deletePost, posts, loading, addComment, addLike, addReply, deleteComment, deleteReply, editComment}) => {
    useEffect(() => {
        //getting the first ten posts for display
        getPosts(pageNumber);
    }, [getPosts])
    //value of search query
    const [search, setSearch] = useState('')
    //onchange for search
    const onChange = e => {
        setSearch(e.target.value);
    }
    //number for how many results getPosts returns * 10
    const [pageNumber, setPageNumber] = useState(1)
    //getting more posts when "show more" is clicked
    const paginate = e => {
        setPageNumber(pageNumber+1);
        getPosts(pageNumber);
    }
    //value for editing post modal to be open or closed
    const [modal, modalToggle] = useState('closed');
    //value of whether confirm deletion modal is open
    const [confirmationModal, setConfirmationModal] = useState('closed');
    //overall storage of current post item
    const [post, setPost] = useState({})
    //post for modal to confirm deletion of post
    const [confirmationPost, setConfirmationPost] = useState({})
    //data for editing comment modal
    const [editingComment, setEditingComment] = useState({});
    //value for editing comment modal
    const [editCommentModal, setEditCommentModal] = useState('closed')
    return (
        <div className = 'posts'>
            <h3 className="heading">Posts</h3>
            <form className="searchingContainer">
                <input type="text" className="searchBar" placeholder='Search for a post...' onChange = {e => onChange(e)} value= {search}/>
                <input type='submit' className = 'search' value='Search'/>
            </form>
            {/**modal to create a post */}
            <CreatePost createPost = {createPost} />
            {/**modal to edit a post */}
            <EditPost postState = {post} editPost = {editPost} modal = {modal} modalToggle = {modalToggle}/>
            {/**modal to confirm deletion of a post */}
            <ConfirmationModal setConfirmationModal = {setConfirmationModal} confirmationModalToggle={setConfirmationModal} modal = {confirmationModal} setModal = {setConfirmationModal} text = 'Are you sure you want to do this?' parentClassName='posts' confirmationModal={confirmationModal} confirmationPost = {confirmationPost} deletePost = {deletePost}/>
            {/**modal to edit a comment */}
            <EditComment editingComment = {editingComment} setEditCommentModal = {setEditCommentModal} editCommentModal = {editCommentModal} postState = {post} editComment = {editComment} />
            <div className="posts__container">
                {loading ? <Spinner /> : posts.filter(post => {
                    console.log(post.title.substring(0,search.length).toUpperCase() == search.toUpperCase() || post.name.substring(0,search.length).toUpperCase() == search.toUpperCase())
                    return post.title.substring(0,search.length).toUpperCase() == search.toUpperCase() || post.name.substring(0,search.length).toUpperCase() == search.toUpperCase()
                }).map((post, index) => (
                    <Post thisPostState = {post} setPost = {setPost} modal = {modal} key = {index} post={post} editPost = {editPost} deletePost={deletePost} modalToggle = {modalToggle} confirmationModalToggle= {setConfirmationModal} confirmationModal={confirmationModal} setConfirmationPost = {setConfirmationPost} confirmationPost = {confirmationPost} addComment = {addComment} addReply = {addReply} addLike = {addLike} deleteComment = {deleteComment} deleteReply = {deleteReply} setEditingComment = {setEditingComment} setEditCommentModal = {setEditCommentModal}/>
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

export default connect(mapStateToProps, {getPosts, createPost, editPost, deletePost, addComment, addLike, addReply, deleteComment, deleteReply, editComment})(withRouter(Posts))
