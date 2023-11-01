import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Wrapper>
      <div>
        <h1>404</h1>
        <h4>page not found</h4>
        <Link to="/">Back Home</Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  min-height: calc(100vh - 6rem);
  width: var(--fluid-width);
  max-width: var(--max-width);
  margin: 0 auto;
  padding-top: 3rem;

  a {
    cursor: pointer;
    color: var(--white);
    background: var(--primary-500);
    border: transparent;
    border-radius: var(--borderRadius);
    padding: 4rem 10rem;
    box-shadow: var(--shadow-1);
    text-transform: capitalize;
    display: inline-block;
  }
`;

export default Error;
