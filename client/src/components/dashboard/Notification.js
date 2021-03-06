import React, { Fragment } from 'react';
import axios from 'axios';
import $ from 'jquery';
const Notification = ({ header, data, sender, id, userId, updateNotifications, title, hackathonId, senderId }) => {
    let incrementor = 0;
    async function deleteNotification(e) {
        await axios.delete(`/api/users/delete-notification/${userId}/${id}`);
        updateNotifications(id);
    }
    async function addDonation(e) {
        let notificationBody = e.target.parentNode.parentNode.children[1];
        let jqueryNotificationBody = $(notificationBody);

        jqueryNotificationBody.find('.item').each(function () {
            let fullClass = $(this).find('.type').attr('class').split(" ");
            let classes = fullClass.slice(1).join(" ");
            data.map(async (donation) => {
                if (donation.type + "" === classes + "") {
                    const config = {
                        headers: {
                            'content-type': 'application/json'
                        }
                    }
                    const body = {
                        sponsor: sender,
                        quantity: donation.quantity,
                        description: donation.description
                    }
                    console.log(`hackathon id: ${JSON.stringify(hackathonId)}`);
                    console.log(`donation id: ${JSON.stringify(donation.donId)}`);

                    await axios.put(`/api/hackathons/edit/add-donations-received/${hackathonId}/${donation.donId}`, body, config);
                }
            });

        })
        updateNotifications(id);
    }
    async function chatWithSponsor(e) {
        console.log(typeof (id));
        const body = {
            name: `Donations to ${title}`,
            recipients: [userId],
            sponsors: [senderId],
            messages: []
        }
        console.log(body);
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        await axios.post('api/chat/create', body, config);
    }
    return (
        <div>
            <div className="notification-wrapper">
                <div className="notification-header">
                    <p>New {header} from {sender} to {title}!</p>
                
                    <div className="notification-body">
                        <div className="arrow"></div>
                        {header === 'DONATION OFFER' &&
                            data.map(donation => (
                                <div className={`item ${donation.type}`} key={incrementor++}>
                                    <p key={incrementor++} className={`type ${donation.type}`}>Type: {donation.type}</p>
                                    <p key={incrementor++} className="quantity">Quantity: {donation.quantity}</p>
                                </div>
                            ))}
                        <p>{data[0].description}</p>
                    </div>
                </div>
                    
                <div className='user-action'>
                    <i className="checkmark fas fa-check action" onClick={e => addDonation(e)}></i>
                    <strong><span className='chat action' onClick={e => chatWithSponsor(e)}>Chat with the sponsor</span></strong>
                    <i className="xsign fas fa-times action" onClick={e => deleteNotification(e)}></i>
                </div>
            </div>
            <br></br>
        </div>
    
    );
}


export default Notification;