import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import $ from "jquery";
// import { getPost, addComment, editComment, likeReply } from "../../actions/post";
import ConfirmationModal from "../common/ConfirmationModal";
import auth from "../../reducers/auth";
import Moment from "react-moment";

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
  index
}) => {
  useEffect(() => {
    console.log(document.querySelectorAll('.post__comment-container')[index].scrollHeight)
    console.log(window.innerHeight/10*4)
    console.log(document.querySelectorAll('.post__comment-container')[index].clientHeight < document.querySelectorAll('.post__comment-container')[index].scrollHeight)
    toggleSeeMore(document.querySelectorAll('.post__comment-container')[index].scrollHeight > .4*window.innerHeight || extendComments == 'extended' ? 'on' : 'off' )
  })
  //state for creating comments
  const [text, updateText] = useState("");
  //state to check if a post is liked or not
  const [liked, setLiked] = useState(
    post.likes.filter((like) => like.user.toString() == user._id.toString())
      .length > 0
  );

  //COMMENTS SECTION 'SEE MORE'
  const [seeMore, toggleSeeMore] = useState('on')
  const [extendComments, toggleExtendComments] = useState('limited')


  return (
    <div className="post">
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
          <Moment className="post__date" format="hh:mm MM/DD/YYYY">
            {post.Date}
          </Moment>
        </div>
      </div>
      <div className="post__interactions">
        <div className="post__likes" data-status={liked}>
          <p>{post.likes.length > 0 ? post.likes.length : null}</p>
          <svg
            onClick={(e) => {
              addLike(post._id);
              !liked ? setLiked(true) : setLiked(false);
            }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <path
              id="likeSVG"
              d="M 6.46875 1 A 0.50005 0.50005 0 0 0 6 1.5 L 6 2.375 C 6 3.5782168 5.6709145 4.4589043 5.4082031 5 L 1 5 L 1 5.5 L 1 14 L 5.4648438 14 L 6 14 L 11.689453 14 C 12.401791 14 13.03169 13.512224 13.185547 12.818359 A 0.50005 0.50005 0 0 0 13.193359 12.775391 L 13.994141 6.7753906 L 13.986328 6.8183594 C 14.192606 5.8871169 13.445053 5 12.490234 5 L 9 5 L 9 3.25 C 9 2.1347222 8.3117537 1.4625874 7.6875 1.2089844 C 7.0632463 0.95538128 6.46875 1 6.46875 1 z M 7 2.0800781 C 7.1318795 2.0988741 7.1621385 2.0736786 7.3125 2.1347656 C 7.6882463 2.2874131 8 2.4902778 8 3.25 L 8 5.5 A 0.50005 0.50005 0 0 0 8.5 6 L 12.490234 6 C 12.849416 6 13.079487 6.2868068 13.009766 6.6015625 A 0.50005 0.50005 0 0 0 13.001953 6.6445312 L 12.207031 12.603516 C 12.155768 12.828253 11.94803 13 11.689453 13 L 6 13 L 6 6.0195312 C 6.2254734 5.6703684 7 4.3403823 7 2.375 L 7 2.0800781 z M 2 6 L 5 6 L 5 13 L 2 13 L 2 6 z M 3.5 11 A 0.5 0.5 0 0 0 3 11.5 A 0.5 0.5 0 0 0 3.5 12 A 0.5 0.5 0 0 0 4 11.5 A 0.5 0.5 0 0 0 3.5 11 z"
            />
          </svg>
          <p>Like</p>
        </div>
        <div className="post__comments">
          <svg
            onClick={(e) => {
              e.target.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[2].childNodes[1].childNodes[0].focus();
            }}
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
        <div className="post__comment-container"  data-status={extendComments} data-number = {0}>
          {post.comments.map((comment, index) => (
            <div key={index} className="comment__section">
            <div  className="comment">
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
                          setEditingComment(comment);
                          setPost(post);
                          setEditCommentModal("open");
                        }}
                      >
                        Edit Comment
                      </p>
                      <p
                        className="comment__dropdown-item"
                        onClick={(e) => {
                          deleteComment(post._id, comment._id);
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
                    {comment.text.substring(0, 210)}
                    {!(comment.text.length > 210) ? null : (
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
                <Moment className="post__date" format="hh:mm MM/DD/YYYY">
                  {comment.Date}
                </Moment>
                <div className="comment__like-container" data-status = {comment.likes.filter((like) => like.user.toString() == user._id.toString())
      .length > 0}>
                  <label className="comment__like-counter">
                    {comment.likes.length > 0 ? comment.likes.length : " "}
                  </label>
                  <svg
                    onClick={(e) => {
                      likeComment(post._id, comment._id);
                    }}
                    className="comment__like"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M 6.46875 1 A 0.50005 0.50005 0 0 0 6 1.5 L 6 2.375 C 6 3.5782168 5.6709145 4.4589043 5.4082031 5 L 1 5 L 1 5.5 L 1 14 L 5.4648438 14 L 6 14 L 11.689453 14 C 12.401791 14 13.03169 13.512224 13.185547 12.818359 A 0.50005 0.50005 0 0 0 13.193359 12.775391 L 13.994141 6.7753906 L 13.986328 6.8183594 C 14.192606 5.8871169 13.445053 5 12.490234 5 L 9 5 L 9 3.25 C 9 2.1347222 8.3117537 1.4625874 7.6875 1.2089844 C 7.0632463 0.95538128 6.46875 1 6.46875 1 z M 7 2.0800781 C 7.1318795 2.0988741 7.1621385 2.0736786 7.3125 2.1347656 C 7.6882463 2.2874131 8 2.4902778 8 3.25 L 8 5.5 A 0.50005 0.50005 0 0 0 8.5 6 L 12.490234 6 C 12.849416 6 13.079487 6.2868068 13.009766 6.6015625 A 0.50005 0.50005 0 0 0 13.001953 6.6445312 L 12.207031 12.603516 C 12.155768 12.828253 11.94803 13 11.689453 13 L 6 13 L 6 6.0195312 C 6.2254734 5.6703684 7 4.3403823 7 2.375 L 7 2.0800781 z M 2 6 L 5 6 L 5 13 L 2 13 L 2 6 z M 3.5 11 A 0.5 0.5 0 0 0 3 11.5 A 0.5 0.5 0 0 0 3.5 12 A 0.5 0.5 0 0 0 4 11.5 A 0.5 0.5 0 0 0 3.5 11 z" />
                  </svg>
                </div>
                <div className="comment__replies">
                  <label className="comment__reply-counter">
                    {comment.replies.length > 0 ? comment.replies.length : null}
                  </label>
                  <svg
                    onClick={(e) => {
                     
                      if(e.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].dataset.status=='dropped') {
                        e.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].dataset.status='up'
                        e.target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.number='0'
                      } else {
                      e.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].dataset.status='dropped'
                      console.log(comment.replies.length)
                      console.log(e.target.parentNode.parentNode.parentNode.parentNode.parentNode)
                      e.target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.number='' + (comment.replies.length == 0 ? -1 : comment.replies.length)
                      }
                    }}
                    className="comment__reply"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 511.971 511.971"
                    style={{ enableBackground: "new 0 0 511.971 511.971" }}
                  >
                    <g>
                      <g>
                        <g>
                          <path
                            d="M444.771,235.493c-58.987-56.32-138.347-64-167.467-64.747V96.079c0-5.867-4.8-10.667-10.667-10.667
				c-2.453,0-4.907,0.853-6.827,2.453L78.478,237.199c-4.587,3.733-5.227,10.453-1.493,15.04c0.427,0.533,0.96,0.96,1.493,1.493
				l181.333,149.333c4.587,3.733,11.307,3.093,15.04-1.493c1.6-1.92,2.453-4.267,2.453-6.827v-77.44
				c29.76-8.107,143.893-28.693,214.613,103.787c1.813,3.52,5.44,5.653,9.387,5.653c3.413,0,6.72-1.6,8.853-4.693
				c1.28-1.813,1.813-4.053,1.813-6.293C511.865,338.639,489.251,278.053,444.771,235.493z M324.131,290.533
				c-35.52,0-60.48,8.533-61.12,8.853c-4.267,1.493-7.04,5.547-7.04,10.027v62.72l-153.92-126.72l153.92-126.72v62.72
				c0,2.88,1.173,5.653,3.307,7.68c2.133,2.027,4.907,3.093,7.893,2.987c0.96,0,97.813-3.52,163.093,58.987
				c32.107,30.72,51.52,72.32,58.027,124.16C436.665,305.679,371.171,290.533,324.131,290.533z"
                          />
                          <path
                            d="M199.331,387.066c-0.213-0.107-0.32-0.32-0.533-0.427L27.385,245.413l171.413-141.12
				c4.693-3.627,5.547-10.347,1.92-14.933c-3.627-4.587-10.347-5.547-14.933-1.92c-0.213,0.107-0.32,0.32-0.533,0.427L3.918,237.199
				c-4.587,3.733-5.227,10.453-1.493,15.04c0.427,0.533,0.96,0.96,1.493,1.493l181.333,149.333c4.48,3.84,11.2,3.413,15.04-0.96
				C204.131,397.626,203.705,390.906,199.331,387.066z"
                          />
                        </g>
                      </g>
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
                </div>
              </div>
            </div>
            <div className="comment__replies-section" data-status='up'>
                <div className="comment__reply-container">
                    {!loading && comment.replies.map((reply, index) => (
                      <div key = {index} className="reply">
                        <div className="reply__top">
                <div className="reply__user">
                  <img
                    src={reply.avatar}
                    alt=""
                    className="reply__avatar"
                  />
                  <h5 className="reply__name">{reply.name}</h5>
                </div>
                {!loading && user._id.toString() == reply.user.toString() ? (
                  <div className="reply__edit">
                    <div className="reply__edit-icon"></div>
                    <div className="reply__dropdown">
                      <p
                        className="reply__dropdown-item"
                        onClick={async (e) => {
                          //makes the comment editable
                          setEditingReply(reply);
                          setEditingComment(comment);
                          setPost(post);
                          setEditReplyModal("open");
                        }}
                      >
                        Edit Reply
                      </p>
                      <p
                        className="reply__dropdown-item"
                        onClick={(e) => {
                          deleteReply(post._id, comment._id, reply._id);
                        }}
                      >
                        Delete This Reply
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
                <Moment className="reply__date" format="hh:mm MM/DD/YYYY">
                  {reply.Date}
                </Moment>
                <div className="reply__like-container"  data-status = {reply.likes.filter((like) => like.user.toString() == user._id.toString())
      .length > 0}>
                  <label className="reply__like-counter">
                    {reply.likes.length > 0 ? reply.likes.length : " "}
                  </label>
                  <svg
                    onClick={(e) => {
                      likeReply(post._id, comment._id, reply._id);
                    }}
                    className="reply__like"
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
                <form className="comment__reply-form" onSubmit = {e => {
                  e.preventDefault();
                  addReply(e.target.childNodes[0].value, post._id, comment._id)
                }}>
                    <input type="text" className="comment__reply-input" placeholder='Write a reply...' />
                <button className="comment__reply-send">Send</button>
                </form>
              </div>
            </div>
          ))}
        </div>
        <div className="comment__see-more" data-status={seeMore} onClick = {e => {
          if(extendComments == 'limited') {
            toggleExtendComments('extended')
            e.target.innerHTML = 'See Fewer Comments'
            } else {
              toggleExtendComments('limited')
              e.target.innerHTML = 'See More Comments'
            }
            }}>See More Comments</div>
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
