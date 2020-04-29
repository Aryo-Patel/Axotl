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
        donations: [{
            type: '',
            quantity: '',
            description: ''
        }],
        startDate: '',
        endDate: '',
        winners: [{
            awardTitle : '',
            prize: ''
        }]
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

        createHackathon(formData);
        
        handleClose();
    }

    //adds a table row to either 
    function addTableRowDonation(e){

        //done to calculate the digit that will be added to the new table row values
        let tableArray = e.target.parentNode.children[1].children[1].children;
        let newRow  = e.target.parentNode.children[1].insertRow();
        let newIndex = tableArray.length-1;
        
        //component to add to the state
        let stateDonationUpdate = {
            type: '',
            quantity: '',
            description: ''
        }

        //appending blank donation object to the state component
        let array = formData.donations;
        array.push(stateDonationUpdate)
        setFormData({
            ...formData,
            ['donations']: array
        })

        let type = newRow.insertCell(0);
        let quantity = newRow.insertCell(1);
        let description = newRow.insertCell(2);
        let deleteRow = newRow.insertCell(3);

        //adds in the table elements
        type.innerHTML = `<input type = "text" placeholder = "Type" value = "${formData.donations[newIndex].type}" name = row-${newIndex}-type onChange = "${e => donationAddText(e)}"/> `;
        quantity.innerHTML = `<input type = "text" placeholder = "Quantity" value = "${formData.donations[newIndex].quantity}" name = row-${newIndex}-quantity onChange = "${e => donationAddText(e)}"/> `;
        description.innerHTML = `<input type = "text" placeholder = "Description" value = "${formData.donations[newIndex].description}" name = row-${newIndex}-description onChange = "${e => donationAddText(e)}"/>`;
        deleteRow.innerHTML = `<span className = "delete-request">X</span>`;

    }

    function addTableRowWinners(e){
        let newRow = e.target.parentNode.children[1].insertRow();
        let tableArray = e.target.parentNode.children[1].children[1].children;
        let newIndex = tableArray.length-1;
        
        //component to add to the state
        let stateWinnersUpdate = {
            awardTitle: '',
            prize: ''
        }

        //appending blank donation object to the state component
        let array = formData.winners;
        array.push(stateWinnersUpdate);
        setFormData({
            ...formData,
            ['winners']: array
        })
        

        //create the row items
        let awardTitle = newRow.insertCell(0);
        let prize = newRow.insertCell(1);
        let deleteRow = newRow.insertCell(2);

        //add the items to the table

        awardTitle.innerHTML = `<input type = "text" placeholder = "Award Title" value = "${formData.winners[newIndex].awardTitle}" name = "row-${newIndex}-awardTitle" onChange = "${e => winnersAddText(e)}"/>`;
        prize.innerHTML = `<input type = "text" placeholder = "Prize" value = "${formData.winners[newIndex].prize}" name = row-${newIndex}-prize onChange = "${e => winnersAddText(e)}"//>`;
        deleteRow.innerHTML = `<span className = "delete-request">X</span>`;
    }

    function donationAddText(e){
        //grabs basic information from the input
        let donationIndex = e.target.name.split('-')[1];
        let donationName = e.target.name.split('-')[2] + '';
        let myInput = e.target.value;

        //changes the array value so set form data can be done
        let array = formData.donations;
        array[donationIndex][donationName]  = myInput;
        
        setFormData({
            ...formData,
            ['donations'] : array
        });
        
    }
    function winnersAddText(e){
        //grabs basic information from input
        //grabs basic information from the input
        let winnersIndex = e.target.name.split('-')[1];
        let winnersName = e.target.name.split('-')[2] + '';
        let myInput = e.target.value;

        let array = formData.winners;
        array[winnersIndex][winnersName]  =  myInput;

        setFormData({
            ...formData,
            'winners' : array
        });
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
                            <input type = "text" placeholder = "A link to your hackathon's website" name = "website" value = {formData.website} onChange = {e => onInput(e)} />
                        </div>

                        <div className = "form-group">
                            <span>*Start Date: </span><input type = "date" name = "startDate" value = {formData.startDate} onChange = {e => onInput(e)}/>
                        </div>

                        <div className = "form-group">
                            <span>*End Date: </span><input type = "date" name = "endDate" value = {formData.endDate} onChange = {e => onInput(e)}/>
                        </div>
                        
                        <div className = "form-group">
                            <h2 className = "text-muted">What donations will your hackathon require?</h2>
                            <table className = "donation-table">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Quantity</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type = "text" placeholder = "Type" value = {formData.donations[0].type} name = "row-0-type" onChange = {e => donationAddText(e)}/></td>
                                        <td><input type = "text" placeholder = "Quantity" value = {formData.donations[0].quantity} name = "row-0-quantity" onChange = {e => donationAddText(e)} /></td>
                                        <td><input type = "text" placeholder = "Description" value = {formData.donations[0].description} name = "row-0-description" onChange = {e => donationAddText(e)}/></td>
                                        <td><span className = "delete-request">X</span></td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type = "button" onClick = {e => addTableRowDonation(e)} className = "add-donation-request btn btn-secondary btn-success">Add</button>
                        </div>

                        <div className = "form-group">
                            <h2 className = "text-muted">What are the categories people can win in?</h2>
                            <table className = "winners-table">
                                <thead>
                                    <tr>
                                        <th>Award Title</th>
                                        <th>Prize</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type = "text" placeholder = "Award Title" /></td>
                                        <td><input type = "text" placeholder = "Prize" /></td>
                                        <td><span className = "delete-request">X</span></td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type = "button" onClick = {e => addTableRowWinners(e)} className = "add-donation-request btn btn-secondary btn-success">Add</button>
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