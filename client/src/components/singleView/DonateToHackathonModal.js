import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
        console.log('component rerendered');
        donationStatus = new Array(props.donations.length);
        for (let i = 0; i < donationStatus.length; i++) {
            donationStatus[i] = 'false';
        }
    }

    function containsValue(array, term) {
        console.log(array);
        for (let i = 0; i < array.length; i++) {
            console.log('in the for loop');
            if (array[i] === term) {
                return true;
            }
        }
        console.log('got here');
        return false;
    }

    //this controls the grey bar that comes in as well as the fade in of the input
    $('.donation-option').click(function (e) {
        if (e.target.nodeName === 'INPUT') {

        }
        else {
            if ($(this).attr('data-status') === 'false') {
                let index = $(this).attr('data-number');
                donationStatus[index] = 'true';
                console.log(donationStatus[index]);
                $(this).find(`.growing-background`).css({ 'width': '100%' });
                $(this).find('.donation-amount').css({ 'opacity': '100%' });
                $(this).find('.donation-amount').css({ 'visibility': 'visible' });

            }
            else {
                $(this).attr('data-status', 'false');
                let index = $(this).attr('data-number');
                donationStatus[index] = 'false';
                console.log(donationStatus[index]);
                $(this).find('.growing-background').css({ 'width': '0%' });
                $(this).find('.donation-amount').css({ 'opacity': '0%' });
                $(this).find('.donation-amount').css({ 'visibility': 'hidden' });
            }
        }
    });


    $('.submit-button').unbind().click(function (e) {
        console.log(donationStatus);
        if (containsValue(donationStatus, 'true')) {
            console.log('checker is working');
        }
        else {
            alert('Please choose at least one item to donate');
        }
    })
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
                                    <p key={incrementor++} onClick={e => console.log('pls bubble')}>{donation.type}{'\t'}</p>
                                    <p key={incrementor++} onClick={e => console.log('pls bubble')}>({donation.quantity})</p>
                                    <div className='input-holder' onClick={e => e.stopPropagation()}>
                                        <input key={incrementor++} className='donation-amount' placeholder="Quantity" onClick={e => e.stopPropagation()} />
                                    </div>
                                </div>
                            ))}
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

export default DonateToHackathonModal;