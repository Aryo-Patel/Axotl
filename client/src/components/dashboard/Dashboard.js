import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Discover from "../discover/Discover";
import Notification from './Notification';
import axios from 'axios';
import './styling/main.css';
import ChatInvitations from './ChatInvitations'

const Dashboard = ({ isRegistered, id }) => {
  const [notifications, updateNotifications] = useState([]);
  const [chatNotifications, updateChatNotifications] = useState([]);
  const [donationNotifications, updateDonationNotifications] = useState([]);
  const [timeToReload, changeReloadStatus] = useState(false);
  useEffect(() => {
    fetchData();

  }, []);
  useEffect(() => {
    //notifications are grabbed
    splitNotifications(notifications);
  }, [notifications]);

  useEffect(() => {
  }, [donationNotifications]);

  function donationNotificationsChanged(id) {
    let donationNotArray = donationNotifications;
    let returnArray = donationNotArray.filter((donationNot) => {
      return donationNot._id + "" !== id + "";
    });
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
  return (
    <Fragment>
      {isRegistered ? (
        <Redirect to="/profile" />
      ) : (
          <div className="dashboard">
            <a id="monke" href="https://www.youtube.com/watch?v=J9qrO_-NLjc">monke</a>
            <div className="notification-center">
              <div className='chat-notifications-wrapper'>
                {/* {chatNotifications.length > 0 ? <p>flesh out the chats MONKE</p> : <p>You have no new chats!</p>} */}
                <ChatInvitations />
              </div>
              <div className="donation-notifications-wrapper">

                {donationNotifications.length > 0 ? donationNotifications.map((donation, index) => {
                  console.log(donation.donId);
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
            </div>

          </div>
        )}
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  isRegistered: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isRegistered: state.auth.isRegistered,
  id: state.auth.user.user._id
});

export default connect(mapStateToProps, {})(Dashboard);
