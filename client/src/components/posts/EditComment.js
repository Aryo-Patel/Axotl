import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import $ from "jquery";

const EditComment = ({
  setEditCommentModal,
  editCommentModal,
  editingComment,
  editComment,
  postState,
}) => {
  useEffect(() => {
    setText(editingComment.text);
  }, [editingComment]);
  const [text, setText] = useState("");
  //destructures formdata
  //makes the inputs change the formdata
  const onChange = (e) => {
    setText(e.target.value);
  };
  $(`#innerModalEditComment`).click((e) => {
    e.stopPropagation();
  });

  $("#editcommentsubmit")
    .unbind()
    .click((e) => {
      console.log("HERE");
      editComment(text, postState._id, editingComment._id);
      setEditCommentModal("closed");
    });
  return (
    <div className="editComment__wrapper" data-status={editCommentModal}>
      <div
        className="editComment__modal-cover"
        onClick={(e) => setEditCommentModal("closed")}
      >
        <form className="editComment__modal-main" id="innerModalEditComment">
          <div className="editComment__submit-wrapper">
            <div
              id="editcommentsubmit"
              className="editPost__icon-wrapper"
              onClick={(e) => {
                console.log("onclick");
              }}
            >
              <label htmlFor="#editcommentsubmit">
                <svg className="editComment__icon" viewBox="0 0 32 32">
                  <path d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"></path>
                </svg>
              </label>
            </div>
          </div>
          <textarea
            name="content"
            className="editComment__text"
            type="text"
            placeholder="Edit your comment"
            value={text}
            onChange={(e) => onChange(e)}
          />
        </form>
      </div>
    </div>
  );
};

EditComment.propTypes = {};

export default EditComment;
