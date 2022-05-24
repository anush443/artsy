import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import Axios from "axios";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AdminNavbar from "./AdminNavbar";
import AuthContext from "../../Store/auth-context";

const Form = styled.div`
  background-color: black;
  position: absolute;
  padding: 60px;
  width: 500px;
  color: white;
  top: 14%;
  font-size: 18px;
  height: auto;
  margin-left: 40%;
  border: 1px solid black;
  border-radius: 10px;
  display: inline-block;
  box-shadow: 10px 10px 5px gray;
  color: red;
`;

styled.p`
  color: red;
`;

const schema = yup.object().shape({
  Title: yup.string().required("* required "),
  Price: yup.number().min(0).required("* required"),
  Description: yup.string().required("* required"),
});

const EditArtwork = () => {
  const authCtx = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [artwork, setArtwork] = useState([]);
  const navigate = useNavigate();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [title, settitle] = useState("");
  const [price, setprice] = useState("");
  const [art_description, setart_description] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/artworks/find/${id}`)
      .then((response) => {
        setArtwork(response.data);
      })
      .then(() => {});
  }, [id]);

  const submitForm = (
    etitle,
    eprice,
    eart_description,
    title,
    price,
    art_description,
    data
  ) => {
    console.log(data);

    if (title === "") {
      title = etitle;
    }

    if (price === "") {
      price = eprice;
    }

    if (art_description === "") {
      art_description = eart_description;
    }
    if (title === "" || price === "" || art_description === "") {
      alert("No Empty field allowed...");
      window.location.reload(false);
    }
    alert(price);
    Axios.put(
      `http://localhost:5000/api/artworks/update/${id}`,
      {
        title: title,
        price: price,
        art_description: art_description,
      },
      {
        headers: {
          Authorization: "Bearer " + authCtx.token,
        },
      }
    ).then(() => {
      alert("Artwork Information Updated Successfully ...");
      navigate("/admin/artworks");
    });
  };

  return (
    <>
      <AdminNavbar />
      <div style={{ display: "flex", marginLeft: "200px" }}>
        <h3 style={{ padding: "20px", marginLeft: "10px" }}>
          ARTWORK INFORMATION
        </h3>

        <button className="btn" style={{ marginLeft: "60%", float: "right" }}>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/admin/artworks"
          >
            <span>View</span>
          </Link>
        </button>
      </div>

      <Form>
        {artwork.map((item) => (
          <form
            onSubmit={() =>
              handleSubmit(
                submitForm(
                  item.title,
                  item.price,
                  item.art_description,
                  title,
                  price,
                  art_description
                )
              )
            }
          >
            <label style={{ marginLeft: "80px" }} className="adminlabel">
              UPDATE INFORMATION
            </label>{" "}
            <br></br>
            <br></br>
            <input
              type="text"
              name="id"
              placeholder="Artwork ID"
              className="admininput"
              defaultValue={id}
            />
            <input
              type="text"
              name="Title"
              placeholder="Artwork Title"
              className="admininput"
              defaultValue={item.title}
              onChange={(e) => {
                settitle(e.target.value);
              }}
              ref={register}
            />
            <p> {errors.Title?.message} </p>
            <input
              type="number"
              name="Price"
              placeholder="Price"
              className="admininput"
              defaultValue={item.price}
              onChange={(e) => {
                setprice(e.target.value);
              }}
              ref={register}
            />
            <p> {errors.Price?.message} </p>
            <input
              type="text"
              name="Description"
              placeholder="Description"
              className="admininput"
              defaultValue={item.art_description}
              onChange={(e) => {
                setart_description(e.target.value);
              }}
              ref={register}
            />
            <p> {errors.Description?.message} </p>
            <input type="submit" className="nbtn" id="Submit" />
          </form>
        ))}
      </Form>
    </>
  );
};

export default EditArtwork;
