import { all, fork } from "redux-saga/effects";
import axios from "axios";

import postSaga from "./post";
import userSaga from "./user";

axios.defaults.baseURL = process.env.NODE_ENV === "production" ? `https://www.pigako.com/api/v1` : `http://localhost:4000/api/v1`;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([fork(postSaga), fork(userSaga)]);
}
