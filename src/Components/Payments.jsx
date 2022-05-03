import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;

  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Payments = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <Title>Your Payments</Title>
        </Wrapper>
      </Container>
    </>
  );
};

export default Payments;
