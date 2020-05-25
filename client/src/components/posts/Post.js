import React from 'react'
import PropTypes from 'prop-types'

const Post = ({post}) => {
    return (
        <div className="post">
                        <h4 className="post__name">{post.name}</h4>
                        <img src="" alt="" className="post__avatar"/>
                        <h4 className="subheading post__title">{post.title}</h4>
                        <p className="post__content">{post.content}</p>
                    </div>
    )
}

Post.propTypes = {

}

export default Post
