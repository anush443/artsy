import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AuthContext from "../Store/auth-context";
import axios from "axios";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;

  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

//helper functions

const convertDate = (date) => {
  const validDate = new Date(date);
  const day = validDate.getDate();
  const month = validDate.getMonth() + 1;
  const year = validDate.getFullYear();
  return day + "/" + month + "/" + year;
};

const Orders = () => {
  const [myOrders, setMyOrders] = useState();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getMyOrders = async () => {
      try {
        const fetchedOrders = await axios.get(
          `http://localhost:5000/api/orders/myorders/${authCtx.id}`,
          {
            headers: {
              Authorization: "Bearer " + authCtx.token,
            },
          }
        );

        //console.log(fetchedOrders.data);
        setMyOrders(fetchedOrders.data);
      } catch (e) {
        alert("Failed to get orders");
      }
    };
    getMyOrders();
  }, [authCtx.id]);

  return (
    <>
      <Container>
        <Wrapper>
          <Title>Your Orders</Title>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Order Id</TableCell>
                  <TableCell align="center">Payment Id</TableCell>
                  <TableCell align="center">Amount</TableCell>
                  <TableCell align="center">Purchase Date</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Delivery Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myOrders?.map((myOrder) => (
                  <TableRow
                    key={myOrder.order_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {myOrder.order_id}
                    </TableCell>
                    <TableCell align="center">{myOrder.payment_id}</TableCell>
                    <TableCell align="center">{myOrder.amount}</TableCell>
                    <TableCell align="center">
                      {convertDate(myOrder.purchasedate)}
                    </TableCell>
                    <TableCell align="center">{myOrder.title}</TableCell>
                    <TableCell align="center">
                      <img
                        src={myOrder.image}
                        alt="firebase"
                        className="image-view"
                      />
                    </TableCell>
                    <TableCell align="center">
                      {myOrder.delivery_status ? "Delivered" : "Pending"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Wrapper>
      </Container>
    </>
  );
};

export default Orders;
