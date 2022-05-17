import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;

  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Orders = () => {
  function createData(OrderId, Artworks, ArtworkId, PurchaseDate, Amount) {
    return { OrderId, Artworks, ArtworkId, PurchaseDate, Amount };
  }

  const rows = [createData(1, "Broken Heart", "ab _02", "22/05/2022", 85000)];

  return (
    <>
      <Container>
        <Wrapper>
          <Title>Your Orders</Title>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">OrderId</TableCell>
                  <TableCell align="right">Artworks</TableCell>
                  <TableCell align="right">ArtworkId</TableCell>
                  <TableCell align="right">PurchaseDate</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.OrderId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right" component="th" scope="row">
                      {row.OrderId}
                    </TableCell>

                    <TableCell align="right">{row.Artworks}</TableCell>
                    <TableCell align="right">{row.ArtworkId}</TableCell>
                    <TableCell align="right">{row.PurchaseDate}</TableCell>
                    <TableCell align="right">{row.Amount}</TableCell>
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
