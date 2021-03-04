import React, { useEffect } from "react";
import axios from "axios";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import { useSelector } from "react-redux";
import PostCard from "../components/PostCard";
import styled from "styled-components";

const PostList = styled.div`
    width: 100%;
    height: 400px;
`;

const Posts = () => {
    const { posts } = useSelector((state) => state.post);
    return (
        <PostList>
            {posts?.map((post) => {
                console.log(post);
                return <PostCard key={+post.id} post={post} />;
            })}
        </PostList>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";

    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
        type: LOAD_POSTS_REQUEST,
        data: { keyword: context.query.keyword }
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Posts;
