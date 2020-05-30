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

    function containsValue(array, term) {
        console.log(array);
        for (let i = 0; i < array.length; i++) {
            if (array[i] === term) {
                return true;
            }
        }
        return false;
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


    $('.submit-button').unbind().click(function (e) {
        if (containsValue(donationStatus, 'true')) {
            console.log('checker is working');
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
    function processDonation() {
        console.log(userInputs);
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
                                            onChange={e => updateValue(e)} placeholder="Quantity" onClick={e => e.stopPropagation()} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='button-centerer'>
                            <button className='submit-button' onClick={e => processDonation()}>Send a donation request</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DonateToHackathonModal;