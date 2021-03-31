import Head from "next/head";

import GlobalStyles from "../components/designs/GlobalStyles";
import Layout from "../components/Layout";
import axios from "axios";
import wrapper from "../store/configureStore";
import { LOAD_USERINFO_REQUEST } from "../reducers/user";

function Plog({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Plog</title>
                <link rel="icon" href="/static/favicon.ico" />
                {/* <script>{(window.dyc = { "chatbotUid": "ea9191c702e349d5" })}</script>
                <script async src="https://cloudturing.chat/v1.0/chat.js"></script> */}
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
            <GlobalStyles />
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {});

export default wrapper.withRedux(Plog);
