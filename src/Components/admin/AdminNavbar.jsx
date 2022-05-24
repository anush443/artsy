import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AuthContext from "../../Store/auth-context";

const Logo = styled.h1`
  font-weight: bold;
  color: black;
`;
const LeftContainer = styled.div`
  height: 100%;
  width: 200px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: white;
  overflow-x: hidden;
  padding: 30px;
  text-align: center;
`;
const Links = styled.h3`
  font-size: 15px;
  color: black;
  padding: 10px;
  &:hover {
    background-color: black;
    border-radius: 2px;
    color: white;
  }
`;
const Line = styled.hr`
  border: 2 px solid white;
`;
const AdminNavbar = () => {
  const authCtx = useContext(AuthContext);
  const handleLogout = () => {
    authCtx.logout();
  };
  return (
    <>
      <LeftContainer>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <Logo>ArtSy.</Logo>
        </Link>
        <Line></Line>

        <Link
          to="/adminhome"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Links>Home</Links>
        </Link>
        <Link to="/artist" style={{ textDecoration: "none", color: "black" }}>
          <Links>Artists</Links>
        </Link>
        <Link
          to="/admin/artworks"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Links>Artwork</Links>
        </Link>
        <Link to="/events" style={{ textDecoration: "none", color: "black" }}>
          <Links>Events</Links>
        </Link>
        <Link
          to="/orderlist"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Links>Orders</Links>
        </Link>
        <Link
          to="/paymentlist"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Links>Payment</Links>
        </Link>
        <button
          style={{
            backgroundColor: "transparent",
            color: "black",
            border: "none",
          }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </LeftContainer>
    </>
  );
};

export default AdminNavbar;
