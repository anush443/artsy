import React, { useState, useEffect, useContext } from "react";
import AdminNavbar from "./AdminNavbar";
import styled from "styled-components";
import AuthContext from "../../Store/auth-context";
import Axios from "axios";

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
  const [countuser, setCountuser] = useState(0);
  const [artworksSold, SetArtworksSold] = useState(0);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getCount = async () => {
      try {
        const res = await Axios.get(`http://localhost:5000/api/users/stats`, {
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
        });

        setCountuser(res.data);
      } catch {}
    };
    getCount();
  }, [authCtx.token]);

  useEffect(() => {
    const getSoldpainting = async () => {
      try {
        const res = await Axios.get(
          `http://localhost:5000/api/orders/artworkssold`,
          {
            headers: {
              Authorization: "Bearer " + authCtx.token,
            },
          }
        );

        SetArtworksSold(res.data);
      } catch {}
    };
    getSoldpainting();
  }, [authCtx.token]);

  return (
    <>
      <Conatainer>
        <AdminNavbar />
        <ImageBanner src="https://images.pexels.com/photos/1572386/pexels-photo-1572386.jpeg?cs=srgb&dl=pexels-steve-johnson-1572386.jpg&fm=jpg"></ImageBanner>
        <Heading>
          <Text>Happy ArtSy</Text>
        </Heading>
      </Conatainer>
      <div style={{ padding: "5%", display: "flex", marginLeft: "150px" }}>
        <DCard>
          <Name>Total Users</Name>
          <Number>{countuser}</Number>
        </DCard>
        <DCard>
          <Name>Painting Sold </Name>
          <Number>{artworksSold}</Number>
        </DCard>
      </div>
      {/* <PaintingImage></PaintingImage> */}
    </>
  );
};

export default AdminHome;
