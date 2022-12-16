import styled, { createGlobalStyle } from "styled-components";
import { ToggleProps } from "./shared/interface";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 62.5%;
  }
  
  body {
    font-size: 1.5rem; 
    color: black;
  }
  button {
    user-select: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const OverLay = styled.div<ToggleProps>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: ${(props: any) => (props.show ? "block" : "none")};
`;
