import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

import Button from "./designs/Button";
import { useSelector, useDispatch } from "react-redux";

import { USER_LOGIN_REQUEST } from "../reducers/user";

const LoginForm = styled.form`
    width: 100%;
    margin-top: 10px;
    margin-left: 10px;
    font-size: 1rem;
`;

const Label = styled.label`
    display: inline-block;
    margin-bottom: 10px;
`;

const Input = styled.input`
    border-radius: 4px;
    padding-left: 10px;
    margin-bottom: 10px;
    width: 90%;
    font-size: 1.2rem;
`;

const LoginFormButtonDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 90%;
    & button {
        margin-left: 10px;
    }
`;

const LoadingImg = styled.img`
    margin-top: 4px;
    height: 1.5rem;
`;

const Login = () => {
    const { isLoggingIn } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        userId: "",
        password: ""
    });
    const { userId, password } = inputs;

    const onChangeInputs = useCallback(
        (e) => {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value
            });
        },
        [inputs]
    );

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: USER_LOGIN_REQUEST,
            data: {
                userId: userId,
                password: password
            }
        });
    });

    return (
        <LoginForm onSubmit={onSubmit}>
            <div>
                <Label>아이디</Label>
                <Input htmlFor="user-id" name="userId" value={userId} onChange={onChangeInputs} required />
            </div>
            <div>
                <Label>비밀번호</Label>
                <Input htmlFor="user-password" name="password" type="password" value={password} onChange={onChangeInputs} required />
            </div>
            <LoginFormButtonDiv>
                <Link href="/signup">
                    <a>
                        <Button type="button" color="pink">
                            회원가입
                        </Button>
                    </a>
                </Link>
                <Button type="submit">{isLoggingIn ? <LoadingImg src="/static/icons/loading_blue.gif" /> : `로그인`}</Button>
            </LoginFormButtonDiv>
        </LoginForm>
    );
};

export default Login;
