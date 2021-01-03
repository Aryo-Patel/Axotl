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
    posts: { posts: [] },
    post: null,
    myPosts: [],
    loading: true,
    myPostsLoading: true,
    singularLoading: true,
    numPosts: 0,
    numMyPosts: 0,
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    let posts = [];
    let newMyPosts = [];
    let post;
    let comment;
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
            console.log(
                state.posts.posts.filter(
                    (post) => post._id.toString() != payload.post.toString()
                )
            );
            console.log("CORRECT");
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
                posts: { posts: payload.posts },
                numPosts: payload.num,
                loading: false,
            };
        case GET_POST:
            return {
                ...state,
                post: payload.post,
                singularLoading: false,
            };
        case DELETE_COMMENT:
        case EDIT_COMMENT:
        case ADD_COMMENT:
            console.log(state.posts.posts);
            newMyPosts = state.myPosts.map((myPost) => {
                if (myPost._id.toString() == payload._id.toString()) {
                    return payload;
                } else {
                    return myPost;
                }
            });
            console.log(payload)
            return {
                ...state,
                posts: {
                    posts: state.posts.posts.map((post) => {
                        return post._id.toString() == payload._id.toString() ?
                            payload :
                            post;
                    }),
                },
                post: payload,
                myPosts: newMyPosts,
                loading: false,
            };
        case ADD_LIKE:
            newMyPosts = state.myPosts.map((myPost) => {
                if (myPost._id.toString() == payload._id.toString()) {
                    return payload;
                } else {
                    return myPost;
                }
            });
            posts = state.posts.posts.map((post) => {
                if (post._id.toString() == payload.post._id.toString()) {
                    post.likes = payload.likes;
                    return {
                        ...post,
                    };
                } else {
                    return post;
                }
            });
            return {
                ...state,
                posts: {
                    posts: posts,
                },
                post: payload.post,
                myPosts: newMyPosts,
                loading: false,
            };
        case LIKE_COMMENT:
            newMyPosts = state.myPosts.map((myPost) => {
                if (myPost._id.toString() == payload.post._id.toString()) {
                    return payload.res;
                } else {
                    return myPost;
                }
            });
            console.log({...payload.post.post })
            if (payload.counter === "1") {
                return {
                    ...state,
                    post: {...payload.post.post },
                    myPosts: newMyPosts,
                    loading: false,
                }
            } else {
                return {
                    ...state,
                    post: {...payload.post.post },
                    myPosts: state.myPosts,
                    loading: false,
                }
            }
        case ADD_REPLY:
        case DELETE_REPLY:
        case EDIT_REPLY:
            console.log(payload);
            newMyPosts = state.myPosts.map((myPost) => {
                if (myPost._id.toString() == payload._id.toString()) {
                    return payload;
                } else {
                    return myPost;
                }
            });
            post = state.post
            comment = post.comments.filter(
                (comment) =>
                comment._id.toString() == payload.comment_id.toString()
            )[0];
            comment.replies = payload.replies;
            post = {
                ...post,
                comments: [...post.comments],
            };
            return {
                ...state,
                post: {...post },
                myPosts: newMyPosts,
                loading: false,
            };

        case LIKE_REPLY:
            console.log(payload.res);
            newMyPosts = state.myPosts.map((myPost) => {
                if (myPost._id.toString() == payload.res._id.toString()) {
                    return payload.res;
                } else {
                    return myPost;
                }
            });
            post = state.post
            comment = post.comments.filter(
                (comment) =>
                comment._id.toString() == payload.res.comment_id.toString()
            )[0];
            comment.replies = payload.res.replies;
            console.log(`reducer counter = ${payload.counter}`)
            post = {
                ...post,
                comments: [...post.comments],
            };
            if (payload.counter === "1") {
                console.log('updating the redux')
                return {
                    ...state,
                    post: {
                        ...post
                    },
                    myPosts: newMyPosts,
                    loading: false,
                };
            } else {
                console.log('not updating the redux')
                return {
                    ...state,
                    post: {
                        ...post
                    },
                    myPosts: state.myPosts,
                    loading: false,
                };
            }
        case GET_MY_POSTS:
            return {
                ...state,
                myPosts: payload.myPosts,
                numMyPosts: payload.num,
                myPostsLoading: false,
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