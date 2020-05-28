import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import $ from 'jquery';

const DonateToHackathonModal = props => {
    const [counter, updateState] = useState(0);
    $(document).ready(function () {
        window.scrollTo(0, 0);
    });
    let show = props.turnOn ? 'show' : 'no-display'

    $('.modal-background').click(function (e) {
        if (e.target.classList[0] === 'modal-positioner') {
            props.updateView();
        }

    })
    console.log(props.donations);
    let donationStatus;
    if (props.donations) {
        donationStatus = new Array(props.donations.length);
        for (let i = 0; i < donationStatus.length; i++) {
            donationStatus[i] = 'false';
        }
    }
    function toggleDonation(e) {
        e.target.getAttribute('data-status') === 'false' ? e.target.setAttribute('data-status', 'true') : e.target.setAttribute('data-status', 'false');
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
                                <div key={incrementor++} className="donation-option" data-status='false' tabIndex='0'
                                    onClick={e => toggleDonation(e)}>
                                    <p key={incrementor++} onClick={e => console.log('pls bubble')}>{donation.type}{'\t'}</p>
                                    <p key={incrementor++} onClick={e => console.log('pls bubble')}>({donation.quantity})</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DonateToHackathonModal;