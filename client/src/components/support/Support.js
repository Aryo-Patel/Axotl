import React from 'react'
import PropTypes from 'prop-types'

import "./styling/support.css";

const Support = ({}) => {
    return (
        <div className='support'>
            <div className="support__faq">
            <h3 className="support__faq-heading subheading">Frequently Asked Questions</h3>
            <ul className="support__faq-list">
                <li className="support__faq-question">&bull; How do I create a hackathon?</li>
                <p className="support__faq-answer">Simply click on the tab on the navigation to be presented with a modal to create a hackathon</p>
                <li className="support__faq-question">&bull; How do I create a hackathon?</li>
                <p className="support__faq-answer">Simply click on the tab on the navigation to be presented with a modal to create a hackathon</p>
                <li className="support__faq-question">&bull; How do I create a hackathon?</li>
                <p className="support__faq-answer">Simply click on the tab on the navigation to be presented with a modal to create a hackathon</p>
                <li className="support__faq-question">&bull; How do I create a hackathon?</li>
                <p className="support__faq-answer">Simply click on the tab on the navigation to be presented with a modal to create a hackathon</p>
                <li className="support__faq-question">&bull; How do I create a hackathon?</li>
                <p className="support__faq-answer">Simply click on the tab on the navigation to be presented with a modal to create a hackathon</p>
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
