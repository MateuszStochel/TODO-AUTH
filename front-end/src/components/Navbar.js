import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context";

const Navbar = () => {
  const { user, logoutUser } = useGlobalContext();

  return (
    <Wrapper>
      <div className="nav_wrapper">
        <Link to="/" className="home-link"> Task Handler</Link>
        {user && (
          <div className="nav_welcome_wrapper">
            <p>Hello, {user.name}</p>
            <button onClick={logoutUser}>Logout</button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  background: var(--primary-100);
  height: 6rem;
  display: flex;
  padding: 20px;

  div {
    a {
      color: var(--primary-500);
      font-size: 40px;
    }
  }

  button {
    padding: 5px 20px;
    background-color: var(--primary-500);
    border: 1px solid black var(--primary-600);
  }

  .nav_wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .nav_welcome_wrapper {
    display: flex;
    p {
      margin-right: 20px;
      font-size: 20px;
    }
  }
`;

export default Navbar;
