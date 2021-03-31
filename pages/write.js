import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import axios from "axios";
import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import wrapper from "../store/configureStore";
import { LOAD_USERINFO_REQUEST } from "../reducers/user";
import Button from "../components/designs/Button";

import dynamic from "next/dynamic";
import { CREATE_POST_REQUEST } from "../reducers/post";

const Editor = dynamic(() => import("../components/Editor"), {
    ssr: false
});

const Form = styled.form`
    height: 100%;
`;

const Title = styled.h1`
    display: block;
    font-weight: bold;
    margin: 20px;
    width: 50%;

    float: left;
`;

const ButtonDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;

    float: left;

    width: 45%;
`;

const InputTitle = styled.input`
    width: 90%;
    height: 3rem;
    font-size: 1.5rem;
    line-height: 2rem;
    padding-left: 15px;
    border: solid 2px #495057;
    border-radius: 4px;
    transition: 0.55s ease;

    display: block;
    margin: 0 auto;

    & :hover {
        border: solid 2px #148cff;
    }
    & :focus {
        border: solid 2px #148cff;
    }
`;

const WriteContainer = styled.div`
    height: 80%;
    width: 100%;

    margin-top: 20px;
`;

const LoadingImg = styled.img`
    margin-top: 4px;
    height: 1.5rem;
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
    const { isAddingPost } = useSelector((state) => state.post);
    const [postTitle, setPostTitle] = useState("");
    const [postContents, setPostContents] = useState("");
    const [previewText, setPreviewText] = useState(postContents);

    const router = useRouter();
    const dispatch = useDispatch();

    const onChangePostContents = useCallback(
        (e, editor) => {
            const data = editor.getData();
            setPostContents(data);
        },
        [postContents]
    );

    const onChangePostTitle = useCallback(
        (e) => {
            setPostTitle(e.target.value);
        },
        [postTitle]
    );

    const onCancel = useCallback((e) => {
        router.push({ pathname: "/blog/posts" });
    }, []);

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();

            console.log(postTitle, postContents);

            dispatch({
                type: CREATE_POST_REQUEST,
                data: {
                    title: postTitle,
                    contents: postContents
                }
            });

            router.push({ pathname: "/blog/posts" });
        },
        [postTitle, postContents]
    );

    // useEffect(() => {
    //     hljs.highlightAll();
    // }, [previewText]);

    useEffect(() => {
        setPreviewText(postContents);
    }, [postContents, previewText]);

    return (
        <Form onSubmit={onSubmit}>
            <Helmet>
                <title>새 글</title>
            </Helmet>
            <Title>새 글 작성하기</Title>
            <ButtonDiv>
                <Button type="button" color="pink" onClick={onCancel}>
                    취소
                </Button>
                <Button type="submit">{isAddingPost ? <LoadingImg src="/static/icons/loading_blue.gif" /> : `만들기`}</Button>
            </ButtonDiv>
            <InputTitle value={postTitle} onChange={onChangePostTitle} placeholder="타이틀을 입력해주세요..." />

            <WriteContainer>
                <Editor text={postContents} onChange={onChangePostContents} />
            </WriteContainer>
            {/* <PreviewContainer dangerouslySetInnerHTML={{ __html: previewText }}></PreviewContainer> */}
        </Form>
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
