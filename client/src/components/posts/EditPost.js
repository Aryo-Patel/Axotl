import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import $ from 'jquery';
import TextField from "../layout/TextField";
import {connect} from 'react-redux'

import "./styling/posts.css";
import { getPost } from "../../actions/post";

const EditPost = ({ editPost, postState, modal, modalToggle }) => {
    useEffect(() => {
        setFormData({
            content: postState.content,
            title : postState.title
        })
    }, [postState])
    const [formData, setFormData] = useState({
        content: '',
        title: ''
      });
  //destructures formdata
  const { content, title } = formData;
  //makes the inputs change the formdata
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    $(`#innerModalEdit`).click((e) => {
        e.stopPropagation();
    })

    $('#editpostsubmit').unbind().click((e) => {
        console.log('HERE')
        editPost(formData, postState._id);
        modalToggle('closed')
    
    })
  
  return (
    <div className="editPost__wrapper" data-status={modal}>
      <div className="editPost__modal-cover" onClick = {e => modalToggle('closed')}>
        <form
          className="editPost__modal-main"
          id = 'innerModalEdit'
        >
          <div className="editPost__submit-wrapper">
            
            
            {/* <input id = 'createpostsubmit' type="submit" className="createPost__submit"></input> */}
                <div id = 'editpostsubmit' className="editPost__icon-wrapper" onClick = {e => {
                    console.log('onclick')
                }}>
                    <label htmlFor='#editpostsubmit'>
              <svg
                className="editPost__icon"
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
            className="editPost__title"
            onChange={(e) => onChange(e)}
            value={title}
            parentClassName="editPost"
            required={true}
            disabled={false}
            placeholder="Compose a title..."
          />
          <textarea
            name="content"
            className="editPost__content"
            type="text"
            placeholder = 'Write the content of your post here...'
            value={content}
            onChange={(e) => onChange(e)}
          />
        </form>
      </div>
    </div>
  );
};

EditPost.propTypes = {};

export default connect(null, {})(EditPost);
