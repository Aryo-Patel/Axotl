import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import $ from "jquery";

const EditReply = ({
  setEditReplyModal,
  editReplyModal,
  editingReply,
  editReply,
  postState,
}) => {
  useEffect(() => {
    setText(editingReply.text);
  }, [editingReply]);
  const [text, setText] = useState("");
  //destructures formdata
  //makes the inputs change the formdata
  const onChange = (e) => {
    setText(e.target.value);
  };
  $(`#innerModalEditReply`).click((e) => {
    e.stopPropagation();
  });

  $("#editReplysubmit")
    .unbind()
    .click((e) => {
      console.log("HERE");
      editReply(text, postState._id, editingReply._id);
      setEditReplyModal("closed");
    });
  return (
    <div className="editReply__wrapper" data-status={editReplyModal}>
      <div
        className="editReply__modal-cover"
        onClick={(e) => setEditReplyModal("closed")}
      >
        <form className="editReply__modal-main" id="innerModalEditReply">
          <div className="editReply__submit-wrapper">
            <div
              id="editReplysubmit"
              className="editPost__icon-wrapper"
              onClick={(e) => {
                console.log("onclick");
              }}
            >
              <label htmlFor="#editReplysubmit">
                <svg className="editReply__icon" viewBox="0 0 32 32">
                  <path d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"></path>
                </svg>
              </label>
            </div>
          </div>
          <textarea
            name="content"
            className="editReply__text"
            type="text"
            placeholder="Edit your reply"
            value={text}
            onChange={(e) => onChange(e)}
          />
        </form>
      </div>
    </div>
  );
};

EditReply.propTypes = {};

export default EditReply;
