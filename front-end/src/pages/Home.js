import { Link } from "react-router-dom";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

import { useGlobalContext } from "../context";

const Home = () => {
  const { user } = useGlobalContext();

  return (
    <>
      {user && <Redirect to="/dashboard" />}
      <Wrapper>
        <h2>Task Handler</h2>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  min-height: calc(100vh - 6rem);
  width: var(--fluid-width);
  max-width: var(--max-width);
  margin: 0 auto;
  padding-top: 3rem;

  h2 {
    font-weight: 700;
  }
  a {
    margin: 0 4px;
    cursor: pointer;
    color: var(--white);
    background: var(--primary-500);
    border: transparent;
    border-radius: var(--borderRadius);
    padding: 4px 10px;
    box-shadow: var(--shadow-1);
    text-transform: capitalize;
    display: inline-block;
  }
`;

export default Home;
