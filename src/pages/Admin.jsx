import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AuthContext from "../Store/auth-context";
import AdminHome from "../Components/admin/AdminHome";

const Logo = styled.h1`
  font-weight: bold;
  color: black;
`;
const LeftContainer = styled.div`
  padding: 30px;
  width: 250px;
  height: auto;
  display: absolute;
  background-color: white;
  align-items: center;
  padding-left: 25px;
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
const Admin = () => {
  const authCtx = useContext(AuthContext);

  const handleLogout = () => {
    authCtx.logout();
  };

  return (
    <>
      {/* <AdminNavbar /> */}
      <AdminHome />
    </>
  );
};

export default Admin;
