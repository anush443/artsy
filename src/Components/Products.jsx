import React from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";

const Header = styled.h1`
  margin-top: 100px;
  text-align: center;
`;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = (props) => {
  return (
    <>
      <Header>{props.title}</Header>
      <Container>
        {props.category.map((item) => (
          <Product item={item.img} key={item.id} />
        ))}
      </Container>
    </>
  );
};

export default Products;
