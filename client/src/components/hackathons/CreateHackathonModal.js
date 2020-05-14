import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//importing create hackathon action
import { createHackathon } from '../../actions/hackathonActions';

const CreateHackathonModal = ({ handleClose, show, createHackathon }) => {
    //in charge of changing what page is displayed
    const [pageNumber, changePageNumber] = useState(1);

    //every time pageNumber updates, fire find current page
    useEffect(() => {
        findCurrentPage();
    }, [pageNumber]);


    //display is set to none if the modal is not toggled
    let showHideClassName = show ? "hack-modal display-block" : "hack-modal display-none";


    const [formData, setFormData] = useState({
        title: '',
        description: '',
        prizes: [{
            awardTitle: '',
            prize: ''
        }],
        requirements: [],
        criteria: [],
        location: '',
        forms: [{
            title: '',
            file: ''
        }],
        judges: [''],
        website: '',
        donations: [{
            type: '',
            quantity: '',
            description: ''
        }],
        startDate: '',
        endDate: '',

    })

    function onInput(e) {
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

    //add table row
    function addTableRow(e) {
        //adds table row below the current one that has the inputs that are necessary
        let category = e.target.id;

        //finds the table corresponding to the button
        let table = document.getElementById(`${category}-table`);
        //inserts a new row to the table
        let newRow = table.insertRow();

        //this is the number that should be assigned to each class element
        let newIndex = table.children[1].children.length - 1;

        //fixes cases where newIndex may be out of bounds
        if (typeof (newIndex) !== 'number' || newIndex < 0) {
            newIndex = 0;
        }

        //depending on what the selected table is, create the respective elements and adds the data to the formData object
        switch (category) {
            case 'donations':
                //sets the donation form data
                let formDataDonationUpdate = {
                    type: '',
                    quantity: '',
                    description: ''
                };
                let array = formData.donations;
                array.push(formDataDonationUpdate);
                setFormData({
                    donations: array
                });

                //creates the elements that will be in the table
                let type = newRow.insertCell(0);
                let quantity = newRow.insertCell(1);
                let description = newRow.insertCell(2);
                let deleteButton = newRow.insertCell(3);
                type.innerHTML = `<input type = "text" placeholder = "Type" value = "${formData.donations[newIndex].type}" name = row-${newIndex}-type onChange = "${e => donationAddText(e)}"/> `;
                quantity.innerHTML = `<input type = "text" placeholder = "Quantity" value = "${formData.donations[newIndex].quantity}" name = row-${newIndex}-quantity onChange = "${e => donationAddText(e)}"/> `;
                description.innerHTML = `<input type = "text" placeholder = "Description" value = "${formData.donations[newIndex].description}" name = row-${newIndex}-description onChange = "${e => donationAddText(e)}"/>`;
                let deleteSpan = document.createElement('span');
                deleteSpan.classList.add('delete-request');
                deleteSpan.textContent = 'X';
                deleteSpan.addEventListener('click', e => deleteTableRow(e));
                deleteButton.appendChild(deleteSpan);
                return;
            default:
                alert('unrecognized tables because a specific developer is a potato (Aryo)');
                return
        }

        //adds a new table row to form data in the respective category
    }

    function deleteTableRow(e) {
        //deletes table row
        //renames the classes to re-align with the array indeces
    }
    //adds a table row to either 
    function addTableRowDonation(e) {

        //done to calculate the digit that will be added to the new table row values
        let tableArray = e.target.parentNode.children[1].children[1].children;
        let newRow = e.target.parentNode.children[1].insertRow();
        let newIndex = tableArray.length - 1;


        //sets newIndex to zero if there's nothing in the array
        if (typeof (newIndex) !== 'number') {
            newIndex = 0;
        }

        if (newIndex < 0) {
            newIndex = 0;
        }
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
            donations: array
        })

        let type = newRow.insertCell(0);
        let quantity = newRow.insertCell(1);
        let description = newRow.insertCell(2);
        let deleteRow = newRow.insertCell(3);

        //adds in the table elements
        type.innerHTML = `<input type = "text" placeholder = "Type" value = "${formData.donations[newIndex].type}" name = row-${newIndex}-type onChange = "${e => donationAddText(e)}"/> `;
        quantity.innerHTML = `<input type = "text" placeholder = "Quantity" value = "${formData.donations[newIndex].quantity}" name = row-${newIndex}-quantity onChange = "${e => donationAddText(e)}"/> `;
        description.innerHTML = `<input type = "text" placeholder = "Description" value = "${formData.donations[newIndex].description}" name = row-${newIndex}-description onChange = "${e => donationAddText(e)}"/>`;
        //deleteRow.innerHTML = `<span className = "delete-request" onClick = "${e => deleteTableRow(e)}">X</span>`;
        let deleteSpan = document.createElement('span');
        deleteSpan.classList.add('delete-request');
        deleteSpan.textContent = 'X';
        deleteSpan.addEventListener('click', e => deleteTableRow(e));
        deleteRow.appendChild(deleteSpan);

    }

    function addTableRowWinners(e) {
        if (!formData.prizes[0]) {

        }
        else {

        }
        let newRow = e.target.parentNode.children[1].insertRow();
        let tableArray;
        let newIndex;
        try {
            tableArray = e.target.parentNode.children[1].children[1].children;
            newIndex = tableArray.length - 1;
        } catch (err) {
            newIndex = 0;
        }

        if (newIndex < 0) {
            newIndex = 0;
        }

        //component to add to the state
        let stateWinnersUpdate = {
            awardTitle: '',
            prize: ''
        }

        //appending blank donation object to the state component
        let array = formData.prizes;
        array.push(stateWinnersUpdate);
        setFormData({
            ...formData,
            winners: array
        })


        //create the row items
        let awardTitle = newRow.insertCell(0);
        let prize = newRow.insertCell(1);
        let deleteRow = newRow.insertCell(2);

        //add the items to the table

        awardTitle.innerHTML = `<input type = "text" placeholder = "Award Title" value = "${formData.prizes[newIndex].awardTitle}" name = "row-${newIndex}-awardTitle" onChange = "${e => winnersAddText(e)}"/>`;
        prize.innerHTML = `<input type = "text" placeholder = "Prize" value = "${formData.prizes[newIndex].prize}" name = row-${newIndex}-prize onChange = "${e => winnersAddText(e)}"//>`;
        // deleteRow.innerHTML = `<span className = "delete-request" onClick = "${e => deleteTableRow(e)}" >X</span>`;

        let deleteSpan = document.createElement('span');
        deleteSpan.classList.add('delete-request');
        deleteSpan.textContent = 'X';
        deleteSpan.addEventListener('click', e => deleteTableRow(e));
        deleteRow.appendChild(deleteSpan);
    }
    function addText(e) {
        let donationIndex = e.target.name.split('-')[1];
        let donationName = e.target.name.split('-')[2] + '';
        let myInput = e.target.value;


        //grabs the category that it is from
        let category = e.target.parentNode.parentNode.parentNode.parentNode.id.split('-')[0]


    }
    function donationAddText(e) {
        //grabs basic information from the input
        let donationIndex = e.target.name.split('-')[1];
        let donationName = e.target.name.split('-')[2] + '';
        let myInput = e.target.value;

        //changes the array value so set form data can be done
        let array = formData.donations;
        array[donationIndex][donationName] = myInput;

        setFormData({
            ...formData,
            donations: array
        });

    }
    function winnersAddText(e) {
        //grabs basic information from input
        //grabs basic information from the input
        let winnersIndex = e.target.name.split('-')[1];
        let winnersName = e.target.name.split('-')[2] + '';
        let myInput = e.target.value;

        let array = formData.prizes;
        array[winnersIndex][winnersName] = myInput;

        setFormData({
            ...formData,
            'prizes': array
        });
    };
    function deleteTableRow(e) {
        let rowExtract = e.target.parentNode.parentNode.children[0].children[0].name.split('-')[1];

        let rowName = e.target.parentNode.parentNode.children[0].children[0].name.split('-')[2];

        //remove the point from the DOM
        let parentNode = e.target.parentNode.parentNode;
        let child = e.target.parentNode;

        parentNode.remove(child);


        //remove the data from the specific part of the state
        if (rowName === 'type') {

            let array = formData.donations;
            array.splice(rowExtract, 1);
            setFormData({
                ...formData,
                donations: array
            })
        }
        else if (rowName === 'awardTitle') {
            let array = formData.prizes;

            array.splice(rowExtract, 1);
            setFormData({
                ...formData,
                prizes: array
            })
        }

    }

    const close = e => {
        if (e.target.classList.contains('hack-modal')) {
            e.target.parentNode.childNodes[0].checked = false;

            handleClose(e)
        }

    }


    function incrementPage() {

        if (pageNumber < 5) {
            let newPageNumber = pageNumber + 1;
            changePageNumber(newPageNumber);

        }

    }
    function decrementPage() {

        if (pageNumber > 1) {
            let newPageNumber = pageNumber - 1;
            changePageNumber(newPageNumber);
        }
    }
    function findCurrentPage() {

        let dots = document.getElementsByClassName("dot");

        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }

        dots[pageNumber - 1].classList.add('active');
    }

    function changeJudges(e) {

    }
    return (
        <div onClick={e => close(e)} className={showHideClassName}>
            <section className="modal-main">
                <div className="left-arrow arrow" onClick={e => decrementPage()}>
                    <h1>&#10094;</h1>
                </div>
                <div className="modal-text">
                    <h2 className="text-header">Fill in the information about your hackathon!</h2>
                    <small>* = required field</small>

                    <form className="modal-form" onSubmit={e => submitData(e)}>
                        {pageNumber === 1 && (
                            <Fragment>
                                <div className='form-group'>
                                    <input type="text" placeholder="* Hackathon name" name="title" value={formData.title} onChange={e => onInput(e)} required />
                                </div>

                                <div className="form-group">
                                    <input type="text" placeholder="Where will your hackathon be held?" name="location" value={formData.location} onChange={e => onInput(e)} required />
                                </div>

                                <div className="form-group">
                                    <input type="text" placeholder="Give us a link to your hackathon's website" name="website" value={formData.website} onChange={e => onInput(e)} />
                                </div>

                                <div className="form-group"><h2>What days will your hackathon be run?</h2></div>
                                <div className="form-group">
                                    <span>*Start Date: </span><input type="date" name="startDate" value={formData.startDate} onChange={e => onInput(e)} />
                                </div>

                                <div className="form-group">
                                    <span>*End Date: </span><input type="date" name="endDate" value={formData.endDate} onChange={e => onInput(e)} />
                                </div>
                            </Fragment>
                        )}
                        {pageNumber === 2 && (
                            <Fragment>
                                <div className="form-group">
                                    <textarea type="text" placeholder="* A short description about your hackathon" name="description" value={formData.description} onChange={e => onInput(e)}></textarea>
                                </div>

                                <div className="form-group">
                                    <input type="text" placeholder="Judge's Name" value={formData.judges[0]} onChange={e => changeJudges(e)}></input>
                                </div>
                            </Fragment>
                        )}
                        {pageNumber === 3 && (
                            <Fragment>

                            </Fragment>
                        )}
                        {pageNumber === 4 && (
                            <Fragment>
                                <div className="form-group">
                                    <p className="lead text-header">What donations will your hackathon require?</p>
                                    <table id="donations-table" className="input-table">
                                        <thead>
                                            <tr>
                                                <th>Type</th>
                                                <th>Quantity</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><input type="text" placeholder="Type" name="row-0-type" value={formData.donations[0] ? formData.donations[0].type : ''} onChange={e => addText(e)} /></td>
                                                <td><input type="text" placeholder="Quantity" value={formData.donations[0] ? formData.donations[0].quantity : ''} name="row-0-quantity" onChange={e => addText(e)} /></td>
                                                <td><input type="text" placeholder="Description" value={formData.donations[0] ? formData.donations[0].description : ''} name="row-0-description" onChange={e => addText(e)} /></td>
                                                <td><span className="delete-request" onClick={e => deleteTableRow(e)}>X</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button type="button" onClick={e => addTableRow(e)} id="donations" className="donations-request btn btn-secondary btn-success">Add</button>
                                </div>
                            </Fragment>
                        )}
                        {pageNumber === 5 && (
                            <Fragment>
                                <div className="form-group">
                                    <p className="lead text-header">What are the categories people can win in?</p>
                                    <table className="winners-table">
                                        <thead>
                                            <tr>
                                                <th>Award Title</th>
                                                <th>Prize</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><input type="text" placeholder="Award Title" name="row-0-awardTitle" value={formData.prizes[0] ? formData.prizes[0].awardTitle : ''} onChange={e => winnersAddText(e)} /></td>
                                                <td><input type="text" placeholder="Prize" name="row-0-prize" value={formData.prizes[0] ? formData.prizes[0].prize : ''} onChange={e => winnersAddText(e)} /></td>
                                                <td><span className="delete-request" onClick={e => deleteTableRow(e)}>X</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button type="button" onClick={e => addTableRowWinners(e)} className="add-donation-request btn btn-secondary btn-success">Add</button>
                                </div>

                                <input type="submit" className="btn btn-primary my-1" />
                            </Fragment>
                        )}
                        <div className="dots-holder">
                            <span className="dot active"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>

                    </form>
                </div>

                <div className="right-arrow arrow" onClick={e => incrementPage()}>
                    <h1>&#10095;</h1>
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

export default connect(null, { createHackathon })(CreateHackathonModal);