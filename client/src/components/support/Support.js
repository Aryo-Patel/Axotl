import React from 'react'
import PropTypes from 'prop-types'

import "./styling/support.css";

const Support = ({}) => {
    const handleClick = (e) => {
        console.log(e.target)
        let node = e.target.parentNode.childNodes[1];
        if(e.target.classList.contains("dropArrow"))
            node = e.target.parentNode.parentNode.childNodes[1];
        if(node.classList.contains("droppedAnswer"))
            node.classList.remove("droppedAnswer")
        else
            node.classList.add("droppedAnswer")
    }
    return (
        <div className='support'>
            <div className="support__faq">
            <h3 className="support__faq-heading subheading">Frequently Asked Questions</h3>
            <ul className="support__faq-list">
                <div className="support__dropdown">
                    <li className="support__faq-question" onClick = {e => handleClick(e)}>{"How do I create a hackathon?"}<p className="dropArrow">&#9947;</p></li>
                    <p className="support__faq-answer">You have to have an organizer account to create a hackathon. Once you do, simply click on the tab on the navigation to be presented with a modal to create a hackathon</p>
                </div>
                <div className="support__dropdown">
                    <li className="support__faq-question" onClick = {e => handleClick(e)}>{"How do I chat with a user?"}<p className="dropArrow">&#9947;</p></li>
                    <p className="support__faq-answer">There are multiple ways to chat with an individual. If you have encountered their profile in Discover, you can simply navigate to their individual page and click "Chat with this user!". You can also search users on the chat page through the chat creation function. This will allow you to send a chat request. Once they accept, you can introduce yourself and hopefully begin a fruitful relationship.</p>
                </div>
                <div className="support__dropdown">
                    <li className="support__faq-question" onClick = {e => handleClick(e)}>{"How do I remove or edit my own posts?"}<p className="dropArrow">&#9947;</p></li>
                    <p className="support__faq-answer">Regardless of the way you view a post-through my posts, through the posts page, or on an individual post page, if you authored the it, a triple dot dropdown will be visible that will allow you to edit or delete the post. The same applies for replies and comments.</p>
                </div>
                <div className="support__dropdown">
                    <li className="support__faq-question" onClick = {e => handleClick(e)}>{"How do I use the discover page?"}<p className="dropArrow">&#9947;</p></li>
                    <p className="support__faq-answer">The discover page gives you all the tools you need to connect with the "other half" of <i>Axotl</i>. When you enter the page, the items (hackathons or sponsors) are displayed by order of creation. You can then further sort by tags such as food or prizes, search by name, or order by distance from yourself.</p>
                </div>
                <div className="support__dropdown">
                    <li className="support__faq-question" onClick = {e => handleClick(e)}>{"How do I check if my hackathon has donation offers?"}<p className="dropArrow">&#9947;</p></li>
                    <p className="support__faq-answer">When a sponsor offers to donate to you, a notification will appear on your dashboard. You can then chat with the sponsor to iron out the details or simply reject it without any further interaction. Axotl emphasizes interaction, and the chat functionality demonstrates this importance.</p>
                </div>
                <div className="support__dropdown">
                    <li className="support__faq-question" onClick = {e => handleClick(e)}>{"How do I find chat requests?"}<p className="dropArrow">&#9947;</p></li>
                    <p className="support__faq-answer">Chat requests are displayed on each users dashboard, where they can accept or reject them (rejection deliberately does not notify the sender). Once you accept, you can begin a conversation.</p>
                </div>
            </ul>
            </div>
            <div className="support__contact-us">
                <h3 className="support__contact-us-heading subheading">Contact Us</h3>
                <p>For any further questions or issues, you can contact us <a href="mailto:support@axotl.com" className="support__contact-us-email">here</a>.</p>
            </div>
        </div>
    )
}

Support.propTypes = {

}

export default Support
