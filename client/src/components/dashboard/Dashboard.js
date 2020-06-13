import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Discover from "../discover/Discover";
import Notification from './Notification';
import axios from 'axios';
import './styling/main.css';
import ChatInvitations from './ChatInvitations'


import $ from 'jquery';

const Dashboard = ({ isRegistered, id, hasProfile }) => {
  const [notifications, updateNotifications] = useState([]);
  const [chatNotifications, updateChatNotifications] = useState([]);
  const [donationNotifications, updateDonationNotifications] = useState([]);
  const [timeToReload, changeReloadStatus] = useState(false);
  const [notificationDisplay, updateNotificationDisplay] = useState(0);
  const [collapseSidebar, alterCollapseState] = useState(false);
  useEffect(() => {
    fetchData();

  }, []);
  useEffect(() => {
    //notifications are grabbed
    splitNotifications(notifications);
  }, [notifications]);
  useEffect(() => {
    console.log(collapseSidebar);
  }, [collapseSidebar]);
  useEffect(() => {
  }, [donationNotifications]);

  function donationNotificationsChanged(id) {
    let donationNotArray = donationNotifications;
    let returnArray = donationNotArray.filter((donationNot) => {
      return donationNot._id + "" !== id + "";
    });
    console.log('donation action processed');
    updateDonationNotifications(returnArray);
  }

  async function fetchData() {
    let tempNotifications = await axios.get(`/api/users/notifications/${id}`);
    tempNotifications = tempNotifications.data;

    updateNotifications(tempNotifications);
  }

  function splitNotifications(notifications) {
    let tempDonNot = [];
    let tempChatNot = [];
    //notifications are comign through correctly
    notifications.forEach(notification => {

      switch (notification.category) {
        case 'DONATION OFFER':
          tempDonNot.push(notification);
          return;
        case 'NEW MESSAGE':
          tempChatNot.push(notification);
          return;
        default:
          alert('UNCOUGHT CASE [POTATO DEV ARYO]');
      }
    })
    updateDonationNotifications(tempDonNot);
    updateChatNotifications(tempChatNot);
  }
  let incrementor = 0;

  $(document).ready(function () {
    if ($(window).width() < 900) {
      console.log('ran')
      alterCollapseState(true);
    }
    else {
      console.log('ran big');
      alterCollapseState(false);
    }
  })
  $(window).resize(function () {
    if ($(window).width() < 900) {
      console.log('width is small')
      alterCollapseState(true);
    }
    if ($(window).width() > 900) {
      console.log('width is big');
      alterCollapseState(false);
    }
  });
  $('.display-selector-wrapper').css({ 'width': `${$('.display-selector').width() + $(window).width() * 0.1}` });
  return (
    <Fragment>
      {!hasProfile ? (
        <Redirect to="/profile" />
      ) : (
          <div className="dashboard">
            <a id="monke" href="https://www.youtube.com/watch?v=J9qrO_-NLjc">monke</a>


            <div className="center-display-wrapper">
              <div className="display-selector-wrapper">
                <div className="display-selector">
                  {collapseSidebar === false ?
                    <Fragment>
                      <h1 onClick={e => updateNotificationDisplay(0)}>Chats</h1>
                      <h1 onClick={e => updateNotificationDisplay(1)}>Donation Notifications</h1>
                      <h1 onClick={e => updateNotificationDisplay(2)}>General/Updates</h1>
                    </Fragment>
                    :
                    <i class="fas fa-angle-double-right"></i>}
                </div>
              </div>
              <div className="split-line">
                <svg>
                  <rect height="100%"></rect>
                </svg>
              </div>
              <div className="notification-center">
                {notificationDisplay === 0 &&
                  <div className='chat-notifications-wrapper'>
                    {/* {chatNotifications.length > 0 ? <p>flesh out the chats MONKE</p> : <p>You have no new chats!</p>} */}
                    <ChatInvitations />
                  </div>
                }

                {notificationDisplay === 1 &&
                  <div className="donation-notifications-wrapper">
                    {donationNotifications.length > 0 ? donationNotifications.map((donation, index) => {
                      return (
                        <div key={incrementor++} className="notifications donation-notifications">
                          <Notification className='notification' key={incrementor++} header={donation.category} data={donation.payload}
                            id={donation._id} userId={id} sender={donation.sender} updateNotifications={donationNotificationsChanged} title={donation.title}
                            senderId={donation.senderId} hackathonId={donation.hackathonId}
                          />
                        </div>
                      )
                    }) : <p>No new donation notifications!</p>}
                  </div>
                }
                {notificationDisplay === 2 &&
                  <div className="general-notifications-wrapper">
                    <p>General / updates to go here</p>
                  </div>}
              </div>
            </div>
          </div>
        )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  isRegistered: PropTypes.bool.isRequired,
  hasProfile : PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isRegistered: state.auth.isRegistered,
  id: state.auth.user.user._id,
  hasProfile : state.auth.hasProfile
});

export default connect(mapStateToProps, {})(Dashboard);
