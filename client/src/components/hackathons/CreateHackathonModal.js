import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LocationInput from '../profile/LocationInput';

import $ from 'jquery';
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
        requirements: [''],
        criteria: [''],
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
    useEffect(() => {
        console.log(formData);
    }, [formData]);
    function onInput(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    //This is to handle the location data
    function locationSelect(e) {
        setFormData({
            ...formData,
            location: e
        })
    }

    //the function that will check if the hackathon can be created. If it can, the window will close
    function submitData(e) {
        e.preventDefault();
        console.log("whore");
        createHackathon(formData);

        handleClose();

        window.location.reload(false);
        return false;
    }

    //add table row
    function addTableRow(e) {
        //adds table row below the current one that has the inputs that are necessary
        let category = e.target.id;

        //finds the table corresponding to the button
        let table = document.getElementById(`${category}-table`);
        //inserts a new row to the table
        let newRow = table.children[1].insertRow();

        //this is the number that should be assigned to each class element
        let newIndex = table.children[1].children.length - 1;

        //fixes cases where newIndex may be out of bounds
        if (newIndex < 0) {
            newIndex = 0;
        }

        //depending on what the selected table is, create the respective elements and adds the data to the formData object
        //the inputs MUST have a name in the format row-${newIndex}-[what the input corresponds to in the state component]
        //the first class on the delete buttons (spans) must correspond to the name of the table it is in. For example, if
        //the span is being appended to the table in the table called #donations-table, it should have a classList[0] of donations
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
                    ...formData,
                    donations: array
                });

                //creates the elements that will be in the table
                let type = newRow.insertCell(0);
                let quantity = newRow.insertCell(1);
                let description = newRow.insertCell(2);
                let deleteButton = newRow.insertCell(3);
                //creates the input elements
                let typeInput = document.createElement('input');
                let quantityInput = document.createElement('input');
                let descriptionInput = document.createElement('input');

                //adds the type input
                typeInput.type = 'text';
                typeInput.placeholder = 'Type';
                typeInput.value = formData.donations[newIndex].type;
                typeInput.addEventListener('keyup', e => {
                    addText(e);
                });
                typeInput.name = `row-${newIndex}-type`;
                type.appendChild(typeInput);

                //adds quantity input
                quantityInput.type = 'number';
                quantityInput.min = '0';
                quantityInput.placeholder = 'Quantity';
                quantityInput.value = formData.donations[newIndex].quantity;
                quantityInput.addEventListener('keyup', e => {
                    addText(e);
                });
                quantityInput.name = `row-${newIndex}-quantity`;
                quantity.appendChild(quantityInput);
                //adds the description input
                descriptionInput.type = 'text';
                descriptionInput.placeholder = 'Description';
                descriptionInput.value = formData.donations[newIndex].description;
                descriptionInput.addEventListener('keyup', e => {
                    addText(e);
                });
                descriptionInput.name = `row-${newIndex}-description`;
                description.appendChild(descriptionInput);

                let deleteSpan = document.createElement('span');
                deleteSpan.classList.add('donations');
                deleteSpan.classList.add('delete-request');
                deleteSpan.innerHTML = '<i class="far fa-times-circle"></i>';
                deleteSpan.addEventListener('click', e => deleteTableRow(e));
                deleteButton.appendChild(deleteSpan);
                return;

            case 'prizes':
                //component to add to the state
                let stateWinnersUpdate = {
                    awardTitle: '',
                    prize: ''
                }

                //appending blank donation object to the state component
                let prizesArray = formData.prizes;
                prizesArray.push(stateWinnersUpdate);
                setFormData({
                    ...formData,
                    winners: prizesArray
                });

                //create the row items
                let awardTitle = newRow.insertCell(0);
                let prize = newRow.insertCell(1);
                let deleteRow = newRow.insertCell(2);

                let awardTitleInput = document.createElement('input');
                awardTitleInput.type = 'text';
                awardTitleInput.value = formData.prizes[newIndex].awardTitle;
                awardTitleInput.name = `row-${newIndex}-awardTitle`;
                awardTitleInput.addEventListener('keyup', e => {
                    addText(e);
                });
                awardTitleInput.placeholder = 'Award Title';
                awardTitle.appendChild(awardTitleInput);


                let prizeInput = document.createElement('input');
                prizeInput.type = 'text';
                prizeInput.value = formData.prizes[newIndex].prize;
                prizeInput.name = `row-${newIndex}-prize`;
                prizeInput.addEventListener('keyup', e => {
                    addText(e);
                });
                prizeInput.placeholder = 'Prize';
                prize.appendChild(prizeInput);

                let prizesDeleteSpan = document.createElement('span');
                prizesDeleteSpan.classList.add('prizes');
                prizesDeleteSpan.classList.add('delete-request');
                prizesDeleteSpan.innerHTML = '<i class="far fa-times-circle"></i>';
                prizesDeleteSpan.addEventListener('click', e => deleteTableRow(e));
                deleteRow.appendChild(prizesDeleteSpan);
                return;

            case 'requirements':
                //add data to formData
                let requirementsArray = formData.requirements;
                requirementsArray.push('');

                setFormData({
                    ...formData,
                    requirements: requirementsArray
                });

                let requirement = newRow.insertCell(0);
                let requirementDeleteButton = newRow.insertCell(1);

                let requirementInput = document.createElement('input');
                requirementInput.type = 'text';
                requirementInput.placeholder = 'Requirement';
                requirementInput.value = formData.requirements[newIndex];
                requirementInput.name = `row-${newIndex}-requirement`;
                requirementInput.addEventListener('keyup', e => {
                    addText(e);
                });
                requirement.appendChild(requirementInput);

                let requirementDeleteSpan = document.createElement('span');
                requirementDeleteSpan.classList.add('requirements');
                requirementDeleteSpan.classList.add('delete-request');
                requirementDeleteSpan.innerHTML = '<i class="far fa-times-circle"></i>';
                requirementDeleteSpan.addEventListener('click', e => deleteTableRow(e));
                requirementDeleteButton.appendChild(requirementDeleteSpan);
                return;
            case 'criteria':
                //adding the form data
                let criteriaArray = formData.criteria;
                criteriaArray.push('');
                setFormData({
                    ...formData,
                    criteria: criteriaArray
                });

                let criterion = newRow.insertCell(0);
                let criterionDelete = newRow.insertCell(1);

                let criterionInput = document.createElement('input');
                criterionInput.type = 'text';
                criterionInput.name = `row-${newIndex}-criteria`;
                criterionInput.placeholder = 'Criterion';
                criterionInput.value = formData.criteria[newIndex];
                criterionInput.addEventListener('keyup', e => {
                    addText(e);
                });
                criterion.appendChild(criterionInput);

                let criterionDeleteSpan = document.createElement('span');
                criterionDeleteSpan.classList.add('criteria');
                criterionDeleteSpan.classList.add('delete-request');
                criterionDeleteSpan.innerHTML = '<i class="far fa-times-circle"></i>';
                criterionDeleteSpan.addEventListener('click', e => {
                    deleteTableRow(e);
                });
                criterionDelete.appendChild(criterionDeleteSpan);
                return;
            case 'judges':
                //set formData
                let judgesArray = formData.judges;
                judgesArray.push('');
                setFormData({
                    ...formData,
                    judges: judgesArray
                });

                let judge = newRow.insertCell(0);
                let judgeDeleteButton = newRow.insertCell(1);

                let judgeInput = document.createElement('input');
                judgeInput.type = 'text';
                judgeInput.placeholder = "Judge's name";
                judgeInput.value = formData.judges[newIndex];
                judgeInput.name = `row-${newIndex}-judges`;
                judgeInput.addEventListener('keyup', e => {
                    addText(e);
                });
                judge.appendChild(judgeInput);

                let judgeDeleteButtonInput = document.createElement('span');
                judgeDeleteButtonInput.classList.add('judges');
                judgeDeleteButtonInput.classList.add('delete-request');
                judgeDeleteButtonInput.innerHTML = '<i class="far fa-times-circle"></i>';
                judgeDeleteButtonInput.addEventListener('click', e => {
                    deleteTableRow(e);
                });
                judgeDeleteButton.appendChild(judgeDeleteButtonInput);
                return;
            default:
                alert('unrecognized tables because a specific developer is a potato (Aryo)');
                return
        }


    }

    function addText(e) {

        let donationIndex = e.target.name.split('-')[1];
        let donationName = e.target.name.split('-')[2] + '';
        let myInput = e.target.value;


        //grabs the category that it is from
        let category = e.target.parentNode.parentNode.parentNode.parentNode.id.split('-')[0]

        let array = formData[category];


        if (category !== 'requirements' && category !== 'judges' && category !== 'criteria') {
            array[donationIndex][donationName] = myInput;

            setFormData({
                ...formData,
                [`${category}`]: array
            });

        }
        else {
            array[donationIndex] = myInput;
            setFormData({
                ...formData,
                [`${category}`]: array
            });
        }
    }

    function deleteTableRow(e) {

        let rowExtract = e.target.parentNode.parentNode.parentNode.children[0].children[0].name.split('-')[1];
        console.log(rowExtract);
        let rowName = e.target.parentNode.parentNode.parentNode.children[0].children[0].name.split('-')[2];

        //remove the point from the DOM
        let parentNode = e.target.parentNode.parentNode.parentNode;
        let child = e.target.parentNode.parentNode;

        parentNode.remove(child);


        //grabs the table name
        let category = e.target.parentNode.classList[0];
        let array = formData[`${category}`];
        array.splice(rowExtract, 1);
        setFormData({
            ...formData,
            [`${category}`]: array
        });


        //for every element inputted after the deleted element, decrement the number in the name by one.
        //finds the corresponding table so that the correct elements can be referenced
        let table = document.getElementById(`${category}-table`);

        for (let i = rowExtract; i < table.children[1].children.length; i++) {
            let tableRow = table.children[1].children[i];

            Array.from(tableRow.children).forEach(tableComponent => {
                Array.from(tableComponent.children).forEach(tableItem => {
                    let itemName = tableItem.name;
                    if (itemName) {
                        let itemNameBrokenUp = itemName.split('-');
                        itemNameBrokenUp[1] = itemNameBrokenUp[1] - 1;
                        let replacementItemName = itemNameBrokenUp.join('-');
                        tableItem.name = replacementItemName;
                    }
                })
            })
        }

    }

    const close = e => {

        if (e.target.classList.contains('animation-wrapper')) {
            e.target.parentNode.childNodes[0].checked = false;

            handleClose();
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

    function choosePage(n) {
        changePageNumber(n);
    }

    function addFocusEffect(){
        let inputs = Array.from(document.querySelectorAll('.form-group input'));
        

        inputs.forEach(input => {
            input.addEventListener('focus', e => {

                if(input.parentNode.classList.contains('spacer__form-group')) {
                    e.target.parentNode.parentNode.style.border = '2px solid #4983FF';

                    e.target.parentNode.parentNode.children[0].style.borderRight = '2px solid #4983FF';
                    e.target.parentNode.parentNode.children[0].style.color = '#4983FF';
                }
                else{
                    e.target.parentNode.style.border = '2px solid #4983FF';

                    e.target.parentNode.children[0].style.borderRight = '2px solid #4983FF';
                    e.target.parentNode.children[0].style.color = '#4983FF';
                }
            });
            input.addEventListener('blur', e => {

                if(input.parentNode.classList.contains('spacer__form-group')){
                    e.target.parentNode.parentNode.style.border = '2px solid #CCD8DF';
                    e.target.parentNode.parentNode.children[0].style.borderRight = '2px solid #CCD8DF';
                    e.target.parentNode.parentNode.children[0].style.color = '#CCD8DF';
                }
                else{
                    e.target.parentNode.style.border = '2px solid #CCD8DF';
                    e.target.parentNode.children[0].style.borderRight = '2px solid #CCD8DF';
                    e.target.parentNode.children[0].style.color = '#CCD8DF';
                }

            })
        })
    }
    addFocusEffect();
    return (
        <div onClick={e => close(e)} className={showHideClassName}>
            <div className="animation-wrapper">
                <section className="modal-main">
                    <div className="left-arrow arrow" onClick={e => decrementPage()}>
                        <h1>&#10094;</h1>
                    </div>
                    <div className="modal-text">
                        <h2 className="text-header">{<i class="fab fa-wpforms"></i>} Fill in the information about your hackathon!</h2>
                        <small>* = required field</small>

                        <form className="modal-form" onSubmit={e => {
                            e.preventDefault();
                            console.log("second whore");
                            submitData(e)
                            }}>
                            {pageNumber === 1 && (
                                <Fragment>
                                    <div className='form-group'>
                                        <div className = "favicon-holder"><i className="fab fa-black-tie"></i></div>
                                        <input type="text" placeholder="* Hackathon name" className = "form-group-input" name="title" value={formData.title} onChange={e => onInput(e)} required />
                                    </div>

                                    <div className="form-group">
                                        <div className = "favicon-holder"><i className="fas fa-globe-americas"></i></div>
                                        <LocationInput parentClassName = "form-group-input spacer" realPlaceholder="Where will your hackathon be held?" onChange={(e) => locationSelect(e)} required />
                                    </div>

                                    <div className="form-group">
                                        <div className = "favicon-holder"><i className="fas fa-globe"></i></div>
                                        <input type="text" className = "form-group-input" placeholder="Give us a link to your hackathon's website" name="website" value={formData.website} onChange={e => onInput(e)} />
                                    </div>
                                    <div className = "date-encapsulator">
                                    <div className="form-group">
                                        <div className = "favicon-holder"><i className="fas fa-calendar-alt"></i></div>
                                        <input type="text" onFocus = {e => e.target.type = 'date'} placeholder = "Start Date" className = 'form-group-input' onBlur = {e => e.target.type = 'blur'} name="startDate" value={formData.startDate} onChange={e => onInput(e)} />
                                    </div>

                                    <div className="form-group">
                                        <div className ="favicon-holder"><i className="fas fa-calendar-alt"></i></div>
                                        <input type="text" placeholder = "End Date" className = "form-group-input" onFocus = {e => e.target.type = 'date'} onBlur = {e => e.target.type = 'text'} name="endDate" value={formData.endDate} onChange={e => onInput(e)} />
                                    </div>
                                    </div>
                                </Fragment>
                            )}
                            {pageNumber === 2 && (
                                <Fragment>
                                    <div className="form-group">
                                        <textarea type="text" placeholder="* A short description about your hackathon" name="description" value={formData.description} onChange={e => onInput(e)}></textarea>
                                    </div>

                                    <div className="form-group">
                                        <p className="lead text-header">What are the requirements to participate in your hackathon?</p>
                                        <table id="requirements-table">
                                            <thead>
                                                <tr>
                                                    <th>Requirements:</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type='text' placeholder='Requirement' name='row-0-requirement' value={formData.requirements[0]} onChange={e => addText(e)} /></td>
                                                    <td><span className="requirements delete-request" onClick={e => deleteTableRow(e)}>{<i className="far fa-times-circle"></i>}</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <button type='button' id="requirements" onClick={e => addTableRow(e)} className="requirements-request btn btn-secondary btn-success">Add</button>
                                    </div>
                                </Fragment>
                            )}
                            {pageNumber === 3 && (
                                <Fragment>
                                    <div className="form-group">
                                        <p className="lead text-header">What are the categories people can win in?</p>
                                        <table id="criteria-table">
                                            <thead>
                                                <tr>
                                                    <th>Criteria</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type='text' placeholder="Criterion" value={formData.criteria ? formData.criteria[0] : ''} name='row-0-criteria' onChange={e => addText(e)} /></td>
                                                    <td><span className="criteria delete-request" onClick={e => deleteTableRow(e)}>{<i className="far fa-times-circle"></i>}</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <button type='button' id="criteria" className="criteria-request btn btn-secondary btn-success" onClick={e => addTableRow(e)}>Add</button>
                                    </div>
                                    <div className="form-group">
                                        <p className="lead text-header">Who are the judges at your hackathon?</p>
                                        <table id="judges-table">
                                            <thead>
                                                <tr>
                                                    <th>Judge Names</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type='text' placeholder="Judge's name" value={formData.judges[0]} name='row-0-judges' onChange={e => addText(e)} /></td>
                                                    <td><span className="judges delete-request" onClick={e => deleteTableRow(e)}>{<i className="far fa-times-circle"></i>}</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <button type='button' id='judges' className='judges btn btn-secondary btn-success' onClick={e => addTableRow(e)}>Add</button>
                                    </div>
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
                                                    <td><input type="number" min="0" placeholder="Quantity" value={formData.donations[0] ? formData.donations[0].quantity : ''} name="row-0-quantity" onChange={e => addText(e)} /></td>
                                                    <td><input type="text" placeholder="Description" value={formData.donations[0] ? formData.donations[0].description : ''} name="row-0-description" onChange={e => addText(e)} /></td>
                                                    <td><span className="donations delete-request" onClick={e => deleteTableRow(e)}>{<i className="far fa-times-circle"></i>}</span></td>
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
                                        <table id="prizes-table">
                                            <thead>
                                                <tr>
                                                    <th>Award Title</th>
                                                    <th>Prize</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><input type="text" placeholder="Award Title" name="row-0-awardTitle" value={formData.prizes[0] ? formData.prizes[0].awardTitle : ''} onChange={e => addText(e)} /></td>
                                                    <td><input type="text" placeholder="Prize" name="row-0-prize" value={formData.prizes[0] ? formData.prizes[0].prize : ''} onChange={e => addText(e)} /></td>
                                                    <td><span className="prizes delete-request" onClick={e => deleteTableRow(e)}>{<i className="far fa-times-circle"></i>}</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <button type="button" id="prizes" onClick={e => addTableRow(e)} className="add-donation-request btn btn-secondary btn-success">Add</button>
                                    </div>

                                    <input type="submit" className="btn btn-primary my-1" />
                                </Fragment>
                            )}
                            <div className="dots-holder">
                                <span className="dot active" onClick={e => choosePage(1)}></span>
                                <span className="dot" onClick={e => choosePage(2)}></span>
                                <span className="dot" onClick={e => choosePage(3)}></span>
                                <span className="dot" onClick={e => choosePage(4)}></span>
                                <span className="dot" onClick={e => choosePage(5)}></span>
                            </div>

                        </form>
                    </div>

                    <div className="right-arrow arrow" onClick={e => incrementPage()}>
                        <h1>&#10095;</h1>
                    </div>
                </section>
            </div>
        </div>
    )
}

CreateHackathonModal.propTypes = {
    createHackathon: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}

export default connect(null, { createHackathon })(CreateHackathonModal);