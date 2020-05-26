import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import $ from "jquery";
import { getPost, addComment, editComment } from "../../actions/post";
import ConfirmationModal from "../common/ConfirmationModal";
import auth from "../../reducers/auth";

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
  addReply,
  addLike,
  removeLike,
  deleteComment,
  deleteReply,
}) => {
  //couldn't figure out 'show more' because it was selecting only the first post
  //     useEffect(() => {
  //         overflowBlock = document.querySelector('.post__main')
  //         if (isOverflown(overflowBlock)) {
  //             setOverflown("overflown");
  //           }
  //     }, [])
  //was used for checking if a post had overflowing text
  const [overflown, setOverflown] = useState("notoverflown");
  //   //checks if post is overflowing
  //   const isOverflown = (e) => {
  //     console.log(e)
  //       if(!e) {
  //           return false;
  //       }
  //       console.log(`scroll ${e.scrollHeight}`)
  //       console.log(`client ${e.clientHeight}`)
  //     return e.scrollHeight > e.clientHeight;
  //   };
  //   let overflowBlock = null;

  //value of comment input
  const [text, updateText] = useState("");
  //value of edited comment
  const [editingComment, setEditingComment] = useState("");
  return (
    <div className="post" data-status={overflown}>
      <div className="post__main">
        <div className="post__header-container">
          {!loading && user._id.toString() == post.user.toString() ? (
            <div className="post__edit">
              <div className="post__edit-icon"></div>
              <div className="post__dropdown">
                <p
                  className="post__dropdown-item"
                  onClick={async (e) => {
                    setPost(post);
                    console.log(JSON.stringify(thisPostState));
                    console.log("opening modal");
                    modalToggle("open");
                    console.log(modal);
                  }}
                >
                  Edit Post
                </p>
                <p
                  className="post__dropdown-item"
                  onClick={(e) => {
                    //TRIGGER SOME CONFIRMATION
                    console.log("trying to delete post");
                    setConfirmationPost(post._id);
                    console.log(confirmationPost);
                    confirmationModalToggle("open");
                    console.log(confirmationModal);
                  }}
                >
                  Delete This Post
                </p>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <div className="post__user-fields">
            <h4 className="post__name">{post.name}</h4>
            <img src={post.avatar} alt="" className="post__avatar" />
          </div>
        </div>
        <h4 className="subheading post__title">{post.title}</h4>
        <div className="post__content-container">
          <p className="post__content">{post.content}</p>
        </div>
      </div>
      <button
        className="post__show-more"
        onClick={(e) => {
          console.log("I EXIST");
          // $('.post__main').css('overflow', 'visible')
          // $('.post__main').css('max-height' , 'fit-content')
        }}
      >
        Show More
      </button>
      <div className="post__interactions">
        <div className="post__likes">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path d="M 6.46875 1 A 0.50005 0.50005 0 0 0 6 1.5 L 6 2.375 C 6 3.5782168 5.6709145 4.4589043 5.4082031 5 L 1 5 L 1 5.5 L 1 14 L 5.4648438 14 L 6 14 L 11.689453 14 C 12.401791 14 13.03169 13.512224 13.185547 12.818359 A 0.50005 0.50005 0 0 0 13.193359 12.775391 L 13.994141 6.7753906 L 13.986328 6.8183594 C 14.192606 5.8871169 13.445053 5 12.490234 5 L 9 5 L 9 3.25 C 9 2.1347222 8.3117537 1.4625874 7.6875 1.2089844 C 7.0632463 0.95538128 6.46875 1 6.46875 1 z M 7 2.0800781 C 7.1318795 2.0988741 7.1621385 2.0736786 7.3125 2.1347656 C 7.6882463 2.2874131 8 2.4902778 8 3.25 L 8 5.5 A 0.50005 0.50005 0 0 0 8.5 6 L 12.490234 6 C 12.849416 6 13.079487 6.2868068 13.009766 6.6015625 A 0.50005 0.50005 0 0 0 13.001953 6.6445312 L 12.207031 12.603516 C 12.155768 12.828253 11.94803 13 11.689453 13 L 6 13 L 6 6.0195312 C 6.2254734 5.6703684 7 4.3403823 7 2.375 L 7 2.0800781 z M 2 6 L 5 6 L 5 13 L 2 13 L 2 6 z M 3.5 11 A 0.5 0.5 0 0 0 3 11.5 A 0.5 0.5 0 0 0 3.5 12 A 0.5 0.5 0 0 0 4 11.5 A 0.5 0.5 0 0 0 3.5 11 z" />
          </svg>
          <p>Like</p>
        </div>
        <div className="post__comments">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="27.678px"
            height="27.678px"
            viewBox="0 0 27.678 27.678"
            style={{ enableBackground: "new 0 0 27.678 27.678" }}
          >
            <g>
              <path
                d="M6.934,26.169c-0.771,0-1.6-0.584-1.6-1.866v-2.119H2.085C0.936,22.184,0,21.249,0,20.1V3.593
		c0-1.149,0.936-2.085,2.085-2.085h23.508c1.149,0,2.085,0.936,2.085,2.086v16.503c0,1.15-0.936,2.087-2.085,2.087H12.892
		L8.16,25.717C7.76,26.018,7.347,26.169,6.934,26.169z M2.085,3.508C2.038,3.508,2,3.546,2,3.593v16.505
		c0,0.047,0.037,0.084,0.085,0.084h5.249v3.656l4.894-3.654h13.365c0.048,0,0.085-0.039,0.085-0.087V3.594
		c0-0.048-0.037-0.086-0.085-0.086H2.085z M24.064,4.988H3.479v13.62h5.224v2.191l3.165-2.191h12.194V4.988H24.064z"
              />
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
          </svg>
          <p>Comment</p>
        </div>
      </div>
      <div className="post__comment-section">
        <div className="post__comment-container">
          {post.comments.map((comment) => (
            <div className="comment">
              <div className="comment__top">
                <div className="comment__user">
                  <img
                    src={comment.avatar}
                    alt=""
                    className="comment__avatar"
                  />
                  <h5 className="comment__name">{comment.name}</h5>
                </div>
                {!loading && user._id.toString() == comment.user.toString() ? (
                  <div className="comment__edit">
                    <div className="comment__edit-icon"></div>
                    <div className="comment__dropdown">
                      <p
                        className="comment__dropdown-item"
                        onClick={async (e) => {
                          //makes the comment editable
                          setEditingComment(comment.text);
                          console.log(e.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].childNodes[0].childNodes[0].readOnly = false);
                        }}
                      >
                        Edit Comment
                      </p>
                      <p
                        className="comment__dropdown-item"
                        onClick={(e) => {
                          //TRIGGER SOME CONFIRMATION
                        }}
                      >
                        Delete This Comment
                      </p>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="comment__bottom">
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
                    setEditingComment('')
                  }}
                >
                  <textarea
                    className="comment__text"
                    readOnly
                    value={editingComment || comment.text}
                    onChange = {e => setEditingComment(e.target.value)}
                  ></textarea>
                </form>
                <div className="comment__like-container">
                  <p className="comment__like-counter">
                    {comment.likes.length > 0 ? comment.likes.length : null}
                  </p>
                  <svg
                    className="comment__like"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M 6.46875 1 A 0.50005 0.50005 0 0 0 6 1.5 L 6 2.375 C 6 3.5782168 5.6709145 4.4589043 5.4082031 5 L 1 5 L 1 5.5 L 1 14 L 5.4648438 14 L 6 14 L 11.689453 14 C 12.401791 14 13.03169 13.512224 13.185547 12.818359 A 0.50005 0.50005 0 0 0 13.193359 12.775391 L 13.994141 6.7753906 L 13.986328 6.8183594 C 14.192606 5.8871169 13.445053 5 12.490234 5 L 9 5 L 9 3.25 C 9 2.1347222 8.3117537 1.4625874 7.6875 1.2089844 C 7.0632463 0.95538128 6.46875 1 6.46875 1 z M 7 2.0800781 C 7.1318795 2.0988741 7.1621385 2.0736786 7.3125 2.1347656 C 7.6882463 2.2874131 8 2.4902778 8 3.25 L 8 5.5 A 0.50005 0.50005 0 0 0 8.5 6 L 12.490234 6 C 12.849416 6 13.079487 6.2868068 13.009766 6.6015625 A 0.50005 0.50005 0 0 0 13.001953 6.6445312 L 12.207031 12.603516 C 12.155768 12.828253 11.94803 13 11.689453 13 L 6 13 L 6 6.0195312 C 6.2254734 5.6703684 7 4.3403823 7 2.375 L 7 2.0800781 z M 2 6 L 5 6 L 5 13 L 2 13 L 2 6 z M 3.5 11 A 0.5 0.5 0 0 0 3 11.5 A 0.5 0.5 0 0 0 3.5 12 A 0.5 0.5 0 0 0 4 11.5 A 0.5 0.5 0 0 0 3.5 11 z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        <form
          className="post__create-comment"
          onSubmit={(e) => {
            e.preventDefault();
            addComment({ text }, post._id);
            console.log("passed addcomment");
            updateText("");
          }}
        >
          <input
            type="text"
            value={text}
            className="post__comment-input"
            placeholder="Write a comment..."
            onChange={(e) => updateText(e.target.value)}
          />
          <button className="post__send-comment">Send</button>
        </form>
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
