import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Components/Footer";

import Navbar from "../Components/Navbar";
import Products from "../Components/Products";

import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilter] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilter({
      [e.target.name]: value,
    });
  };

  return (
    <Container>
      <Navbar />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>

          <Select name="size" onChange={handleFilters}>
            <Option>Size in cm</Option>
            <Option>100*120</Option>
            <Option>100*150</Option>
            <Option>120*120</Option>
            <Option>120*160</Option>
            <Option>135*200</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Show</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            {/* <Option value="newest">Newest</Option> */}
            <Option> By Price</Option>
            <Option value="asc">Low to High</Option>
            <Option value="desc">High to Low</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />

      <Footer />
    </Container>
  );
};

export default ProductList;
