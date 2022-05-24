import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer";
// import styled from "styled-components"
import ExhibitionCard from "../Components/ExhibitionCard";
import styled from "styled-components";
import { events } from "../data";
import axios from "axios";

const Container = styled.h1`
  font-weight: 300;
  font-size: 38.26px;
  text-align: center;
`;
const Box = styled.div`
  margin-left: 10%;
  display: flex;
`;
const Bar = styled.div`
  padding: 15px;
  margin-left: 46%;
`;
const Exhibitions = () => {
  const [exhibitions, setExhibitions] = useState([]);

  useEffect(() => {
    const getExhibitions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/exhibitions/allexhibitions"
        );
        setExhibitions(res.data);
      } catch (err) {}
    };
    getExhibitions();
  }, []);

  return (
    <>
      <Navbar />
      <Bar />
      <Container>Exhibitions</Container>
      <Bar />
      <Box>
        {exhibitions.map((exhibition) => (
          <ExhibitionCard exhibition={exhibition} />
        ))}
      </Box>
      <Footer />
    </>
  );
};

export default Exhibitions;
