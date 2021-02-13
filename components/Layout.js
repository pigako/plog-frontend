import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import Header from "./Header";

const Screen = styled.div`
    height: 100%;
`;

const Contents = styled.div`
    margin-top: 50px;
    width: 97%;
    margin: 60px auto;
`;

const LeftContent = styled.div`
    width: 20%;
    height: 100px;
    float: left;

    border: solid 1px #000;
`;

const RightContent = styled.div`
    width: 20%;
    height: 100px;
    float: right;

    border: solid 1px #000;
`;

const MainContent = styled.div`
    width: 60%;
    height: 100px;
    float: left;

    border: solid 1px #000;
`;

const Layout = ({ children }) => {
    const { pathname } = useRouter();

    return (
        <Screen>
            <Header />
            <Contents>
                <LeftContent>{pathname && pathname.slice(0, 5) === "/post" ? "Thumbs Up" : "Category"}</LeftContent>
                <MainContent>{children}</MainContent>
                <RightContent></RightContent>
            </Contents>
        </Screen>
    );
};

export default Layout;
