import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

//importing create hackathon action
import {createHackathon} from '../../actions/hackathonActions';

const CreateHackathonModal = ({handleClose, show, createHackathon}) => {
    //display is set to none if the modal is not toggled
    let showHideClassName = show ? "hack-modal display-block" : "hack-modal display-none";

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        website: '',
        donations: [],
        startDate: '',
        endDate: '',
        winners: []
    })

    function onInput(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    //the function that will check if the hackathon can be created. If it can, the window will close
    function submitData(e) {
        e.preventDefault();

        Object.values(formData).forEach(data => {
            if(data){
                console.log(data);
            }
        })
        // handleClose();
    }
    return(
        <div className = {showHideClassName}>
            <section className = "modal-main">
                <div className = "modal-text">
                    <p className = "lead">Fill in the information about your hackathon!</p>
                    <small>* = required field</small>

                    <form className = "modal-form" onSubmit = {e => submitData(e)}>
                        <div className = 'form-group'>
                            <input type = "text" placeholder = "* Hackathon name" name = "title" value = {formData.title} onChange = {e => onInput(e)} required />
                        </div>

                        <div className = "form-group">
                            <input type = "text" placeholder = "* A short description about your hackathon" name = "description" value = {formData.description} onChange = {e => onInput(e)} />
                        </div>

                        <div className = "form-group">
                            <span>Start Date: </span><input type = "date" name = "startDate" value = {formData.startDate} onChange = {e => onInput(e)}/>
                        </div>

                        <div className = "form-group">
                            <span>End Date: </span><input type = "date" name = "endDate" value = {formData.endDate} onChange = {e => onInput(e)}/>
                        </div>

                        
                        <input type = "submit" className = "btn btn-primary my-1" />
                    </form>
                </div>


            </section>
        </div>
    )
}

CreateHackathonModal.propTypes = {
    createHackathon: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}

export default connect(null, {createHackathon})(CreateHackathonModal);