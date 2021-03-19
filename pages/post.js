import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { LOAD_POST_REQUEST } from "../reducers/post";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";

const Post = () => {
    const { post } = useSelector((state) => state.post);

    return <a>{post.title}</a>;
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";

    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.query.id
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Post;
