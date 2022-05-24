import React, { useState, useEffect, useContext } from "react";
import AdminNavbar from "./AdminNavbar";
import styled from "styled-components";
import Axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../../Store/auth-context";
import EditIcon from "@mui/icons-material/Edit";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import ReactPaginate from "react-paginate";

const ArtworkTable = styled.div`
  width: auto;
  height: auto;
  alignitems: center;
`;
const Conatainer = styled.div`
  margin-left: 200px;
`;

const Artwork = () => {
  const [artworklist, setArtworklist] = useState([]);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/artworks", {
      headers: {
        Authorization: "Bearer " + authCtx.token,
      },
    }).then((response) => {
      //console.log(response.data);
      setArtworklist(response.data);
    });
  }, []);
  const [filteredartworks, setFilteredArtworks] = useState(artworklist);
  const artistOptions = new Map([
    ...artworklist.map((artworkl) => [artworkl.artist_name]),
  ]);

  // const showByArtist = (e) => {
  //   if (e.target.value !== "") {
  //     setFilteredArtworks(
  //       artworklist.filter((artworkl) => {
  //         return artworkl.artist_name === e.target.value;
  //       })
  //     );
  //   } else {
  //     setFilteredArtworks(artworklist);
  //   }
  // };

  const handleEditArtwork = (id, instock) => {
    if (instock === 1) {
      instock = 0;
    } else {
      instock = 1;
    }
    Axios.put(
      `http://localhost:5000/api/artworks/updatestock/${id}`,
      {
        instock: instock,
      },
      {
        headers: {
          Authorization: "Bearer " + authCtx.token,
        },
      }
    ).then(() => {
      window.location.reload(false);
    });
  };

  // const [value, setValue] = useState("");
  // const [filterlist, setFilterlist] = useState(artworklist);
  // const [tableFilter, setTableFilter] = useState([]);
  // const filterdata = (e) => {
  //   if (e.target.value !== "") {
  //     setValue(e.target.value);
  //     const tableFilter = filterlist.filter(o => Object.keys(o).some(k =>
  //       String(o[k].toLowerCase().includes(e.target.value.toLowerCase()))
  //     ));
  //     setTableFilter(...tableFilter);
  //   }
  //   else {
  //     setValue(e.target.value);
  //     setFilterlist(...filterlist);
  //   }
  // }

  // start
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const displayartworklist = artworklist
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => {
      return (
        <tbody>
          <tr>
            <td className="admintd">{item.id}</td>
            <td className="admintd">{item.title}</td>
            <td className="admintd">{item.price}</td>
            <td className="admintd">{item.category}</td>
            <td className="admintd">{item.size}</td>
            <td className="admintd">{item.art_description}</td>
            <td className="admintd">{item.artist_name}</td>
            <td className="admintd">{item.instock ? "Not Sold" : "Sold"}</td>
            <td className="admintd">
              {" "}
              <img src={item.img} alt="firebase" className="image-view" />
            </td>
            <td className="admintd">
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  color: "green",
                }}
                onClick={() => handleEditArtwork(item.id, item.instock)}
              >
                <ChangeCircleOutlinedIcon />
              </button>
            </td>
            <td className="admintd">
              <Link
                to={`/editartwork/${item.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <EditIcon />
              </Link>
            </td>
          </tr>
        </tbody>
      );
    });

  const pageCount = Math.ceil(artworklist.length / usersPerPage);

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
          <div style={{ display: "flex", width: "100%" }}>
            <h3 style={{ padding: "20px", marginLeft: "10px" }}>
              ARTWORK INFORMATION
            </h3>

            <button
              className="btn"
              style={{ marginLeft: "60%", float: "right" }}
            >
              <Link
                to="/addpaintings"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <span>+ ADD</span>
              </Link>
            </button>
          </div>
          {/* <select name="show by artist" onChange={showByArtist}>
              <option value="">All</option>
              {[...artistOptions].map((name) => (
                <option>{name}</option>
              ))}
            </select> */}
          {/* <input type="text" placeholder="Search" value={value} onChange={filterdata} /> */}
          <ArtworkTable>
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
                  <th className="adminth">Artwork ID</th>
                  <th className="adminth">Title</th>
                  <th className="adminth">Price</th>
                  <th className="adminth">Category</th>
                  <th className="adminth">Size</th>
                  <th className="adminth">Description</th>
                  <th className="adminth">Artist Name</th>
                  <th className="adminth">InStock</th>
                  <th className="adminth">Artwork</th>
                  <th className="adminth">Instock</th>
                  <th className="adminth">Edit</th>
                </tr>
              </thead>
              {displayartworklist}
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
          </ArtworkTable>{" "}
        </div>
      </Conatainer>
    </>
  );
};

export default Artwork;
