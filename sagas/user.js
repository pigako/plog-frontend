import { all, fork, takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE } from "../reducers/user";

function* watchUserLogin() {
    yield takeLatest(USER_LOGIN_REQUEST, function* userLogin(action) {
        try {
            const result = yield call(() => {
                return axios.post(`/user/signin`, action.data, {
                    withCredentials: true
                });
            }, action.data);

            console.log(result);

            yield put({
                type: USER_LOGIN_SUCCESS,
                data: result.data.userId
            });
        } catch (error) {
            console.log(error);
            put({
                type: USER_LOGIN_FAILURE,
                error: error
            });
        }
    });
}

export default function* postSaga() {
    yield all([fork(watchUserLogin)]);
}
