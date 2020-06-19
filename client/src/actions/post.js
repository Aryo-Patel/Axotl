import axios from "axios";

import {
    USER_LOADED,
    CREATE_POST,
    POST_FAIL,
    EDIT_POST,
    GET_POSTS,
    GET_POST,
    GET_MY_POSTS,
    ADD_COMMENT,
    EDIT_COMMENT,
    ADD_REPLY,
    EDIT_REPLY,
    DELETE_POST,
    DELETE_COMMENT,
    DELETE_REPLY,
    ADD_LIKE,
    REMOVE_LIKE,
    LIKE_COMMENT,
    LIKE_REPLY,
    SET_LOADING,
    CONFIRMATION,
    ERROR,
} from "./Types.js";

//importing alert actions
import { setConfirmation, setError } from "./alert";

//action for creating a post
export const createPost = (formData) => async(dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify(formData);
    try {
        const res = await axios.post("/api/posts", body, config);
        dispatch({
            type: CREATE_POST,
            payload: res.data.newPost,
        });
        const payload = {
            user: { user: res.data.user },
            sponsor: res.data.user.sponsor,
        };
        dispatch({
            type: USER_LOADED,
            payload,
        });
        dispatch(setConfirmation("Post Created"));
    } catch (err) {
        console.error(err);
        dispatch({
            type: POST_FAIL,
        });
        dispatch(setError(err.response.data.msg.message));
    }
};

//action for editing a post
export const editPost = (formData, post_id) => async(dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify(formData);
    try {
        const res = await axios.put(`/api/posts/${post_id}`, body, config);
        dispatch({
            type: EDIT_POST,
            payload: res.data,
        });
    } catch (err) {
        console.error(err);
        dispatch({
            type: POST_FAIL,
        });
    }
};

//action for deleting a post
export const deletePost = (post_id) => async(dispatch) => {
    try {
        const res = await axios.delete(`/api/posts/${post_id}`);
        dispatch({
            type: DELETE_POST,
            payload: res.data,
        });
        //dispatching confirmation alert
        dispatch(setConfirmation("Post deleted"));
    } catch (err) {
        console.error(err);
        dispatch({
            type: POST_FAIL,
        });
    }
};

export const getPosts = (pageNumber) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/posts/?pageNumber=${pageNumber}`);
        dispatch({
            type: GET_POSTS,
            payload: res.data,
        });
    } catch (err) {
        console.error(err);
        // dispatch({
        //     type: POST_FAIL
        // })
    }
};

export const getPost = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/posts/single/${id}`);
        dispatch({
            type: GET_POST,
            payload: res.data,
        });
    } catch (err) {
        console.error(err);
        dispatch({
            type: POST_FAIL,
        });
    }
};

