import {
  AccountCircleOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import React, { useContext } from "react";
import styled from "styled-components";
import Badge from "@mui/material/Badge";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

import CartContext from "../Store/cart-context";
import AuthContext from "../Store/auth-context";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding-left: 25px;
  ${mobile({ paddingLeft: "0px" })}
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  text-align: center;
`;

const Links = styled.h3`
  font-size: 20px;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "10px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 20px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px" })}
`;

const Navbar = () => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const handleLogout = () => {
    authCtx.logout();
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>ArtSy.</Logo>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <Links>Home</Links>
          </Link>

          <Links>Artwork</Links>

          <Link
            to="/Exhibition"
            style={{ textDecoration: "none", color: "black" }}
          >
            <Links>Exhibition</Links>
          </Link>
          <Links>Competition</Links>
        </Center>
        <Right>
          {!isLoggedIn && (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem>SignIn</MenuItem>
            </Link>
          )}
          {!isLoggedIn && (
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem>Register</MenuItem>
            </Link>
          )}

          <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
            <MenuItem>
              <Badge badgeContent={numberOfCartItems} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
          {isLoggedIn && (
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem>
                Hi {authCtx.id}
                <AccountCircleOutlined />
              </MenuItem>
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Link>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
