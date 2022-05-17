import React, { useContext, useState } from "react";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import AuthContext from "../../Store/auth-context";
import "./admin.css";

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
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = yup.object().shape({
  Name: yup.string().required("Name should be required "),
  Phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  Email: yup.string().email().required("Email should be required"),
});

const AddArtist = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const authCtx = useContext(AuthContext);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data) => {
    //console.log(data);
    Axios.post(
      `http://localhost:5000/api/artworks/addartist`,
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
      alert("Artist Information Added Successfully ...");
      window.location.reload(false);
    });
  };

  return (
    <>
      <Form>
        <form onSubmit={handleSubmit(submitForm)}>
          <label className="adminlabel">ARTIST INFORMATION</label>
          <input
            type="text"
            name="Name"
            placeholder="Name"
            ref={register}
            className="admininput"
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <p> {errors.Name?.message} </p>
          <input
            type="text"
            name="Email"
            placeholder="Email"
            className="admininput"
            ref={register}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
          <p> {errors.Email?.message} </p>
          <input
            type="number"
            name="Phone"
            placeholder="Phone Number"
            className="admininput"
            ref={register}
            onChange={(e) => {
              setphone(e.target.value);
            }}
          />
          <p> {errors.Phone?.message} </p>
          <input type="submit" class="nbtn" id="Submit" />
        </form>
      </Form>
      {/* <ArtistForm></ArtistForm> */}
    </>
  );
};

export default AddArtist;
