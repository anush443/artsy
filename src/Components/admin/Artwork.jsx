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
                <th className="adminth">Change Instock</th>
              </tr>
            </thead>
            {artworklist.map((item) => (
              <tbody>
                <tr>
                  <td className="admintd">{item.id}</td>
                  <td className="admintd">{item.title}</td>
                  <td className="admintd">{item.price}</td>
                  <td className="admintd">{item.category}</td>
                  <td className="admintd">{item.size}</td>
                  <td className="admintd">{item.art_description}</td>
                  <td className="admintd">{item.artist_name}</td>
                  <td className="admintd">{item.instock}</td>
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
