import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

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
    margin-right: 20px;
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
    const router = useRouter();

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

    const googleLoginUri =
        process.env.NODE_ENV === "production"
            ? "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=https://www.pigako.com/api/v1/auth/google/callback&response_type=code&client_id=124179859179-phbj0e3lqu096322h75m22p6peidi2sg.apps.googleusercontent.com"
            : "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=http://localhost:4000/api/v1/auth/google/callback&response_type=code&client_id=124179859179-phbj0e3lqu096322h75m22p6peidi2sg.apps.googleusercontent.com";

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
                <Link href={googleLoginUri}>
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
