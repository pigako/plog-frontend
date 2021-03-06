import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
    */

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p,
    a, abbr, acronym, address, big, cite,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    /* blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    } */
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }




    a{
        text-decoration : none;
        color : inherit;
    }
    *{
        box-sizing : border-box;
    }
    html {
        /* height:100%;  */
    }
    body {
        /* height:100%;  */
        min-width: 1200px;
        font-family : -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size : 1.2rem;
    }
    strong {
        font-weight:bold;
    }
    hr {
        border: solid 3px #000;
        border-bottom:0px;
    }
     /* body::-webkit-scrollbar { 
        display: none; 
    } */
    /* #__next {
        height:100%;
    } */
`;

export default GlobalStyles;
