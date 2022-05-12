import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./admin.css";
import axios from "axios";

const EventTable = styled.div`
  width: auto;
  height: auto;
  padding: 10px;
  margin-left: 20px;
`;
const Conatainer = styled.div`
  display: felx;
  content-align: right;
`;

const convertDate = (date) => {
  const validDate = new Date(date);
  const day = validDate.getDate();
  const month = validDate.getMonth();
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

  return (
    <>
      <Conatainer>
        <AdminNavbar></AdminNavbar>
        <div style={{ display: "block" }}>
          <div style={{ display: "flex" }}>
            <h3 style={{ padding: "20px", marginLeft: "10px" }}>
              EVENT INFORMATION
            </h3>
            <button className="btn">
              <Link
                to="/addevent"
                style={{ color: "white", textDecoration: "none" }}
              >
                <span>+ADD</span>
              </Link>
            </button>
          </div>

          <EventTable>
            <table>
              <thead>
                <tr>
                  <th>Event ID</th>
                  <th>Event Name</th>
                  <th>Price</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Limit</th>
                  <th>Description</th>
                  <th>Banner</th>

                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {exhibitionsList.map((item) => (
                <tbody>
                  <tr>
                    <td key={item.exhi_id}>{item.exhi_id}</td>
                    <td>{item.exhi_name}</td>
                    <td>{item.exhi_price}</td>
                    <td>{convertDate(item.from_date)}</td>
                    <td>{convertDate(item.to_date)}</td>
                    <td>{item.max_limit}</td>
                    <td>{item.exhi_description}</td>

                    <td>
                      {" "}
                      <img
                        src={item.exhi_img}
                        alt="firebase"
                        className="image-view"
                      />
                    </td>
                    <td>
                      <button
                        style={{
                          border: "none",
                          backgroundColor: "transparent",
                          color: "green",
                        }}
                        //onClick={() => handleEditArt(item.id, item.instock)}
                      >
                        <u>Toggle</u>
                      </button>
                    </td>
                    {/* <td><Link  to={`/EditArtwork/${item.id}`} style={{ textDecoration: "none" }}>Edit</Link></td>        */}
                    <td>
                      <button
                        className="delete-btn"
                        //onClick={() => handleRemoveArtwork(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </EventTable>
        </div>
      </Conatainer>
    </>
  );
};

export default Events;