export const getMyPosts = (pageNumber) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/posts/me/?pageNumber=${pageNumber}`);
        console.log(res.data);
        dispatch({
            type: GET_MY_POSTS,
            payload: res.data,
        });
    } catch (err) {
        console.error(err);
        dispatch({
            type: POST_FAIL,
        });
    }
};

export const addComment = (formData, post_id) => async(dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify(formData);
    try {
        const res = await axios.put(`/api/posts/${post_id}/comments`, body, config);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data.post,
        });
        dispatch({
            type: USER_LOADED,
            payload: {
                user: { user: res.data.user },
                sponsor: res.data.user.sponsor,
            },
        });
    } catch (err) {
        console.error(err);
        dispatch({
            type: POST_FAIL,
        });
    }
};

export const editComment = (text, post_id, comment_id) => async(dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ text });
    try {
        const res = await axios.put(
            `/api/posts/${post_id}/comments/${comment_id}`,
            body,
            config
        );
        dispatch({
            type: EDIT_COMMENT,
            payload: res.data.post,
        });
        dispatch(setConfirmation("Comment Updated"));
    } catch (err) {
        console.error(err);
        dispatch({
            type: POST_FAIL,
        });
    }
};

export const deleteComment = (post_id, comment_id) => async(dispatch) => {
    try {
        console.log(post_id, comment_id);
        const res = await axios.delete(
            `/api/posts/${post_id}/comments/${comment_id}`
        );
        dispatch({
            type: DELETE_COMMENT,
            payload: res.data,
        });
        dispatch(setConfirmation("Comment Removed"));
    } catch (err) {
        console.error(err);
        dispatch({
            type: POST_FAIL,
        });
    }
};

export const addReply = (text, post_id, comment_id) => async(dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ text });
    try {
        const res = await axios.put(
            `/api/posts/${post_id}/comments/${comment_id}/replies`,
            body,
            config
        );
        dispatch({
            type: ADD_REPLY,
            payload: res.data,
        });
    } catch (err) {
        console.error(err);
        dispatch({
            type: POST_FAIL,
        });
    }
};

export const editReply = (text, post_id, comment_id, reply_id) => async(
    dispatch
) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const body = JSON.stringify({ text });
    try {
        const res = await axios.patch(
            `/api/posts/${post_id}/comments/${comment_id}/replies/${reply_id}`,
            body,
            config
        );
        dispatch({
            type: EDIT_REPLY,
            payload: res.data,
        });
        dispatch(setConfirmation("Reply Updated"));
    } catch (err) {
        console.error(err);
        dispatch({
            type: POST_FAIL,
        });
    }
};

export const deleteReply = (post_id, comment_id, reply_id) => async(
    dispatch
) => {
    try {
        const res = await axios.delete(
            `/api/posts/${post_id}/comments/${comment_id}/replies/${reply_id}`
        );
        dispatch({
            type: DELETE_REPLY,
            payload: res.data,
        });
        dispatch(setConfirmation("Reply Removed"));
    } catch (err) {
        console.error(err);
        dispatch({
            type: POST_FAIL,
        });
    }
};

export const addLike = (post_id) => async(dispatch) => {
    try {
        const res = await axios.put(`/api/posts/${post_id}/likes`);
        dispatch({
            type: ADD_LIKE,
            payload: {
                likes: res.data.likes,
                post: res.data.post,
            },
        });
        console.log(res.data.user);
        dispatch({
            type: USER_LOADED,
            payload: { user: { user: res.data.user } },
        });
    } catch (err) {
        console.error(err);
        dispatch({
            type: POST_FAIL,
        });
    }
};

export const likeComment = (post_id, comment_id, div) => async(dispatch) => {
    try {
        const res = await axios.put(
            `/api/posts/${post_id}/comments/${comment_id}/likes`
        );
        if (div.dataset.requestcounter === "1") {
            div.dataset.loading = "false";
        }

        dispatch({
            type: LIKE_COMMENT,
            payload: { res: res.data, counter: div.dataset.requestcounter },
        });
        div.dataset.requestcounter = Number(div.dataset.requestcounter) - 1;
    } catch (err) {
        if (div.dataset.requestcounter === "1") {
            div.dataset.loading = "false";
        }
        div.dataset.requestcounter = Number(div.dataset.requestcounter) - 1;
        console.error(err);
        // dispatch({
        //     type: POST_FAIL,
        // });
    }
};

export const likeReply = (post_id, comment_id, reply_id, div) => async(
    dispatch
) => {
    console.log('likeReply action hit')
    try {
        const res = await axios.put(
            `/api/posts/${post_id}/comments/${comment_id}/replies/${reply_id}/likes`
        );
        if (div.dataset.requestcounter === "1") {
            div.dataset.loading = "false";
        }
        console.log(`counter = ${div.dataset.requestcounter}`)
        dispatch({
            type: LIKE_REPLY,
            payload: { res: res.data, counter: div.dataset.requestcounter },
        });
        div.dataset.requestcounter = Number(div.dataset.requestcounter) - 1;
    } catch (err) {
        console.error(err);
        if (div.dataset.requestcounter === "1") {
            div.dataset.loading = "false";
        }
        div.dataset.requestcounter = Number(div.dataset.requestcounter) - 1;
        // dispatch({
        //     type: POST_FAIL,
        // });
    }
};