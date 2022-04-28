import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import styled from "styled-components";

const Container = styled.div`
  height: 300px;
  text-align: center;
`;

const Title = styled.h1`
  margin-top: 150px;
`;

const Exhibition = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Title>Comming Soon</Title>
      </Container>

      <Footer />
    </>
  );
};

export default Exhibition;
