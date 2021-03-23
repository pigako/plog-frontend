import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

import Button from "./designs/Button";
import { useSelector } from "react-redux";

const Menu = styled.header`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 50px;

    display: flex;
    align-items: center;
    padding: 0px 10px;
    z-index: 10;
`;

const List = styled.ul`
    display: flex;
    width: 80%;
`;

const Item = styled.li`
    width: 15rem;
    height: 3.2rem;
    text-align: center;
    margin-right: 10px;

    border-bottom: solid 4px ${(props) => (props.current ? "#FF6347" : "transparent")};
    transition: border-bottom 0.5s ease-in-out;

    & a {
        color: #ff6347;
        font-weight: bold;
        font-size: 2rem;
        text-decoration: none;
        width: 100%;
        height: 3.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const UserIdDiv = styled.div`
    width: 45%;

    display: flex;
    justify-content: center;
    align-items: center;

    & a {
        display: flex;
    }

    & button {
        /* display: flex; */
        margin-left: 5px;
        margin-right: 5px;
    }
`;

const SearchForm = styled.form`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0px 10px;
    margin-right: 20px;

    width: calc(100% - 210px);

    & a {
        color: #ff6347;
        height: 50px;
        padding-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

const SearchInput = styled.input`
    margin-right: 10px;
    outline: none;
    border: solid 2px #000000;
    border-radius: 4px;
    padding-left: 10px;

    height: 2.25rem;
    width: 10rem;
    font-size: 1.5rem;

    transition: 0.55s ease;

    & :hover {
        width: 30rem;
    }
    & :focus {
        width: 30rem;
    }
`;

const Header = () => {
    const router = useRouter();
    const { pathname } = useRouter();

    const [searchText, setSearchText] = useState("");
    const { user } = useSelector((state) => state.user);

    const onChangeSearchText = useCallback((e) => {
        setSearchText(e.target.value);
    }, []);

    const onSubmitSearch = useCallback(
        (e) => {
            e.preventDefault();
            console.log(searchText);
        },
        [searchText]
    );

    const googleLoginUri =
        process.env.NODE_ENV === "production"
            ? "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=https://www.pigako.com/api/v1/auth/google/callback&response_type=code&client_id=124179859179-phbj0e3lqu096322h75m22p6peidi2sg.apps.googleusercontent.com"
            : "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&access_type=offline&include_granted_scopes=true&state=state_parameter_passthrough_value&redirect_uri=http://localhost:4000/api/v1/auth/google/callback&response_type=code&client_id=124179859179-phbj0e3lqu096322h75m22p6peidi2sg.apps.googleusercontent.com";

    const kakaoLoginUri =
        process.env.NODE_ENV === "production"
            ? "https://kauth.kakao.com/oauth/authorize?client_id=b197c60616c231ede9dce343c372ff41&redirect_uri=https://www.pigako.com/api/v1/auth/kakao/callback&response_type=code"
            : "https://kauth.kakao.com/oauth/authorize?client_id=b197c60616c231ede9dce343c372ff41&redirect_uri=http://localhost:4000/api/v1/auth/kakao/callback&response_type=code";

    const githubLoginUri =
        process.env.NODE_ENV === "production"
            ? "https://github.com/login/oauth/authorize?client_id=5d33653c6592d1b7992e&redirect_uri=https://www.pigako.com/api/v1/auth/github/callback&scope=user"
            : "https://github.com/login/oauth/authorize?client_id=5d33653c6592d1b7992e&redirect_uri=http://localhost:4000/api/v1/auth/github/callback&scope=user";

    return (
        <Menu>
            <List>
                <Item key="home" current={pathname === "/"}>
                    <Link href="/">
                        <a>PLOG.pigako</a>
                    </Link>
                </Item>
            </List>
            {user?.userName ? (
                <UserIdDiv>
                    <a>Welcome {user.userName}</a>
                </UserIdDiv>
            ) : (
                <UserIdDiv>
                    <Link href={googleLoginUri}>
                        <a>
                            <Button type="button" color="pink" size="large">
                                Google
                            </Button>
                        </a>
                    </Link>
                    <Link href={kakaoLoginUri}>
                        <a>
                            <Button type="button" color="pink" size="large">
                                Kakao
                            </Button>
                        </a>
                    </Link>
                    <Link href={githubLoginUri}>
                        <a>
                            <Button type="button" color="pink" size="large">
                                GitHub
                            </Button>
                        </a>
                    </Link>
                </UserIdDiv>
            )}
            <SearchForm onSubmit={onSubmitSearch}>
                <a>Search</a>
                <SearchInput value={searchText} onChange={onChangeSearchText}></SearchInput>
                <Button type="submit">검색</Button>
            </SearchForm>
        </Menu>
    );
};

export default Header;
