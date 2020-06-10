import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import $ from 'jquery';

const DonateToHackathonModal = props => {
    $(document).ready(function () {
        window.scrollTo(0, 0);
    });
    let show = props.turnOn ? 'show' : 'no-display'


    $('.modal-background').click(function (e) {
        if (e.target.classList[0] === 'modal-positioner') {
            props.updateView();
        }

    })
    let donationStatus;
    if (props.donations) {
        donationStatus = new Array(props.donations.length);
        for (let i = 0; i < donationStatus.length; i++) {
            donationStatus[i] = 'false';
        }
    }
    const [userInputs, updateInputs] = useState({

    });

    function badInput() {
        if (userInputs.length === 0) {
            return false;
        }
        return Object.values(userInputs).every(input => input.length == 0);
    }

    //this controls the grey bar that comes in as well as the fade in of the input
    $('.donation-option').unbind().click(function (e) {
        if (e.target.nodeName === 'INPUT') {

        }
        else {
            if ($(this).attr('data-status') === 'false') {
                let index = $(this).attr('data-number');
                donationStatus[index] = 'true';
                $(this).attr('data-status', 'true');
                $(this).find(`.growing-background`).css({ 'width': '100%' });
                $(this).find('.donation-amount').css({ 'opacity': '100%' });
                $(this).find('.donation-amount').css({ 'visibility': 'visible' });

            }
            else {
                $(this).attr('data-status', 'false');
                let index = $(this).attr('data-number');
                donationStatus[index] = 'false';
                $(this).find('.growing-background').css({ 'width': '0%' });
                $(this).find('.donation-amount').css({ 'opacity': '0%' });
                $(this).find('.donation-amount').css({ 'visibility': 'hidden' });
                let resetName = $(this).find('.donation-amount').attr('name');
                updateInputs({
                    ...userInputs,
                    [resetName]: ""
                });
            }
        }
    });


    $('.submit-button').unbind().click(async function (e) {
        if (!badInput()) {
            const payload = [];
            for (let item in userInputs) {
                if (item !== 'description') {
                    let donId = "";
                    props.hackathonDonations.forEach(donation => {
                        if (donation.type + "" === item + "") {
                            donId = donation._id + "";
                        }
                    })
                    payload.push({
                        type: item,
                        quantity: userInputs[item],
                        description: userInputs.description,
                        donId: donId
                    });
                }
            }
            console.log(payload);
            const bodyData = {
                category: "DONATION OFFER",
                payload: payload,
                sender: props.name,
                title: props.title,
                hackathonId: props.hackathonId,
                senderId: props.senderId //for return notification purposes

            };
            //sets up the data for the axios request
            const body = bodyData;
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            //grabs the user associated with a hackathon
            let id = props.recipientId;

            await axios.put(`/api/users/add-notification/${id}`, body, config);

            props.updateView();

        }
        else {
            alert('Please choose at least one item to donate');
        }
    });

    function updateValue(e) {
        updateInputs({
            ...userInputs,
            [e.target.name]: e.target.value
        });
    }
    let incrementor = 0;
    return (
        <Fragment>
            <div className={`modal-background ${show}`}>
                <div className='modal-positioner'>
                    <div className='modal-container'>
                        <div className="header">
                            <h1>What do you want to donate?</h1>
                        </div>
                        <div className="body">
                            <h3>Possible Donations</h3>
                            {props.donations && props.donations.map((donation, index) => (
                                <div key={incrementor++} className="donation-option" data-number={index} data-status='false' tabIndex='0'>
                                    <div className='growing-background'></div>
                                    <p key={incrementor++}>{donation.type}{'\t'}</p>
                                    <p key={incrementor++}>({donation.quantity})</p>
                                    <div className='input-holder' onClick={e => e.stopPropagation()}>
                                        <input key={incrementor++} className='donation-amount' name={donation.type} value={userInputs[donation.type] ? userInputs[donation.type] : ""}
                                            onChange={e => updateValue(e)} type='number' min="0" placeholder="Quantity" onClick={e => e.stopPropagation()} />
                                    </div>
                                </div>
                            ))}
                            <div className="description-container">
                                <h3>Optionally, add a quick description about your donation</h3>
                                <textarea name="description" value={userInputs['description'] ? userInputs['description'] : ""} placeholder="Description..." onChange={e => updateValue(e)}></textarea>
                            </div>
                        </div>
                        <div className='button-centerer'>
                            <button className='submit-button'>Send a donation request</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

DonateToHackathonModal.propTypes = {
    recipientId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
    recipientId: state.hackathons.hackathon.recipient,
    name: state.auth.user.user.name,
    senderId: state.auth.user.user._id,
    title: state.hackathons.hackathon.title,
    hackathonId: state.hackathons.hackathon._id,
    hackathonDonations: state.hackathons.hackathon.donations
});
export default connect(mapStateToProps, {})(DonateToHackathonModal);