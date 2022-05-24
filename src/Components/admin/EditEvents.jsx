import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
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

const EditEvents = () => {
  const authCtx = useContext(AuthContext);
  const location = useLocation();
  const exhi_id = location.pathname.split("/")[2];
  const [Events, setEvents] = useState([]);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [exhi_name, setExhi_name] = useState("");
  const [exhi_price, setExhi_price] = useState("");
  const [exhi_description, setExhi_description] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/exhibitions/exhibition/${exhi_id}`)
      .then((response) => {
        setEvents(response.data);
      })
      .then(() => {});
  }, [exhi_id]);

  const submitForm = (
    eexhi_name,
    eexhi_price,
    eexhi_description,
    exhi_name,
    exhi_price,
    exhi_description,
    data
  ) => {
    if (exhi_name === "") {
      exhi_name = eexhi_name;
    }

    if (exhi_price === "") {
      exhi_price = eexhi_price;
    }

    if (exhi_description === "") {
      exhi_description = eexhi_description;
    }

    if (exhi_name === "" || exhi_price === "" || exhi_description === "") {
      alert("No Empty field allowed...");
      window.location.reload(false);
    }
    Axios.put(
      `http://localhost:5000/api/exhibitions/update/${exhi_id}`,
      {
        exhi_name: exhi_name,
        exhi_price: exhi_price,
        exhi_description: exhi_description,
      },
      {
        headers: {
          Authorization: "Bearer " + authCtx.token,
        },
      }
    ).then(() => {
      alert("Artwork Information Updated Successfully ...");
      window.location.reload(false);
    });
  };

  return (
    <>
      <AdminNavbar />
      <div style={{ display: "flex", marginLeft: "200px" }}>
        <h3 style={{ padding: "20px", marginLeft: "10px" }}>
          EVENT INFORMATION
        </h3>

        <button className="btn" style={{ marginLeft: "60%", float: "right" }}>
          <Link style={{ color: "white", textDecoration: "none" }} to="/Events">
            <span>View</span>
          </Link>
        </button>
      </div>

      <Form>
        {Events.map((item) => (
          <form
            onSubmit={() =>
              handleSubmit(
                submitForm(
                  item.exhi_name,
                  item.exhi_price,
                  item.exhi_description,
                  exhi_name,
                  exhi_price,
                  exhi_description
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
              name="exhi_id"
              placeholder="Event ID"
              className="admininput"
              defaultValue={exhi_id}
            />
            <input
              type="text"
              name="exhi_name"
              placeholder="Event Title"
              className="admininput"
              defaultValue={item.exhi_name}
              onChange={(e) => {
                setExhi_name(e.target.value);
              }}
              ref={register}
            />
            <p> {errors.Title?.message} </p>
            <input
              type="number"
              name="exhi_price"
              placeholder="Price"
              className="admininput"
              defaultValue={item.exhi_price}
              onChange={(e) => {
                setExhi_price(e.target.value);
              }}
              ref={register}
            />
            <p> {errors.Price?.message} </p>
            <input
              type="text"
              name="exhi_description"
              placeholder="Description"
              className="admininput"
              defaultValue={item.exhi_description}
              onChange={(e) => {
                setExhi_description(e.target.value);
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

export default EditEvents;
