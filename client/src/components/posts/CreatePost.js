import React, { useState } from "react";
import PropTypes from "prop-types";
import $ from 'jquery';
import TextField from "../layout/TextField";

import "./styling/posts.css";

const CreatePost = ({ createPost }) => {
  const [formData, setFormData] = useState({
    content: "",
    title: ""
  });
  const [modal, modalToggle] = useState('closed');
  //opens the modal
  const openModal = (e) => {
    modalToggle('open');
  };
  //destructures formdata
  const { content, title } = formData;
  //makes the inputs change the formdata
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    $(`.createPost__modal-main`).on("click", (e) => {
      console.log("CLICKED");
        e.stopPropagation();
    })
    $("#createpostsubmit")
    .on("click", (e) => {
      console.log("SUBMITTING");
      if(!formData.content) {
        //dispatch alert
        return;
      }
      createPost(formData);
      setFormData({
        content: "",
        title: ""
      })
      modalToggle("closed");
    });
  
  return (
    <div className="createPost__wrapper" data-status={modal}>
      <button
        className="createPost_button button"
        onClick={(e) => openModal(e)}
      >
        Create Post
      </button>
      <div className="createPost__modal-cover" onClick = {e => modalToggle('closed')}>
        <form
          className="createPost__modal-main"
          id = 'innerModal'
        >
          <div className="createPost__submit-wrapper">
            
            {/* <input id = 'createpostsubmit' type="submit" className="createPost__submit"></input> */}
                <div id = 'createpostsubmit' className="createPost__icon-wrapper" onClick = {e => {
                    if(formData.content && formData.title) {
                     createPost(formData);
                     setFormData({
                        content: "",
                        title: ""
                     })
                     modalToggle('closed')
                    } else {
                      //dispatch an alert?
                    }
                }}>
                    <label htmlFor='#createpostsubmit'>
              <svg
                className="createPost__icon"
                viewBox="0 0 32 32"
              >
                <path d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"></path>
              </svg>
              </label>
              </div>
          </div>
          <TextField
            name="title"
            type="text"
            className="createPost__title"
            onChange={(e) => onChange(e)}
            value={title}
            parentClassName="createPost"
            required={true}
            disabled={false}
            placeholder="Compose a title..."
            required
          />
          <textarea
            name="content"
            className="createPost__content"
            type="text"
            placeholder = 'Write the content of your post here...'
            value={content}
            onChange={(e) => onChange(e)}
            required
          />
        </form>
      </div>
    </div>
  );
};

CreatePost.propTypes = {};

export default CreatePost;
