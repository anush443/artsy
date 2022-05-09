import React from "react";
import CheckoutForm from "../Components/CheckoutForm";
import styled from "styled-components";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer";

const Container = styled.div`
  margin-top: 25px;
  margin:auto
  width: 40%;
  padding: 25px;
  align-items: center;
`;
const CheckOut = () => {
  return (
    <>
      <Navbar />
      <Container>
        <CheckoutForm />
      </Container>
      <Footer />
    </>
  );
};

export default CheckOut;
