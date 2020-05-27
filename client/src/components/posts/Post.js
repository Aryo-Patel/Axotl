import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import $ from "jquery";
import { getPost } from "../../actions/post";
import ConfirmationModal from "../common/ConfirmationModal";

const Post = ({ post, deletePost, editPost,confirmationModalToggle, modal, modalToggle, setPost, thisPostState, confirmationModal, setConfirmationPost, confirmationPost }) => {
  //couldn't figure out 'show more' because it was selecting only the first post
  //     useEffect(() => {
  //         overflowBlock = document.querySelector('.post__main')
  //         if (isOverflown(overflowBlock)) {
  //             setOverflown("overflown");
  //           }
  //     }, [])
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
  return (
    <div className="post" data-status={overflown}>
      <div className="post__main">
        <div className="post__header-container">
            <div className="post__edit">
                <div className="post__edit-icon"></div>
            <div className="post__dropdown">
                    <p className="post__dropdown-item" onClick = {async e => {
                        setPost(post);
                        console.log(JSON.stringify(thisPostState))
                        console.log('opening modal')
                        modalToggle('open')
                        console.log(modal)}}>Edit Post</p>
                    <p className="post__dropdown-item" onClick = {e => {
                        //TRIGGER SOME CONFIRMATION
                        console.log('trying to delete post')
                        setConfirmationPost(post._id)
                        console.log(confirmationPost)
                        confirmationModalToggle('open')
                        console.log(confirmationModal)}}>Delete This Post</p>
                </div>
            </div>
            
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
      <div className="post__interactions">
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
        <div className="post__likes">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style={{ enableBackground: "new 0 0 512 512" }}
          >
            <g>
              <g>
                <g>
                  <path
                    d="M495.736,290.773C509.397,282.317,512,269.397,512,260.796c0-22.4-18.253-47.462-42.667-47.462H349.918
				c-4.284-0.051-25.651-1.51-25.651-25.6c0-4.71-3.814-8.533-8.533-8.533s-8.533,3.823-8.533,8.533
				c0,33.749,27.913,42.667,42.667,42.667h119.467c14.182,0,25.6,16.631,25.6,30.396c0,4.437,0,17.946-26.53,20.855
				c-4.506,0.495-7.834,4.42-7.586,8.951c0.239,4.523,3.985,8.064,8.516,8.064c14.114,0,25.6,11.486,25.6,25.6
				s-11.486,25.6-25.6,25.6h-17.067c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533c14.114,0,25.6,11.486,25.6,25.6
				s-11.486,25.6-25.6,25.6h-25.6c-4.719,0-8.533,3.823-8.533,8.533s3.814,8.533,8.533,8.533c8.934,0,17.067,8.132,17.067,17.067
				c0,8.61-8.448,17.067-17.067,17.067h-128c-35.627,0-48.444-7.074-63.292-15.258c-12.553-6.921-26.786-14.763-54.963-18.79
				c-4.668-0.674-8.994,2.577-9.66,7.236c-0.666,4.668,2.569,8.994,7.236,9.66c25.105,3.584,37.325,10.325,49.152,16.845
				c15.497,8.542,31.505,17.374,71.526,17.374h128c17.869,0,34.133-16.273,34.133-34.133c0-6.229-1.775-12.134-4.83-17.229
				c21.794-1.877,38.963-20.224,38.963-42.505c0-10.829-4.062-20.736-10.735-28.271C500.42,358.212,512,342.571,512,324.267
				C512,310.699,505.634,298.59,495.736,290.773z"
                  />
                  <path
                    d="M76.8,443.733c9.412,0,17.067-7.654,17.067-17.067S86.212,409.6,76.8,409.6c-9.412,0-17.067,7.654-17.067,17.067
				S67.388,443.733,76.8,443.733z"
                  />
                  <path
                    d="M179.2,247.467c25.353,0,57.429-28.297,74.3-45.167c36.634-36.634,36.634-82.167,36.634-151.1
				c0-5.342,3.191-8.533,8.533-8.533c29.508,0,42.667,13.158,42.667,42.667v102.4c0,4.71,3.814,8.533,8.533,8.533
				s8.533-3.823,8.533-8.533v-102.4c0-39.083-20.659-59.733-59.733-59.733c-14.831,0-25.6,10.769-25.6,25.6
				c0,66.978,0,107.401-31.633,139.034C216.661,215.006,192.811,230.4,179.2,230.4c-4.719,0-8.533,3.823-8.533,8.533
				S174.481,247.467,179.2,247.467z"
                  />
                  <path
                    d="M145.067,213.333H8.533c-4.719,0-8.533,3.823-8.533,8.533v256c0,4.71,3.814,8.533,8.533,8.533h136.533
				c4.719,0,8.533-3.823,8.533-8.533v-256C153.6,217.156,149.786,213.333,145.067,213.333z M136.533,469.333H17.067V230.4h119.467
				V469.333z"
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
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {};

export default Post;
