import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

//importing create hackathon action
import {createHackathon} from '../../actions/hackathonActions';

const CreateHackathonModal = ({handleClose, show, children, createHackathon}) => {
    let showHideClassName = show ? "hack-modal display-block" : "hackModal display-none";
    return(
        <div className = {showHideClassName}>
            <h1>display inner</h1>
            <section className = "modal-main">
                <div className = "modal-text">
                    <p className = "lead">Fill in the information about your hackathon!</p>
                    <small>* = required field</small>

                    <form className = "modal-form">
                        <div className = 'form-group'>
                            <input type = "text" placeholder = "* Hackathon name" name = "title" required />
                        </div>

                        <button onClick = {handleClose} type = "submit">close</button>
                    </form>
                </div>


            </section>
        </div>
    )
}

export default connect(null, {createHackathon})(CreateHackathonModal);