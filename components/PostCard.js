import { useRouter } from "next/router";
import React, { useCallback } from "react";
import styled from "styled-components";

const Card = styled.div`
    border: solid 1px black;
    border-radius: 5px;

    cursor: pointer;

    margin: 5px auto;

    & :hover {
        border: solid 1px skyblue;

        transition: 0.3s ease-in-out;
    }

    & + & {
        margin-top: 10px;
        margin-bottom: 10px;
    }
`;

const CardHeader = styled.a`
    font-size: 2rem;
    font-weight: bold;

    text-decoration: none;

    display: inline-block;
    padding: 10px 0px 0px 10px;
`;

const CardImage = styled.image``;

const CardContents = styled.div`
    font-size: 1.2rem;

    text-decoration: none;
    padding: 5px 0px 5px 15px;
`;

const CardInfo = styled.div`
    font-size: 0.8rem;
    color: gray;

    text-decoration: none;
    padding: 5px 0px 5px 15px;
`;

const PostCard = ({ post }) => {
    const router = useRouter();

    const onClickPostCard = useCallback((e) => {
        router.push({ pathname: "/blog/post", query: { id: post.id } }, `/blog/post/${post.id}`);
    }, []);

    return (
        <Card onClick={onClickPostCard}>
            <CardHeader>{post.title}</CardHeader>
            <CardContents>{post.contents}</CardContents>
            <CardInfo>
                작성일: {new Date(post.createdAt).toLocaleDateString("ko", { hour: "numeric", minute: "numeric" })} | 조회: {post.lookup} | 댓글: {post.comments?.length}
            </CardInfo>
        </Card>
    );
};

export default PostCard;
