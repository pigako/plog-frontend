import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import Helmet from "react-helmet";
import styled, { css } from "styled-components";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

import wrapper from "../store/configureStore";
import { LOAD_USERINFO_REQUEST } from "../reducers/user";
import { LOAD_POST_REQUEST } from "../reducers/post";

// import dynamic from "next/dynamic";
// dynamic(
//     () => {
//         import("highlightjs-line-numbers.js");
//     },
//     {
//         ssr: false
//     }
// );

const Container = styled.div``;

const PostDiv = styled.div``;

const PostTitle = styled.div``;

const PostContents = styled.div`
    & {
        line-height: 1.3rem;
    }

    & code {
        /* padding: 20px; */

        max-height: 500px;

        white-space: pre;
        overflow-x: auto;

        /* counter-reset: line; */
        /* ::before {
            counter-increment: line;
            content: counter(line);
            display: inline-block;
            border-right: 1px solid #ddd;
            padding: 0 0.5em;
            margin-right: 0.5em;
            color: #888;
        } */

        ${(props) => {
            if (props.isLoadCode) {
                return css`
                    display: visible;
                `;
            } else {
                return css`
                    display: none;
                `;
            }
        }}
    }
`;

const Post = () => {
    const { post } = useSelector((state) => state.post);
    const [isLoadCode, setIsLoadCode] = useState(false);

    useEffect(() => {
        hljs.initHighlightingOnLoad();
        hljs.configure({ tabReplace: "    " });
        hljs.highlightAll();

        setIsLoadCode(true);
    }, []);

    return (
        <Container>
            <Helmet>
                <style></style>
            </Helmet>
            <PostDiv>
                <PostTitle>{post.title}</PostTitle>
                <PostContents dangerouslySetInnerHTML={{ __html: post.contents }} isLoadCode={isLoadCode}></PostContents>
            </PostDiv>
        </Container>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";

    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
        type: LOAD_USERINFO_REQUEST
    });

    context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.query.id
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Post;
