import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
    static async getInitialProps(context) {
        const initialProps = await Document.getInitialProps(context);
        const sheet = new ServerStyleSheet();
        const page = context.renderPate((App) => (props) => {
            sheet.collectStyles(<App {...props} />);
        });
        const styleTags = sheet.getStyleElement();
        return { ...initialProps, ...page, styleTags };
    }

    render() {
        return (
            <Html>
                <Head>{this.props.styleTags}</Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
