import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import axios from "axios";
import { END } from "redux-saga";
import { makeStyles } from "@material-ui/styles";

import wrapper from "../store/configureStore";
import { LOAD_USERINFO_REQUEST } from "../reducers/user";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../components/Editor"), {
    ssr: false
});

const Wrap = styled.div`
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const WriteContainer = styled.div`
    height: 100%;
    width: 50%;
`;

const PreviewContainer = styled.div`
    height: 100%;
    width: 50%;

    padding: 10px 20px;

    & > {
        blockquote {
            line-height: 1.8rem;
            margin-left: 0px;
            margin-right: 0px;
            padding: 15px 15px;
            border-left: 10px solid #27a9e3;
        }

        h1 {
            font-size: 3rem;
            font-weight: bold;
        }

        h2 {
            font-size: 2.5rem;
            font-weight: bold;
        }

        h3 {
            font-size: 2rem;
            font-weight: bold;
        }

        p {
        }
    }
`;

const Write = () => {
    const [markdownText, setMarkdownText] = useState("");
    const [previewText, setPreviewText] = useState(markdownText);

    const onChangeMarkdownText = useCallback(
        (e, editor) => {
            const data = editor.getData();
            setMarkdownText(data);
        },
        [markdownText]
    );

    const onChangeCodeMirror = useCallback((e) => {}, []);

    useEffect(() => {
        hljs.highlightAll();
    }, [previewText]);

    useEffect(() => {
        console.log(markdownText);
        console.log(previewText);
        setPreviewText(markdownText);

        // hljs.highlightAll();
    }, [markdownText, previewText]);

    const testCode = `<script></script>`;

    return (
        <Wrap>
            <Helmet>
                <title>새 글</title>
            </Helmet>
            <WriteContainer>
                <Editor text={markdownText} onChange={onChangeMarkdownText} />
            </WriteContainer>
            <PreviewContainer dangerouslySetInnerHTML={{ __html: previewText }}></PreviewContainer>
        </Wrap>
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

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});

export default Write;
