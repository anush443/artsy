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

const Tickets = () => {
  const [myTickets, setMyTickets] = useState();
  const authCtx = useContext(AuthContext);

  function createData(OrderId, Artworks, ArtworkId, PurchaseDate, Amount) {
    return { OrderId, Artworks, ArtworkId, PurchaseDate, Amount };
  }

  const rows = [createData(1, "Broken Heart", "ab _02", "22/05/2022", 85000)];

  useEffect(() => {
    const getMyTickets = async () => {
      try {
        const fetchedTickets = await axios.get(
          `http://localhost:5000/api/tickets/mytickets/${authCtx.id}`,
          {
            headers: {
              Authorization: "Bearer " + authCtx.token,
            },
          }
        );

        console.log(fetchedTickets.data);
        setMyTickets(fetchedTickets.data);
      } catch (e) {
        alert("Failed to get orders");
      }
    };
    getMyTickets();
  }, [authCtx.id]);

  return (
    <>
      <Container>
        <Wrapper>
          <Title>Your Tickets</Title>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Ticket ID</TableCell>
                  <TableCell align="center">Payment ID</TableCell>
                  <TableCell align="center">Exhibition Name</TableCell>
                  <TableCell align="center">Booking Date</TableCell>
                  <TableCell align="center">No of Tickets</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Total Amount</TableCell>
                  <TableCell align="center">From date</TableCell>
                  <TableCell align="center">To Date</TableCell>
                  <TableCell align="center">Image</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {myTickets?.map((myTicket) => (
                  <TableRow
                    key={myTicket.ticket_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {myTicket.ticket_id}
                    </TableCell>
                    <TableCell align="center">{myTicket.payment_id}</TableCell>
                    <TableCell align="center">{myTicket.name}</TableCell>
                    <TableCell align="center">
                      {convertDate(myTicket.bookingDate)}
                    </TableCell>
                    <TableCell align="center">{myTicket.no_tickets}</TableCell>
                    <TableCell align="center">
                      {myTicket.totalAmount / myTicket.no_tickets}
                    </TableCell>
                    <TableCell align="center">{myTicket.totalAmount}</TableCell>
                    <TableCell align="center">
                      {convertDate(myTicket.fromDate)}
                    </TableCell>
                    <TableCell align="center">
                      {convertDate(myTicket.toDate)}
                    </TableCell>
                    <TableCell align="center">
                      <img
                        src={myTicket.img}
                        alt="exhbitin image"
                        className="image-view"
                      />
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

export default Tickets;
