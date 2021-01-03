import React, { useState, useEffect, Fragment, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {editPost, getPost, deletePost, addComment, addLike, addReply, deleteComment, deleteReply, editComment, likeComment, likeReply, editReply} from "../../actions/post";
import ConfirmationModal from "../common/ConfirmationModal";
import EditPost from '../posts/EditPost'
import EditComment from '../posts/EditComment'
import EditReply from '../posts/EditReply'
import {useHistory} from 'react-router-dom'
import Moment from "react-moment";
import {
  optimisticRenderingPost,
  optimisticRenderingComment,
  optimisticRenderingReply,
} from "../posts/utils/optimisticRendering";
import dateComparison from "../posts/utils/dateComparison";
import Spinner from '../common/Spinner'
import './styling/main.css'

const Post = ({
  loading,
  user,
  deletePost,
  editPost,
  post,
  thisPostState,
  addComment,
  editComment,
  addReply,
  addLike,
  removeLike,
  deleteComment,
  deleteReply,
  editReply,
  likeComment,
  likeReply,
  index,
  getPost
}) => {
  useEffect(() => {
    getPost(window.location.href.split("/")[4])
  }, [getPost, addComment, addLike, addReply]);
  useEffect(() => {
    if(post != null) setLiked(post.likes.filter((like) => like.user.toString() == user._id.toString())
    .length > 0)
  }, [post])
  let history = useHistory();
  //state for creating comments
  const [text, updateText] = useState("");
  //state to check if a post is liked or not
  const [liked, setLiked] = useState(false);
  const topCommentRef = useRef(null)

  //value for editing post modal to be open or closed
  const [modal, modalToggle] = useState('closed');
  //value of whether confirm deletion modal is open
  const [confirmationModal, setConfirmationModal] = useState('closed');
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

  //COMMENTS SECTION 'SEE MORE'
  const [seeMore, toggleSeeMore] = useState("on");
  const [extendComments, toggleExtendComments] = useState("limited");
  console.log("breaking up console.log");

  const handleCommentLike = (e, comment) => {
    console.log("onclick hit");
    let div = null;
    let svg = null;
    let label = null;
    console.log(Boolean(e.target.parentNode.dataset.loading))
    if (!(e.target.parentNode.dataset.loading === "false")) {
      if (e.target.classList.contains("comment__like")) {
        //extracting variables
        div = e.target.parentNode;
        label = e.target.parentNode.childNodes[0];
        svg = e.target;
        console.log("first route hit");
        //setting data values on div for front end logic
        div.dataset.loading = "true";
        div.dataset.loadingtemp = div.dataset.status ==="false" ? "true" : "false";
        div.dataset.requestcounter = Number(div.dataset.requestcounter = div.dataset
          .requestcounter)+ 1;
        //calling action and optimistic rendering
        likeComment(post._id, comment._id, div);
        optimisticRenderingComment(
          svg,
          label,
          e.target.parentNode.dataset.status
        );
      } else {
        div = e.target.parentNode.parentNode;
        label =
          e.target.parentNode.parentNode.childNodes[0];
        svg = e.target.parentNode;
        console.log("second route hit");
        div.dataset.loading = "true";
        div.dataset.loadingtemp = div.dataset.status ==="false" ? "true" : "false";
        div.dataset.requestcounter = Number(div.dataset.requestcounter = div.dataset
          .requestcounter)+ 1;
        likeComment(post._id, comment._id, div);
        optimisticRenderingComment(
          svg,
          label,
          div.dataset.status
        );
      }
    } else {
      if (e.target.classList.contains("comment__like")) {
        div = e.target.parentNode;
        label = e.target.parentNode.childNodes[0];
        svg = e.target;
        div.dataset.loadingtemp = div.dataset.loadingtemp ==="false" ? "true" : "false";
        div.dataset.requestcounter = Number(div.dataset.requestcounter = div.dataset
          .requestcounter)+ 1;
        likeComment(
          post._id,
          comment._id,
          e.target.parentNode
        );
        optimisticRenderingComment(
          svg,
          label,
          div.dataset.loadingtemp
        );
      } else {
        div = e.target.parentNode.parentNode;
        label =
          e.target.parentNode.parentNode.childNodes[0];
        svg = e.target.parentNode;
        div.dataset.loadingtemp = div.dataset.loadingtemp ==="false" ? "true" : "false";
        div.dataset.requestcounter = Number(div.dataset.requestcounter = div.dataset
          .requestcounter)+ 1;
        likeComment(
          post._id,
          comment._id,
          e.target.parentNode.parentNode
        );
        optimisticRenderingComment(
          e.target.parentNode,
          e.target.parentNode.parentNode.childNodes[0],
          e.target.parentNode.parentNode.dataset.loadingtemp
        );
      }
    }
  }

  const handleReplyLike = (e, comment, reply) => {
    console.log("onclick hit");
    let div = null;
    let svg = null;
    let label = null;
    if (!(e.target.parentNode.dataset.loading === "false")) {
      if (
        e.target.classList.contains("reply__like")
      ) {
        //extracting variables
        div = e.target.parentNode;
        label = e.target.parentNode.childNodes[0];
        svg = e.target;
        console.log(div.dataset)
        console.log("first route hit");
        //setting data values on div for front end logic
        div.dataset.loading = "true";
        div.dataset.loadingtemp = div.dataset.status ==="false" ? "true" : "false";
        div.dataset.requestcounter = Number(div.dataset
          .requestcounter)+1;
          console.log(div.dataset.requestcounter)
        //calling action and optimistic rendering
        likeReply(
          post._id,
          comment._id,
          reply._id,
          div
        );
        optimisticRenderingReply(
          svg,
          label,
          div.dataset.status
        );
      } else {
        div = e.target.parentNode.parentNode;
        label =
          e.target.parentNode.parentNode
            .childNodes[0];
        svg = e.target.parentNode;
        console.log(div.dataset)
        console.log("second route hit");
        div.dataset.loading = "true";
        div.dataset.loadingtemp = div.dataset.status ==="false" ? "true" : "false";
        div.dataset.requestcounter = Number(div.dataset
          .requestcounter)+1;
          console.log(div.dataset.requestcounter)
        likeReply(
          post._id,
          comment._id,
          reply._id,
          div
        );
        optimisticRenderingReply(
          svg,
          label,
          div.dataset.status
        );
      }
    } else {
      if (
        e.target.classList.contains("reply__like")
      ) {
        div = e.target.parentNode;
        label = e.target.parentNode.childNodes[0];
        svg = e.target;
        console.log(div.dataset)
        div.dataset.loadingtemp = div.dataset.loadingtemp ==="false" ? "true" : "false";
        div.dataset.requestcounter = Number(div.dataset
          .requestcounter)+1;
          console.log(div.dataset.requestcounter)
        likeReply(
          post._id,
          comment._id,
          reply._id,
          div
        );
        optimisticRenderingReply(
          svg,
          label,
          div.dataset.loadingtemp
        );
      } else {
        div = e.target.parentNode.parentNode;
        label =
          e.target.parentNode.parentNode
            .childNodes[0];
        svg = e.target.parentNode;
        console.log(div.dataset)
        div.dataset.loadingtemp = div.dataset.loadingtemp ==="false" ? "true" : "false";
        div.dataset.requestcounter = Number(div.dataset
          .requestcounter)+1;
          console.log(div.dataset.requestcounter)
        likeReply(
          post._id,
          comment._id,
          reply._id,
          div
        );
        optimisticRenderingReply(
          svg,
          label,
          div.dataset
            .loadingtemp
        );
      }
    }
  }
  return (
      <Fragment>
          <div className="post__back-arrow">
              <label htmlFor="#back">Back To Posts</label>
            <i id="back" className="fas fa-long-arrow-alt-left fa-5x" style={{color: "black", cursor: "pointer"}} onClick = {e => history.push("/posts")}></i>
          </div>
          {loading ? <Spinner /> : (<Fragment>
          <EditPost postState = {post} editPost = {editPost} modal = {modal} modalToggle = {modalToggle}/>
            <ConfirmationModal setConfirmationModal = {setConfirmationModal} text = 'Are you sure you want to do this?' parentClassName='posts' confirmationModal={confirmationModal} confirmationPost = {confirmationPost} deletePost = {deletePost}/>
            <EditComment editingComment = {editingComment} setEditCommentModal = {setEditCommentModal} editCommentModal = {editCommentModal} postState = {post} editComment = {editComment} />
            <EditReply editingReply = {editingReply} setEditReplyModal = {setEditReplyModal} editReplyModal = {editReplyModal} postState = {post} editReply = {editReply} editingComment = {editingComment}/>
            </Fragment>)}
      {loading ? <Spinner /> : (<div className="singularPost__wrapper">
      <div className="post">
      <div className="post__main">
        <div className="post__header-container">
        <div className="post__user-fields">
          <div className="post__fields-wrapper">
            <img src={post.avatar} alt="" className="post__avatar" />
            <div className="post__userTitle">
              <h4 className="post__name">{post.name}</h4>
              {/* <p>
                <small>{post.sponsor ? "Sponsor" : "Organizer"}</small>
              </p> */}
            </div>
            <p className="post__name-separator">&#8226;</p>
            <p className="post__date">{dateComparison(Date.now(), post.Date)}</p>
          </div>
          </div>
          {!loading && user._id.toString() == post.user.toString() ? (
            <div className="post__edit">
              <div className="post__edit-icon"></div>
              <div className="post__dropdown">
                <p
                  className="post__dropdown-item"
                  onClick={async (e) => {
                    //console.log(JSON.stringify(thisPostState));
                    //console.log("opening modal");
                    modalToggle("open");
                    //console.log(modal);
                  }}
                >
                  Edit
                </p>
                <p
                  className="post__dropdown-item"
                  onClick={(e) => {
                    //TRIGGER SOME CONFIRMATION
                    //console.log("trying to delete post");
                    setConfirmationPost(post._id);
                    //console.log(confirmationPost);
                    setConfirmationModal("open");
                    //console.log(confirmationModal);
                  }}
                >
                  Delete
                </p>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <h4 className="subheading post__title">{post.title}</h4>
        <div className="post__content-container">
          <p className="post__content">
            {post.content}
          </p>
        </div>
      </div>
      <div className="post__interactions">
        <div className="post__likes" data-status={liked}>
          <p className="post__likes-counter">
            {post.likes.length > 0 ? post.likes.length : `\u00a0`}
          </p>

          <i className="far fa-heart fa-2x post__like-icon" style={{color: liked ? "red" : "#2f72ff"}} onClick={(e) => {
              addLike(post._id);
              optimisticRenderingPost(e, liked);
              !liked ? setLiked(true) : setLiked(false);
            }}></i>
        </div>
          <i className="far fa-comment fa-2x post__comment-icon" onClick={(e) => {
            topCommentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}></i>
      </div>
    </div>
    <div className="post__comment-section">
        <div
          className="post__comment-container"
          data-status={extendComments}
          data-number={0}
        >
          {post.comments.map((comment, index) => (
            <div ref={index == 0 ? topCommentRef : null} key={index} className="comment__section">
              <div className="comment">
                <div className="comment__top">
                  <div className="comment__user">
                    <img
                      src={comment.avatar}
                      alt=""
                      className="comment__avatar"
                    />
                    <div className="comment__title">
                        <h4 className="comment__name">{comment.name}</h4>
                    </div>
                    <p className="comment__name-separator">&#8226;</p>
                    <p className="comment__date">{dateComparison(Date.now(), comment.Date)}</p>
                  </div>
                  {!loading &&
                  user._id.toString() == comment.user.toString() ? (
                    <div className="comment__edit">
                      <div className="comment__edit-icon"></div>
                      <div className="comment__dropdown">
                        <p
                          className="comment__dropdown-item"
                          onClick={async (e) => {
                            //makes the comment editable
                            setEditingComment(comment);
                            setEditCommentModal("open");
                          }}
                        >
                          Edit
                        </p>
                        <p
                          className="comment__dropdown-item"
                          onClick={(e) => {
                            deleteComment(post._id, comment._id);
                          }}
                        >
                          Delete
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                <div className="comment__middle">
                  <form
                    action=""
                    className="comment_text-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      editComment(
                        { text: e.target.value },
                        post._id,
                        comment._id
                      );
                      e.target.readOnly = true;
                      setEditingComment("");
                    }}
                  >
                    <p className="comment__text">
                      {comment.text.substring(0, 487)}
                      {!(comment.text.length > 487) ? null : (
                        <span
                          className="comment__read-more"
                          onClick={(e) => {
                            e.target.parentNode.innerHTML = comment.text;
                          }}
                        >
                          ... Read More
                        </span>
                      )}
                    </p>
                  </form>
                </div>
                <div className="comment__bottom">
                  <div
                    className="comment__like-container"
                    data-status={
                      comment.likes.filter(
                        (like) => like.user.toString() == user._id.toString()
                      ).length > 0
                    }
                    data-loading="false"
                    data-loadingtemp="false"
                    data-requestcounter={0}
                  >
                    <label className="comment__like-counter">
                      {comment.likes.length > 0
                        ? comment.likes.length
                        : "\u00a0"}
                    </label>
                    <i className="far fa-heart comment__like"
                      onClick={(e) => {handleCommentLike(e, comment)}}
                      
                    >
                      </i>
                  </div>
                  
                  <div className="comment__replies">
                    <label className="comment__reply-counter">
                      {comment.replies.length > 0
                        ? comment.replies.length
                        : null}
                    </label>
                    <i
                      onClick={(e) => {
                        if (
                          e.target.parentNode.parentNode.parentNode.parentNode
                            .childNodes[1].dataset.status == "dropped"
                        ) {
                          e.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].dataset.status =
                            "up";
                          e.target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.number =
                            "0";
                        } else {
                          e.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].dataset.status =
                            "dropped";
                          //console.log(comment.replies.length)
                          //console.log(e.target.parentNode.parentNode.parentNode.parentNode.parentNode)
                          e.target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.number =
                            "" +
                            (comment.replies.length == 0
                              ? -1
                              : comment.replies.length);
                        }
                      }}
                      className="fas fa-reply comment__reply"
                    >
                    </i>
                  </div>
                </div>
              </div>
              <div className="comment__replies-section" data-status="up">
                <div className="comment__reply-container">
                  {!loading &&
                    comment.replies.map((reply, index) => (
                      <div key={index} className="reply">
                        <div className="reply__top">
                          <div className="reply__user">
                            <img
                              src={reply.avatar}
                              alt=""
                              className="reply__avatar"
                            />
                            <div className="reply__title">
                            <h4 className="reply__name">{reply.name}</h4>
                            </div>
                            <p className="reply__name-separator">&#8226;</p>
                            <p className="reply__date">{dateComparison(Date.now(), comment.Date)}</p>
                          </div>
                          {!loading &&
                          user._id.toString() == reply.user.toString() ? (
                            <div className="reply__edit">
                              <div className="reply__edit-icon"></div>
                              <div className="reply__dropdown">
                                <p
                                  className="reply__dropdown-item"
                                  onClick={async (e) => {
                                    //makes the comment editable
                                    setEditingReply(reply);
                                    setEditingComment(comment);
                                    setEditReplyModal("open");
                                  }}
                                >
                                  Edit
                                </p>
                                <p
                                  className="reply__dropdown-item"
                                  onClick={(e) => {
                                    deleteReply(
                                      post._id,
                                      comment._id,
                                      reply._id
                                    );
                                  }}
                                >
                                  Delete
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <div className="reply__middle">
                          <form
                            action=""
                            className="reply_text-form"
                            onSubmit={(e) => {
                              e.preventDefault();
                              editReply(
                                { text: e.target.value },
                                post._id,
                                comment._id,
                                reply._id
                              );
                              e.target.readOnly = true;
                              setEditingReply("");
                            }}
                          >
                            <p className="reply__text">
                              {reply.text.substring(0, 210)}
                              {!(reply.text.length > 210) ? null : (
                                <span
                                  className="reply__read-more"
                                  onClick={(e) => {
                                    e.target.parentNode.innerHTML = reply.text;
                                  }}
                                >
                                  ... Read More
                                </span>
                              )}
                            </p>
                          </form>
                        </div>
                        <div className="reply__bottom">
                          <div
                            className="reply__like-container"
                            data-status={
                                reply.likes.filter(
                                  (like) => like.user.toString() == user._id.toString()
                                ).length > 0
                              }
                            data-loading="false"
                            data-loadingtemp="false"
                            data-requestcounter={0}
                          >
                            <label className="reply__like-counter">
                              {reply.likes.length > 0
                                ? reply.likes.length
                                : "\u00a0"}
                            </label>
                            <i className="far fa-heart reply__like"
                              onClick={(e) => handleReplyLike(e, comment, reply)}
                            >
                              </i>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <form
                  className="comment__reply-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    addReply(
                      e.target.childNodes[0].value,
                      post._id,
                      comment._id
                    );
                    console.log(e.target);
                    e.target.childNodes[0].value = "";
                  }}
                >
                  <input
                    type="text"
                    className="comment__reply-input"
                    placeholder="Write a reply..."
                  />
                  <button className="comment__reply-send">Send</button>
                </form>
              </div>
            </div>
          ))}
        </div>
        <div className="post__create-comments">
          <form
            className="post__create-comment"
            onSubmit={(e) => {
              e.preventDefault();
              addComment({ text }, post._id);
              //console.log("passed addcomment");
              updateText("");
              getPost(post._id);
            }}
          >
            <input
              type="text"
              value={text}
              className="post__comment-input"
              placeholder="Write a comment..."
              onChange={(e) => updateText(e.target.value)}
            />
            <button className="post__send-comment">
                <i className="fas fa-arrow-up"></i>
            </button>
          </form>
        </div>
      </div>
    </div>)}
    </Fragment>
  );
};

Post.propTypes = {
    getPost : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.auth.user.user,
  post: state.post.post,
  loading: state.post.singularLoading,
});

export default connect(mapStateToProps, {editPost, getPost, deletePost, addComment, addLike, addReply, deleteComment, deleteReply, editComment, likeComment, likeReply, editReply})(Post);
