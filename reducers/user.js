import produce from "immer";

export const initialState = {
    user: {},
    isLoggingIn: false,
    isLoggedIn: false
};

export const USER_LOGIN_REQUEST = `USER_LOGIN_REQUEST`;
export const USER_LOGIN_SUCCESS = `USER_LOGIN_SUCCESS`;
export const USER_LOGIN_FAILURE = `USER_LOGIN_FAILURE`;

export const LOAD_USERINFO_REQUEST = `LOAD_USERINFO_REQUEST`;
export const LOAD_USERINFO_SUCCESS = `LOAD_USERINFO_SUCCESS`;
export const LOAD_USERINFO_FAILURE = `LOAD_USERINFO_FAILURE`;

const reduce = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case USER_LOGIN_REQUEST:
                draft.isLoggingIn = true;
                draft.isLoggedIn = false;
                draft.user = {};
                break;
            case USER_LOGIN_SUCCESS:
                draft.isLoggingIn = false;
                draft.isLoggedIn = true;
                draft.user = action.data;
                break;
            case USER_LOGIN_FAILURE:
                draft.isLoggingIn = false;
                draft.isLoggedIn = false;
                break;

            case LOAD_USERINFO_REQUEST:
                draft.user = {};
                draft.isLoggingIn = true;
                draft.isLoggedIn = false;
                break;
            case LOAD_USERINFO_SUCCESS:
                console.log(`reducer`, action.data);
                draft.user = action.data;
                draft.isLoggingIn = false;
                draft.isLoggedIn = true;
                break;
            case LOAD_USERINFO_FAILURE:
                console.log("LOGIN_FAIL");
                draft.user = {};
                draft.isLoggingIn = false;
                draft.isLoggedIn = false;
                break;
        }
    });
};

export default reduce;
