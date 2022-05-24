import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./admin.css";
import axios from "axios";
import ReactPaginate from "react-paginate";
import EditIcon from "@mui/icons-material/Edit";

const EventTable = styled.div`
  width: auto;
  height: auto;
`;
const Conatainer = styled.div`
  margin-left: 200px;
`;

const convertDate = (date) => {
  const validDate = new Date(date);
  const day = validDate.getDate();
  const month = validDate.getMonth() + 1;
  const year = validDate.getFullYear();
  return day + "/" + month + "/" + year;
};

const Events = () => {
  const [exhibitionsList, setExhibitionsLst] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/exhibitions/allexhibitions")
      .then((res) => {
        setExhibitionsLst(res.data);
        console.log(res.data);
      });
  }, []);

  // start
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const displayExhibition = exhibitionsList
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => {
      return (
        <tbody>
          <tr>
            <td className="admintd" key={item.exhi_id}>
              {item.exhi_id}
            </td>
            <td className="admintd">{item.exhi_name}</td>
            <td className="admintd">{item.exhi_price}</td>
            <td className="admintd">{convertDate(item.from_date)}</td>
            <td className="admintd">{convertDate(item.to_date)}</td>
            <td className="admintd">{item.max_limit}</td>
            <td className="admintd" style={{ width: "20%", height: "auto" }}>
              {item.exhi_description}
            </td>

            <td className="admintd">
              {" "}
              <img src={item.exhi_img} alt="firebase" className="image-view" />
            </td>
            <td className="admintd">
              <Link
                to={`/editEvents/${item.exhi_id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <EditIcon />
              </Link>
            </td>
          </tr>
        </tbody>
      );
    });

  const pageCount = Math.ceil(exhibitionsList.length / usersPerPage);

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
        >
          <div style={{ display: "flex" }}>
            <h3 style={{ padding: "20px", marginLeft: "10px" }}>
              EVENT INFORMATION
            </h3>
            <button
              className="btn"
              style={{ marginLeft: "60%", float: "right" }}
            >
              <Link
                to="/addevent"
                style={{ color: "white", textDecoration: "none" }}
              >
                <span>+ADD</span>
              </Link>
            </button>
          </div>

          <EventTable>
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
                  <th className="adminth">Event ID</th>
                  <th className="adminth">Event Name</th>
                  <th className="adminth">Price</th>
                  <th className="adminth">Start Date</th>
                  <th className="adminth">End Date</th>
                  <th className="adminth">Limit</th>
                  <th className="adminth">Description</th>
                  <th className="adminth">Banner</th>
                  <th className="adminth">Edit</th>
                </tr>
              </thead>
              {displayExhibition}
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
          </EventTable>
        </div>
      </Conatainer>
    </>
  );
};

export default Events;
