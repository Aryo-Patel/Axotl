import React from 'react'

function Social({props}) {
    let {social} = props;
    let socialDisplay;
    if (social){
    socialDisplay = Object.keys(social).map((key, index) => {
        return(
            <div>
                <i class={`fab fa-${key}`}></i>
                <a href={social[key]}>{social[key]}</a>
            </div>
            
        )
        })
    } else {
        socialDisplay = <div></div>
    }
    return (
        <div>
            {socialDisplay}
        </div>
    )
}

export default Social;