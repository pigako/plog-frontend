import { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const StyledHome = styled.div``;

export default function Home() {
    const router = useRouter();
    useEffect(() => {
        router.push({ pathname: "/blog/posts" });
    }, []);
    return (
        <>
            <StyledHome></StyledHome>
        </>
    );
}
