import React from "react";
import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";

const Header = styled.h1`
  margin-top: 100px;
  text-align: center;
`;
const Container = styled.div`
  margin-top: 50px;
  z-index: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Categories = () => {
  return (
    <>
      <Header>Our collection</Header>
      <Container>
        {categories.map((item) => (
          <CategoryItem item={item} />
        ))}
      </Container>
    </>
  );
};

export default Categories;
