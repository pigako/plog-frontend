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
    width: 100%;
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
    width: 25%;
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

    return (
        <Menu>
            <List>
                <Item key="home" current={pathname === "/"}>
                    <Link href="/">
                        <a>PLOG.pigako</a>
                    </Link>
                </Item>
            </List>
            {user?.userId && (
                <UserIdDiv>
                    <a>Welcome {user.userId}</a>
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
