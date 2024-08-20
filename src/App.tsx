import React from "react";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    font-family: "Roboto Slab", serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.accentColor};
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

function App() {
  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyle />
      <Outlet />
    </>
  );
}

export default App;
