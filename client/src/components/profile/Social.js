import React from 'react'

function Social({props}) {
    let {social} = props;
    let socialDisplay;
    if (social){
    socialDisplay = Object.keys(social).map((key, index) => {
        console.log(key);
        return(
            <div key={index} name= {key}>
                <i  className={`fab fa-${key}`}></i>
            </div>
            
        )
        })
    } else {
        socialDisplay = <div></div>
    }
    return (
        <div className = "socials">
            <h3 className = "socials-header">Connect with me!</h3>
            {socialDisplay}
        </div>
    )
}

export default Social;