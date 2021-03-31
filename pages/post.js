import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import styled from "styled-components";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

import wrapper from "../store/configureStore";
import { LOAD_USERINFO_REQUEST } from "../reducers/user";
import { LOAD_POST_REQUEST } from "../reducers/post";

import dynamic from "next/dynamic";
dynamic(
    () => {
        import("highlightjs-line-numbers.js");
    },
    {
        ssr: false
    }
);

const PostDiv = styled.div``;

const PostTitle = styled.div``;

const PostContents = styled.div`
    & {
        line-height: 1.3rem;
    }

    & code {
        padding: 20px;

        max-height: 500px;

        white-space: pre;
        overflow-x: auto;
    }
`;

const Post = () => {
    const { post } = useSelector((state) => state.post);
    const [content, setContent] = useState("");

    const createHighlightedCodeBlock = (content, language) => {
        let lineNumber = 0;
        const highlightedContent = hljs.highlightAuto(content, [language]).value;

        /* Highlight.js wraps comment blocks inside <span class="hljs-comment"></span>.
           However, when the multi-line comment block is broken down into diffirent
           table rows, only the first row, which is appended by the <span> tag, is
           highlighted. The following code fixes it by appending <span> to each line
           of the comment block. */
        const commentPattern = /<span class="hljs-comment">(.|\n)*?<\/span>/g;
        const adaptedHighlightedContent = highlightedContent.replace(commentPattern, (data) => {
            return data.replace(/\r?\n/g, () => {
                return '\n<span class="hljs-comment">';
            });
        });

        const contentTable = adaptedHighlightedContent
            .split(/\r?\n/)
            .map((lineContent) => {
                return `<tr>
                    <td class='line-number' data-pseudo-content=${++lineNumber}></td>
                    <td>${lineContent}</td>
                  </tr>`;
            })
            .join("");

        return `<pre><code><table class='code-table'>${contentTable}</table></code></pre>`;
    };

    useEffect(() => {
        hljs.initHighlightingOnLoad();
        hljs.configure({ tabReplace: "    " });

        const parseContent = createHighlightedCodeBlock(post.contents, "typescript");
        setContent(parseContent);

        hljs.highlightAll();
    }, [post.contents]);

    return (
        <PostDiv>
            <PostTitle>{post.title}</PostTitle>
            <PostContents dangerouslySetInnerHTML={{ __html: content }}>{}</PostContents>
        </PostDiv>
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
