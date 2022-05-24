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
const OrderList = () => {
  const UpdateDelivery = (orderid, delivery_status) => {
    alert(orderid);
    if (delivery_status === 0) {
      delivery_status = 1;
    } else {
      delivery_status = 0;
    }
    Axios.put(
      `http://localhost:5000/api/orders/updatedelivery/${orderid}`,
      {
        delivery_status: delivery_status,
      },
      {
        headers: {
          Authorization: "Bearer " + authCtx.token,
        },
      }
    )
      .then(() => {
        alert("Updated Successfully ...");
        window.location.reload(false);
      })
      .catch((e) => {
        alert("Failed to update");
      });
  };

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
          `http://localhost:5000/api/orders/allorders`,
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
          <tr>
            <td className="admintd">{item.order_id}</td>
            <td className="admintd">{item.payment_id}</td>
            <td className="admintd">{item.Amount}</td>
            <td className="admintd">{item.Email}</td>
            <td className="admintd">{convertDate(item.PurchaseDate)}</td>
            <td className="admintd">{item.Title}</td>
            <td className="admintd">
              {" "}
              <img src={item.Image} alt="firebase" className="image-view" />
            </td>
            <td className="admintd">
              <button
                className="dbtn"
                onClick={() =>
                  UpdateDelivery(item.order_id, item.delivery_status)
                }
              >
                {item.delivery_status ? "Delivered" : "Not Delivered"}
              </button>
            </td>
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
            ORDER INFORMATION
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
                <th className="adminth">Order ID</th>
                <th className="adminth">Payment ID</th>
                <th className="adminth">Price</th>
                <th className="adminth">Email</th>
                <th className="adminth">Purchase Date</th>
                <th className="adminth">Artwork Title</th>
                <th className="adminth">Artwork</th>
                <th className="adminth">Delivery Status</th>
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

export default OrderList;
