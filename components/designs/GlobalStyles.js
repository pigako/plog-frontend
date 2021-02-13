import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
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
