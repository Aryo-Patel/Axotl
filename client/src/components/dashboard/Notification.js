import React, { Fragment } from 'react';
import axios from 'axios';
import $ from 'jquery';
const Notification = ({ header, data, sender, id, userId, updateNotifications, title, hackathonId }) => {
    let incrementor = 0;
    async function deleteNotification(e) {
        await axios.delete(`/api/users/delete-notification/${userId}/${id}`);
        updateNotifications(id);
    }
    async function addDonation(e) {
        $('.item').each(function () {
            console.log(hackathonId);
            //console.log($(this).find('.type').attr('class').split(" ")[1]);
            data.map(async (donation) => {
                if (donation.type + "" === $(this).find('.type').attr('class').split(" ")[1] + "") {
                    console.log(donation.donId);
                    const config = {
                        headers: {
                            'content-type': 'application/json'
                        }
                    }
                    const body = {

                    }
                    await axios.put(`/api/hackathons/add-donations-received/${hackathonId}/${donation.donId}`);
                }
            })
        });

        //updateNotifications(id);
    }
    return (
        <div className="notification-wrapper">
            <div className="notification-header">
                <h3>New {header} from {sender} to {title}!</h3>
            </div>
            <div className="notification-body">
                {header === 'DONATION OFFER' &&
                    data.map(donation => (
                        <div className={`item ${donation.type}`} key={incrementor++}>
                            <p key={incrementor++} className={`type ${donation.type}`}>Type: {donation.type}</p>
                            <p key={incrementor++} className="quantity">Quantity: {donation.quantity}</p>
                        </div>
                    ))}
                <p>{data[0].description}</p>
            </div>
            <div className='user-action'>
                <i className="fas fa-check-square action" onClick={e => addDonation(e)}></i>
                <span className='chat action'>Chat with the sponsor</span>
                <i className="fas fa-times action" onClick={e => deleteNotification(e)}></i>
            </div>
        </div>
    );
}


export default Notification;