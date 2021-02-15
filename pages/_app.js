import Head from "next/head";

import GlobalStyles from "../components/designs/GlobalStyles";
import Layout from "../components/Layout";

function Plog({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Plog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
            <GlobalStyles />
        </>
    );
}

Plog.getInitialProps = async (context) => {
    const { ctx, Component } = context;
    let pageProps = {};

    if (Component.getInitialProps) {
        pageProps = (await Component.getInitialProps(ctx)) || {};
    }

    return { pageProps };
};

export default Plog;
