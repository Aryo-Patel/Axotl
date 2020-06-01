import React, { Fragment } from 'react';
import axios from 'axios';

const Notification = ({ header, data, sender, id, userId, updateNotifications }) => {
    let incrementor = 0;
    function deleteNotification(e) {
        axios.delete(`/api/users/delete-notification/${userId}/${id}`);
        updateNotifications(id);
    }
    return (
        <div className="notification-wrapper">
            <div className="notification-header">
                <h3>New {header} from {sender} to !</h3>
            </div>
            <div className="notification-body">
                {header === 'DONATION OFFER' &&
                    data.map(donation => (
                        <div className="item" key={incrementor++}>
                            <p key={incrementor++}>Type: {donation.type}</p>
                            <p key={incrementor++}>Quantity: {donation.quantity}</p>
                        </div>
                    ))}
                <p>{data[0].description}</p>
            </div>
            <div className='user-action'>
                <i className="fas fa-check-square action"></i>
                <span className='chat action'>Chat with the sponsor</span>
                <i className="fas fa-times action" onClick={e => deleteNotification(e)}></i>
            </div>
        </div>
    );
}


export default Notification;