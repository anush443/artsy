import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Store/auth-context";
import "./admin.css";

const Form = styled.div`
  background-color: black;
  position: absolute;
  padding: 60px;
  width: 500px;
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

const EditArtist = () => {
  const location = useLocation();
  const artist_id = location.pathname.split("/")[2];
  const [artist, setArtist] = useState([]);

  var [name, setname] = useState("");
  var [email, setemail] = useState("");
  var [phone, setphone] = useState("");
  const authCtx = useContext(AuthContext);
  // const [aid, setaid] = useState("");
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = yup.object().shape({
    name: yup.string().required("Name should be required "),
    phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
    email: yup.string().email().required("Email should be required"),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  console.log(artist_id);
  useEffect(() => {
    Axios.get(`http://localhost:5000/api/artworks/findartist/${artist_id}`, {
      headers: {
        Authorization: "Bearer " + authCtx.token,
      },
    })
      .then((response) => {
        setArtist(response.data);
      })
      .then(() => {});
  }, [artist_id]);

  const submitForm = (aname, aemail, aphone, name, email, phone, data) => {
    //console.log(data);

    if (name === "") {
      name = aname;
    }

    if (phone === "") {
      phone = aphone;
    }

    if (email === "") {
      email = aemail;
    }
    if (email === "" || name === "" || phone === "") {
      alert("No Empty field allowed...");
      window.location.reload(false);
    }
    Axios.put(
      `http://localhost:5000/api/artworks/updateartist/${artist_id}`,
      {
        name: name,
        email: email,
        phone: phone,
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

  return (
    <>
     <AdminNavbar></AdminNavbar>
      <div style={{ display: "flex",marginLeft: "200px" }}>
       
        <h3 style={{ padding: "20px", marginLeft: "10px" }}>
          ARTIST INFORMATION
        </h3>
        <button className="btn">
          <Link to="/Artist" style={{ color: "white", textDecoration: "none" }}>
            <span>View</span>
          </Link>
        </button>
      </div>

      <Form>
        <label className="adminlabel">UPDATE INFORMATION</label>
        {artist.map((item) => (
          <form
            onSubmit={() =>
              handleSubmit(
                submitForm(
                  item.artist_name,
                  item.email,
                  item.phone,
                  name,
                  email,
                  phone
                )
              )
            }
          >
            <input
              type="text"
              id="aid"
              name="aid"
              placeholder="Artist ID"
              className="admininput"
              value={artist_id}
            />

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="admininput"
              ref={register}
              defaultValue={item.artist_name}
              onChange={(e) => setname(e.target.value)}
            />
            <p> {errors.name?.message} </p>

            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              className="admininput"
              ref={register}
              defaultValue={item.email}
              onChange={(e) => setemail(e.target.value)}
            />
            <p> {errors.email?.message} </p>

            <input
              type="number"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              className="admininput"
              ref={register}
              defaultValue={item.phone}
              onChange={(e) => setphone(e.target.value)}
            />
            <p> {errors.phone?.message} </p>

            <input type="submit" class="nbtn" id="Submit" />
          </form>
        ))}
      </Form>
    </>
  );
};

export default EditArtist;
