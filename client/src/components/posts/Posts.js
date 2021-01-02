import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {createPost, editPost, getPosts, deletePost, addComment, addLike, addReply, deleteComment, deleteReply, editComment, likeComment, likeReply, editReply} from '../../actions/post';
import {connect} from 'react-redux'
import {Redirect, Link, withRouter} from 'react-router-dom';
import CreatePost from './CreatePost'
import EditPost from './EditPost'
import ConfirmationModal from '../common/ConfirmationModal'
import EditComment from './EditComment'
import EditReply from './EditReply'
import Post from './Post'
import Spinner from '../common/Spinner'

import './styling/posts.css'

const Posts = ({numPosts, getPosts, createPost, editPost, deletePost, posts, loading, addComment, addLike, addReply, deleteComment, deleteReply, editComment, likeComment, likeReply, editReply}) => {
    //number for how many results getPosts returns * 10
    const [pageNumber, setPageNumber] = useState(1)
    useEffect(() => {
        getPosts(pageNumber);
    }, [getPosts, pageNumber])
    //value of search query
    const [search, setSearch] = useState('')
    //onchange for search
    const onChange = e => {
        setSearch(e.target.value);
    }
    //getting more posts when "show more" is clicked
    const paginate = async (e) => {
        setPageNumber(pageNumber+1);
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
    //data for editing reply modal
    const [editingReply, setEditingReply] = useState({});
    //value for editing reply modal
    const [editReplyModal, setEditReplyModal] = useState('closed')
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
            <ConfirmationModal setConfirmationModal = {setConfirmationModal} text = 'Are you sure you want to do this?' parentClassName='posts' confirmationModal={confirmationModal} confirmationPost = {confirmationPost} deletePost = {deletePost}/>
            {/**modal to edit a comment */}
            <EditComment editingComment = {editingComment} setEditCommentModal = {setEditCommentModal} editCommentModal = {editCommentModal} postState = {post} editComment = {editComment} />
            <EditReply editingReply = {editingReply} setEditReplyModal = {setEditReplyModal} editReplyModal = {editReplyModal} postState = {post} editReply = {editReply} editingComment = {editingComment}/>
            <div className="posts__container">
                {loading ? <Spinner /> : posts.filter(post => {
                    
                    return post.title.toUpperCase().includes(search.toUpperCase()) || post.name.toUpperCase().includes(search.toUpperCase())
                }).map((post, index) => { 
                return (
                    <Post index = {index} setPost = {setPost} modal = {modal} key = {index} post={post} editPost = {editPost} deletePost={deletePost} modalToggle = {modalToggle} confirmationModalToggle= {setConfirmationModal} confirmationModal={confirmationModal} setConfirmationPost = {setConfirmationPost} confirmationPost = {confirmationPost} addComment = {addComment} addReply = {addReply} addLike = {addLike} deleteComment = {deleteComment} deleteReply = {deleteReply} setEditingComment = {setEditingComment} setEditCommentModal = {setEditCommentModal} likeComment = {likeComment} likeReply={likeReply} editReply = {editReply} setEditingReply = {setEditingReply} setEditReplyModal = {setEditReplyModal}/>
                )})}
            </div>
            {numPosts > pageNumber * 10 ? (<button className="posts__see-more button" onClick = {e => paginate(e)}>See More Posts</button>) : null}
        </div>
    )
}

Posts.propTypes = {
    getPosts : PropTypes.func.isRequired,
    createPost : PropTypes.func.isRequired,
    editPost : PropTypes.func.isRequired,
    addComment : PropTypes.func.isRequired,
    addLike : PropTypes.func.isRequired,
    addReply : PropTypes.func.isRequired,
    editComment : PropTypes.func.isRequired,
    deletePost : PropTypes.func.isRequired,
    deleteComment : PropTypes.func.isRequired,
    deleteReply : PropTypes.func.isRequired,
    posts : PropTypes.array
}

const mapStateToProps = state => ({
    posts : state.post.posts.posts,
    numPosts : state.post.numPosts,
    loading : state.post.loading
})

export default connect(mapStateToProps, {getPosts, createPost, editPost, deletePost, addComment, addLike, addReply, deleteComment, deleteReply, editComment, likeComment, likeReply, editReply})(withRouter(Posts))
