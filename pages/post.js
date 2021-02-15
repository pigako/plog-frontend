import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Post = () => {
    const { query } = useRouter();

    useEffect(() => {}, []);

    return <a>{query.id}</a>;
};

Post.getInitialProps = async (context) => {};

export default Post;
