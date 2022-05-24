import React, { useState, useEffect, useContext } from "react";
import AdminNavbar from "./AdminNavbar";
import styled from "styled-components";
import Axios from "axios";
import AuthContext from "../../Store/auth-context";
import ReactPaginate from "react-paginate";
const OrderTable = styled.div`
  width: auto;
  height: auto;
  alignitems: center;
`;
const Conatainer = styled.div`
  margin-left: 200px;
`;
const PaymentList = () => {
  const convertDate = (date) => {
    const validDate = new Date(date);
    const day = validDate.getDate();
    const month = validDate.getMonth() + 1;
    const year = validDate.getFullYear();
    return day + "/" + month + "/" + year;
  };
  const [orderlist, setOrderlist] = useState([]);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    const getArtist = async () => {
      try {
        const res = await Axios.get(
          `http://localhost:5000/api/payment/allpayments`,
          {
            headers: {
              Authorization: "Bearer " + authCtx.token,
            },
          }
        );
        console.log(res.data);
        setOrderlist(res.data);
      } catch {}
    };
    getArtist();
  }, [authCtx.token]);

  /////
  // start
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const displayorders = orderlist
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => {
      return (
        <tbody>
          <tr key={item.payment_id}>
            <td className="admintd">{item.payment_id}</td>
            <td className="admintd">{item.amount}</td>
            <td className="admintd">{item.email}</td>
            <td className="admintd">{convertDate(item.payment_time)}</td>
            <td className="admintd">{item.number_Items}</td>
          </tr>
        </tbody>
      );
    });

  const pageCount = Math.ceil(orderlist.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  ////
  return (
    <>
      <AdminNavbar />

      <Conatainer>
        <div
          style={{
            display: "inline-block",
            width: "100%",
            alignItems: "center",
          }}
        ></div>
        <div style={{ display: "flex" }}>
          <h3 style={{ padding: "20px", marginLeft: "10px" }}>
            PAYMENT INFORMATION
          </h3>{" "}
        </div>
        <OrderTable>
          <table
            style={{
              marginTop: "0%",
              marginBottom: "0%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <thead>
              <tr>
                <th className="adminth">Payment ID</th>
                <th className="adminth">Total Amount</th>
                <th className="adminth">Email</th>
                <th className="adminth">Payment Date</th>
                <th className="adminth">Number of Purchases</th>
              </tr>
            </thead>
            {displayorders}
          </table>
          <div
            style={{
              position: "absolute",
              bottom: "0px",
              marginTop: "0%",
              marginBottom: "0%",
              marginLeft: "30%",
              marginRight: "auto",
            }}
          >
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </OrderTable>
      </Conatainer>
    </>
  );
};

export default PaymentList;
