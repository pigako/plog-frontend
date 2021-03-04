import { call, put, takeLatest, fork, all } from "redux-saga/effects";
import axios from "axios";
import { LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE, LOAD_POST_REQUEST, LOAD_POST_FAILURE, LOAD_POST_SUCCESS } from "../reducers/post";

function* watchLoadPosts() {
    yield takeLatest(LOAD_POSTS_REQUEST, function* loadPosts(action) {
        try {
            const result = yield call(() => {
                return axios.get(`/posts`, {
                    withCredentials: true
                });
            }, action.data.keyword);

            yield put({
                type: LOAD_POSTS_SUCCESS,
                data: result.data.posts
            });
        } catch (error) {
            console.log(error);
            put({
                type: LOAD_POSTS_FAILURE,
                error: error
            });
        }
    });
}

function* watchLoadPost() {
    yield takeLatest(LOAD_POST_REQUEST, function* loadPost(action) {
        try {
            const result = yield call((id) => {
                return axios.get(`posts/${id}`, {
                    withCredentials: true
                });
            }, action.data);

            if (!result.data.post) {
                throw new Error();
            }

            yield put({
                type: LOAD_POST_SUCCESS,
                data: result.data.post
            });
        } catch (error) {
            console.log(error);
            put({
                type: LOAD_POST_FAILURE,
                error: error
            });
        }
    });
}

export default function* postSaga() {
    yield all([fork(watchLoadPosts), fork(watchLoadPost)]);
}
