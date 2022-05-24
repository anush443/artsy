import React, { useState, useEffect, useContext } from "react";
import AdminNavbar from "./AdminNavbar";
import styled from "styled-components";
import Axios from "axios";
import AddArtist from "./AddArtist";
import { Link } from "react-router-dom";
import AuthContext from "../../Store/auth-context";
import ReactPaginate from "react-paginate";
import EditIcon from "@mui/icons-material/Edit";

const ArtistTable = styled.div`
  width: auto;
  height: auto;
  alignitems: center;
`;
const Conatainer = styled.div`
margin-left: 200px;
`;
const Artist = () => {
  const [tableshow, settableShow] = useState(true);
  const [artistlist, setArtistlist] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getArtist = async () => {
      try {
        const res = await Axios.get(
          `http://localhost:5000/api/artworks/allartists`,
          {
            headers: {
              Authorization: "Bearer " + authCtx.token,
            },
          }
        );

        setArtistlist(res.data);
      } catch {}
    };
    getArtist();
  }, [authCtx.token]);

  /////
  // start
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const displayArtist = artistlist
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => {
      return (
        <tbody>
          <tr>
            <td className="admintd">{item.artist_id}</td>
            <td className="admintd">{item.artist_name}</td>
            <td className="admintd">{item.email}</td>
            <td className="admintd">{item.phone}</td>
            <td className="admintd">
              <Link
                to={`/EditArtist/${item.artist_id}`}
                style={{ textDecoration: "none" ,color:"black"}}
              >
                <EditIcon />
              </Link>
            </td>
            <td></td>
          </tr>
        </tbody>
      );
    });

  const pageCount = Math.ceil(artistlist.length / usersPerPage);

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
              ARTIST INFORMATION
            </h3>
            <button style={{marginLeft:"60%",float: "right" }}
              onClick={() => settableShow((prev) => !prev)}
              className="btn"
            >
              <span>{tableshow ? "+ADD" : "View"}</span>
            </button>
          </div>
          {tableshow && (
            <ArtistTable>
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
                    <th className="adminth">Artist ID</th>
                    <th className="adminth">Name</th>
                    <th className="adminth">Email</th>
                    <th className="adminth">Phone Number</th>
                    <th className="adminth">Edit</th>
                  </tr>
                </thead>
                {displayArtist}
              </table>
              <div style={{ 
                             
                  position: "absolute",
                  bottom: "0px",
                  marginTop: "0%",
                  marginBottom: "0%",
                  marginLeft: "30%",
                  marginRight: "auto",
                                 
              }}>
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
            </ArtistTable>
          )}
        </div>
      </Conatainer>
      {!tableshow && <AddArtist></AddArtist>}
    </>
  );
};

export default Artist;
