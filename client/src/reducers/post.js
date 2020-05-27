import {
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
} from "../actions/Types";

const initialState = {
    posts: [],
    post: null,
    loading: true,
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CREATE_POST:
            // console.log(payload);
            // state.posts.posts.unshift(payload);
            return {
                ...state,
                posts: { posts: [payload, ...state.posts.posts] },
                loading: false,
            };
        case EDIT_POST:
            return {
                ...state,
                posts: payload,
                loading: false,
            };
        case DELETE_POST:
            console.log(state.posts.posts.filter(
                (post) => post._id.toString() != payload.post.toString()
            ))
            console.log("CORRECT")
            return {
                ...state,
                posts: {
                    posts: state.posts.posts.filter(
                        (post) => post._id.toString() != payload.post.toString()
                    ),
                },
            };
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false,
            };
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false,
            };
        case DELETE_COMMENT:
        case EDIT_COMMENT:
        case ADD_COMMENT:
            return {
                ...state,
                posts: {
                    posts: state.posts.posts.map((post) => {
                        return post._id.toString() == payload._id.toString() ?
                            payload :
                            post;
                    }),
                },
                loading: false,
            };
        case ADD_LIKE:
            return {
                ...state,
                posts: {
                    posts: state.posts.posts.map((post) => {
                        if (post._id.toString() == payload.post.toString()) {
                            post.likes = payload.likes;
                            return post;
                        } else {
                            return post;
                        }
                    }),
                },
                loading: false,
            };
        case POST_FAIL:
            return {
                ...state,
                loading: true,
                post: null,
                posts: [],
            };
        default:
            return state;
    }
}