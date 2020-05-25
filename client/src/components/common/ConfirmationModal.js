import React from 'react'
import PropTypes from 'prop-types'


const ConfirmationModal = ({deletePost, confirmationModal, confirmationModalToggle, parentClassName, text, confirmationPost}) => {
    console.log(confirmationModal)
    return (
        <div className={`${parentClassName}__wrapper`} data-status={confirmationModal}>
        <div className={`${parentClassName}__modal-cover`} onClick = {e => confirmationModalToggle('closed')}>
          <div
            className={`${parentClassName}__modal-main`}
            id = 'innerModal'
          >
            <h4 className={`subheading ${parentClassName}__text`}>{text}</h4>
                <div className={`${parentClassName}__buttons`}>
                    <button className={`${parentClassName}__yes`} onClick = {e => {
                        console.log('FIRED')
                        console.log(confirmationPost)
                        deletePost(confirmationPost)}}>Yes</button>
                    <button className={`${parentClassName}__no`} onClick = {e => confirmationModalToggle('closed')}>No</button>
                </div>
          </div>
        </div>
      </div>
    )
}

ConfirmationModal.propTypes = {

}

export default ConfirmationModal
