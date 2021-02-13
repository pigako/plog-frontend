import React from "react";
import styled, { css } from "styled-components";

const StyledButton = styled.button`
    display: inline-block;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding-left: 1rem;
    padding-right: 1rem;

    height: 2.25rem;
    width: 6rem;
    font-size: 1rem;

    ${(props) => {
        if (props.size === "large") {
            return css`
                width: 100%;
            `;
        } else if (props.size === "middle") {
            return css`
                width: 33%;
            `;
        }
    }}

    ${(props) => {
        if (props.color === "blue") {
            return css`
                background: #148cff;
                &:hover {
                    background: #1e96ff;
                }
                &:active {
                    background: #0a82ff;
                }
            `;
        } else if (props.color === "pink") {
            return css`
                background: #ff7493;
                &:hover {
                    background: #ff7e9d;
                }
                &:active {
                    background: #ff6a89;
                }
            `;
        }
    }}
  /* 
    blue: '#228be6 #339af0 #1c7ed6',
    gray: '#495057',
    pink: '#f06595 #FF8E99 #FF7493' 
  */
 
  
  & + & {
        margin-left: 1rem;
    }
`;

const Button = ({ children, ...rest }) => {
    return <StyledButton {...rest}>{children}</StyledButton>;
};

Button.defaultProps = {
    color: "blue",
    size: "small"
};

export default Button;
