import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Post = () => {
    const { pathname, query } = useRouter();

    useEffect(() => {
        console.log(pathname);
    }, []);

    return <a>{query.id}</a>;
};

export default Post;
