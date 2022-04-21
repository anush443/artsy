import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ProductCard from "./ProductCard";

const Header = styled.h1`
  margin-top: 100px;
  text-align: center;
`;

const Container = styled.div`
  margin: 10px;
  padding: 15px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort, title }) => {
  //console.log(cat, filter, sort, title);

  const [artworks, setArtworks] = useState([]);
  const [filteredartworks, setFilteredArtworks] = useState([]);

  useEffect(() => {
    const getArtworks = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/artworks?category=${cat}`
            : `http://localhost:5000/api/artworks`
        );
        setArtworks(res.data);
      } catch (err) {}
    };
    getArtworks();
  }, [cat]);

  //console.log(artworks);

  useEffect(() => {
    cat &&
      setFilteredArtworks(
        artworks.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [artworks, cat, filters]);

  useEffect(() => {
    if (sort === "asc") {
      setFilteredArtworks((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredArtworks((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <>
      <Header>{title}</Header>
      <Container>
        {cat
          ? filteredartworks.map((item) => <ProductCard item={item} />)
          : artworks.slice(0, 7).map((item) => <ProductCard item={item} />)}
      </Container>
    </>
  );
};

export default Products;
