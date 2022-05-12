import React from "react";
import AdminNavbar from "./AdminNavbar";
import styled from "styled-components";

const ImageBanner = styled.img`
  width: 100%;
  height: 440px;
  object-fit: cover;
`;

const Heading = styled.div`
  color: black;
  position: absolute;
  top: 30%;
  left: 80%;
  transform: translate(-50%, -50%);
  font-size: 18px;
`;
const Text = styled.h1`
  opacity: 0.5;
`;
const Conatainer = styled.div`
  display: flex;
  content-align: right;
`;
const DCard = styled.div`
  width: 150px;
  height: 100px;
  background-color: black;
  border-radius: 10px;
  padding: 20px;
  margin-left: 60px;
`;
const Name = styled.h6`
  color: white;
  text-align: center;
  text-weight: lighter;
`;
const Number = styled.h4`
  color: red;
  text-align: center;
  text-weight: lighter;
`;
const AdminHome = () => {
  return (
    <>
      <Conatainer>
        <AdminNavbar />

        <ImageBanner src="https://images.pexels.com/photos/1572386/pexels-photo-1572386.jpeg?cs=srgb&dl=pexels-steve-johnson-1572386.jpg&fm=jpg"></ImageBanner>
        <Heading>
          <Text>Happy ArtSy</Text>
        </Heading>
      </Conatainer>
      <div style={{ padding: "5px", display: "flex", marginLeft: "150px" }}>
        <DCard>
          <Name>Total Users</Name>
          <Number>3000</Number>
        </DCard>
        <DCard>
          <Name>Painting Sold this Week</Name>
          <Number>10</Number>
        </DCard>
      </div>
      {/* <PaintingImage></PaintingImage> */}
    </>
  );
};

export default AdminHome;
