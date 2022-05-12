import React, { useState, useEffect, useContext } from "react";
import AdminNavbar from "./AdminNavbar";
import styled from "styled-components";
import Axios from "axios";
import AddArtist from "./AddArtist";
import { Link } from "react-router-dom";
import AuthContext from "../../Store/auth-context";

const ArtistTable = styled.div`
  width: auto;
  height: auto;
  padding: 10px;
  margin-left: 20px;
`;
const Conatainer = styled.div`
  display: flex;
  content-align: right;
`;
const Artist = () => {
  const [artistlist, setArtistlist] = useState([]);
  const authCtx = useContext(AuthContext);

  //   useEffect(() => {

  //   Axios.get('http://localhost:7000/api/Artistinformation').then((response)=>{
  //     setArtistlist(response.data);
  //   })
  //  });

  useEffect(() => {
    const getArtwork = async () => {
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
    getArtwork();
  }, [authCtx.token]);

  const handleRemoveArtist = (id, aname) => {
    alert("Are Sure to Remove " + aname + " from Artist ");
    const artsistId = id;
    Axios.delete(
      `http://localhost:5000/api/artworks/delete/artist/${artsistId}`,
      {
        headers: {
          Authorization: "Bearer " + authCtx.token,
        },
      }
    ).then(() => {
      alert(aname + " Information Removed Successfully");
    });
  };

  const [tableshow, settableShow] = useState(true);

  return (
    <>
      <Conatainer>
        <AdminNavbar />

        <div style={{ display: "block" }}>
          <div style={{ display: "flex" }}>
            <h3 style={{ padding: "20px", marginLeft: "10px" }}>
              ARTIST INFORMATION
            </h3>
            <button
              onClick={() => settableShow((prev) => !prev)}
              className="btn"
            >
              <span>{tableshow ? "+add" : "back"}</span>
            </button>
          </div>
          {tableshow && (
            <ArtistTable>
              <table>
                <thead>
                  <tr>
                    <th>Artist ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                {artistlist.map((item) => (
                  <tbody>
                    <tr>
                      <td>{item.artist_id}</td>
                      <td>{item.artist_name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>
                        <Link
                          to={`/EditArtist/${item.artist_id}`}
                          style={{ textDecoration: "none" }}
                        >
                          Edit
                        </Link>
                      </td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleRemoveArtist(item.artist_id, item.artist_name)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </ArtistTable>
          )}
        </div>
      </Conatainer>
      {!tableshow && <AddArtist></AddArtist>}
    </>
  );
};

export default Artist;
