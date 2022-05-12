import React, { useState, useEffect, useContext } from "react";
import AdminNavbar from "./AdminNavbar";
import styled from "styled-components";
import Axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../../Store/auth-context";

const ArtworkTable = styled.div`
  width: auto;
  height: auto;
  padding: 10px;
  margin-left: 20px;
`;
const Conatainer = styled.div`
  display: felx;
  content-align: right;
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
      setArtworklist(response.data);
    });
  }, []);

  const handleRemoveArtwork = (artwork_id) => {
    Axios.delete(`http://localhost:5000/api/artworks/delete/${artwork_id}`, {
      headers: {
        Authorization: "Bearer " + authCtx.token,
      },
    }).then(() => {
      alert("Deleted Successfully ");
    });
  };
  const handleEditArtwork = (id, instock) => {
    Axios.post(`http://localhost:7000/api/updateInstock`, {
      id: id,
      instock: instock,
    }).then(() => {});
  };

  return (
    <Conatainer>
      <AdminNavbar />

      <div style={{ display: "block" }}>
        <div style={{ display: "flex" }}>
          <h3 style={{ padding: "20px", marginLeft: "10px" }}>
            ARTWORK INFORMATION
          </h3>
          <button className="btn">
            <Link
              to="/addpaintings"
              style={{ color: "white", textDecoration: "none" }}
            >
              <span>+ ADD</span>
            </Link>
          </button>
        </div>
        <ArtworkTable>
          <table>
            <thead>
              <tr>
                <th>Artwork ID</th>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>Size</th>
                <th>Description</th>
                <th>Artist Name</th>
                <th>InStock</th>
                <th>Artwork</th>
                <th>Change Instock</th>
                <th>Delete</th>
              </tr>
            </thead>
            {artworklist.map((item) => (
              <tbody>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.size}</td>
                  <td>{item.art_description}</td>
                  <td>{item.artist_name}</td>
                  <td>{item.instock}</td>
                  <td>
                    {" "}
                    <img src={item.img} alt="firebase" className="image-view" />
                  </td>
                  <td>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        color: "green",
                      }}
                      onClick={() => handleEditArtwork(item.id, item.instock)}
                    >
                      <u>Toggle</u>
                    </button>
                  </td>
                  {/* <td><Link  to={`/EditArtwork/${item.id}`} style={{ textDecoration: "none" }}>Edit</Link></td>        */}
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleRemoveArtwork(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </ArtworkTable>{" "}
      </div>
    </Conatainer>
  );
};

export default Artwork;
