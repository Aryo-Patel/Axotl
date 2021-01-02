import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import $ from "jquery";
// import { getPost, addComment, editComment, likeReply } from "../../actions/post";
import ConfirmationModal from "../common/ConfirmationModal";
import auth from "../../reducers/auth";
import Moment from "react-moment";
import {
  optimisticRenderingPost,
  optimisticRenderingComment,
  optimisticRenderingReply,
} from "./utils/optimisticRendering";
import dateComparison from "./utils/dateComparison";

const Post = ({
  loading,
  user,
  post,
  deletePost,
  editPost,
  confirmationModalToggle,
  modal,
  modalToggle,
  setPost,
  thisPostState,
  confirmationModal,
  setConfirmationPost,
  confirmationPost,
  addComment,
  editComment,
  addReply,
  addLike,
  removeLike,
  deleteComment,
  deleteReply,
  setEditingComment,
  setEditCommentModal,
  editReply,
  likeComment,
  likeReply,
  setEditingReply,
  setEditReplyModal,
  index,
}) => {
  // useEffect(() => {
  //   //console.log(document.querySelectorAll('.post__comment-container')[index].scrollHeight)
  //   //console.log(window.innerHeight/10*4)
  //   //console.log(document.querySelectorAll('.post__comment-container')[index].clientHeight < document.querySelectorAll('.post__comment-container')[index].scrollHeight)
  //   toggleSeeMore(
  //     document.querySelectorAll(".post__comment-container")[index]
  //       .scrollHeight >
  //       0.4 * window.innerHeight || extendComments == "extended"
  //       ? "on"
  //       : "off"
  //   );
  // });
  //state for creating comments
  const [text, updateText] = useState("");
  //state to check if a post is liked or not
  const [liked, setLiked] = useState(
    post.likes.filter((like) => like.user.toString() == user._id.toString())
      .length > 0
  );

  //COMMENTS SECTION 'SEE MORE'
  const [seeMore, toggleSeeMore] = useState("on");
  const [extendComments, toggleExtendComments] = useState("limited");
  console.log("breaking up console.log");
  return (
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
                    setPost(post);
                    //console.log(JSON.stringify(thisPostState));
                    //console.log("opening modal");
                    modalToggle("open");
                    //console.log(modal);
                  }}
                >
                  Edit Post
                </p>
                <p
                  className="post__dropdown-item"
                  onClick={(e) => {
                    //TRIGGER SOME CONFIRMATION
                    //console.log("trying to delete post");
                    setConfirmationPost(post._id);
                    //console.log(confirmationPost);
                    confirmationModalToggle("open");
                    //console.log(confirmationModal);
                  }}
                >
                  Delete This Post
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
            {post.content.substring(0, 980)}
            {!(post.content.length > 980) ? null : (
              <span
                className="post__read-more"
                onClick={(e) => {
                  e.target.parentNode.innerHTML = post.content;
                }}
              >
                ... Read More
              </span>
            )}
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
            if (e.target.classList.contains("post__comments")) {
              e.target.parentNode.parentNode.childNodes[2].childNodes[2].childNodes[0].childNodes[0].focus();
            } else if (e.target.classList.contains("post__comment-icon")) {
              e.target.parentNode.parentNode.parentNode.childNodes[2].childNodes[2].childNodes[0].childNodes[0].focus();
            }
            // else if(e.target.classList.contains('post__comment-icon')) {
            //     e.target.parentNode.parentNode)
            // }
            else if (e.target.classList.contains("post__comment-label")) {
              e.target.parentNode.parentNode.parentNode.childNodes[2].childNodes[2].childNodes[0].childNodes[0].focus();
            } else {
              e.target.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[2].childNodes[2].childNodes[0].childNodes[0].focus();
            }
            // $('.post__comment-input').focus();
          }}></i>
      </div>
    </div>
  );
};

Post.propTypes = {};

const mapStateToProps = (state) => ({
  user: state.auth.user.user,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {})(Post);
