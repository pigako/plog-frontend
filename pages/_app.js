import Head from "next/head";

import GlobalStyles from "../components/designs/GlobalStyles";
import Layout from "../components/Layout";
import axios from "axios";
import wrapper from "../store/configureStore";

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

export default wrapper.withRedux(Plog);
