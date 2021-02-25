import produce from "immer";

export const initialState = {
    posts: [],
    post: {}
};

export const LOAD_POSTS_REQUEST = `LOAD_POSTS_REQUEST`;
export const LOAD_POSTS_SUCCESS = `LOAD_POSTS_SUCCESS`;
export const LOAD_POSTS_FAILURE = `LOAD_POSTS_FAILURE`;

export const LOAD_POST_REQUEST = `LOAD_POST_REQUEST`;
export const LOAD_POST_SUCCESS = `LOAD_POST_SUCCESS`;
export const LOAD_POST_FAILURE = `LOAD_POST_FAILURE`;

const reduce = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOAD_POSTS_REQUEST: {
                draft.posts = [];
                break;
            }
            case LOAD_POSTS_SUCCESS: {
                action.data.forEach((d) => {
                    draft.posts.push(d);
                });
                break;
            }
            case LOAD_POSTS_FAILURE: {
                draft.posts = [];
                break;
            }

            case LOAD_POST_REQUEST: {
                draft.post = {};
                break;
            }
            case LOAD_POST_SUCCESS: {
                draft.post = action.data;
                break;
            }
            case LOAD_POST_FAILURE: {
                draft.post = {};
                break;
            }
        }
    });
};

export default reduce;
