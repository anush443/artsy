import React, { useState, useEffect, useContext } from "react";
import AdminNavbar from "./AdminNavbar";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { storage } from "./firebase/firebase";
import AuthContext from "../../Store/auth-context";

const Form = styled.div`
  background-color: black;
  position: absolute;
  padding: 60px;
  width: 900px;
  top: 14%;
  font-size: 18px;
  height: 1050px;
  margin-left: 10%;
  border: 1px solid black;
  border-radius: 10px;
  display: inline-block;
  box-shadow: 10px 10px 5px gray;
  color: red;
`;
const Container_img = styled.div`
  width: 430px;
  height: auto;
  transform: translate(90%, -100%);
`;
const Buttoncontainer = styled.div`
  margin-left: -40px;
  margin-top: 20px;
`;
const schema = yup.object().shape({
  Eventname: yup.string().required("*required"),
  Eventprice: yup.number().typeError("* required").min(100),
  Eventdescription: yup.string().required("*required"),
  Eventlimit: yup.number().typeError("* required").min(10),
  Eventimagepath: yup.string().required("*required"),
  Eventenddate: yup.date().typeError("* required"),
  Eventstartdate: yup.date().typeError("* required"),
});

const AddEvent = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [limit, setlimit] = useState("");
  const [imagepath, setimagepath] = useState("");
  const authCtx = useContext(AuthContext);

  const submitForm = (data) => {
    console.log(data);

    Axios.post(
      "http://localhost:5000/api/exhibitions/addexhibitions",
      {
        ename: name,
        eprice: price,
        edescription: description,
        estartdate: startdate,
        eenddate: enddate,
        elimit: limit,
        eimagepath: imagepath,
      },
      {
        headers: {
          Authorization: "Bearer " + authCtx.token,
        },
      }
    ).then(() => {
      alert("Event Added Successfully ...");
      window.location.reload(false);
    });
  };

  const [img, setimg] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setimg({ profileImg: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);

    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`events/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("events")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            setimagepath(url);
          });
      }
    );
  };
  const { profileImg } = img;

  return (
    <>
      <AdminNavbar></AdminNavbar>
      <div style={{ display: "flex", marginLeft: "200px" }}>
        <h3 style={{ padding: "20px", marginLeft: "10px" }}>
          EVENT INFORMATION
        </h3>
        <button className="btn" style={{ marginLeft: "60%", float: "right" }}>
          <Link to="/Events" style={{ color: "white", textDecoration: "none" }}>
            <span>View</span>
          </Link>
        </button>
        <Form>
          <form onSubmit={handleSubmit(submitForm)}>
            <label className="adminlabel">INFORMATION</label> <br></br>
            <br></br>
            <input
              type="text"
              name="Eventname"
              className="admininput"
              placeholder="Event Name"
              ref={register}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <p> {errors.Eventname?.message} </p>
            <input
              type="number"
              name="Eventprice"
              className="admininput"
              placeholder="Price"
              ref={register}
              onChange={(e) => {
                setprice(e.target.value);
              }}
            />
            <p> {errors.Eventprice?.message} </p>
            <input
              type="text"
              name="Eventdescription"
              className="admininput"
              placeholder="Description"
              ref={register}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
            <p> {errors.Eventdescription?.message} </p>
            <input
              type="date"
              name="Eventstartdate"
              className="admininput"
              style={{ backgroundColor: "white", color: "black" }}
              placeholder="Start Date"
              ref={register}
              onChange={(e) => {
                setstartdate(e.target.value);
              }}
            />
            <p> {errors.Eventstartdate?.message} </p>
            <input
              type="date"
              name="Eventenddate"
              className="admininput"
              style={{ backgroundColor: "white", color: "black" }}
              placeholder="End Date"
              ref={register}
              onChange={(e) => {
                setenddate(e.target.value);
              }}
            />
            <p> {errors.Eventenddate?.message} </p>
            <input
              type="number"
              className="admininput"
              name="Eventlimit"
              placeholder="Ticket Limit"
              ref={register}
              onChange={(e) => {
                setlimit(e.target.value);
              }}
            />
            <p> {errors.Eventlimit?.message} </p>
            <input
              type="text"
              className="admininput"
              name="Eventimagepath"
              placeholder="Image Path"
              ref={register}
              value={url}
              onChange={(e) => {
                setimagepath(e.target.value);
              }}
            />
            <p> {errors.Eventimagepath?.message} </p>
            <input type="submit" class="nbtn" id="Submit" />
          </form>
          <Container_img>
            <div className="img-holder">
              <img src={profileImg} alt="" id="img" className="img" />
            </div>
            <input
              type="file"
              accept="image/*"
              id="input"
              onChange={(e) => imageHandler(e)}
            />
            <Buttoncontainer>
              <label htmlFor="input">
                <i class="nbtn">Choose Image</i>
              </label>
              <button
                class="nbtn"
                style={{ marginTop: "20px", width: "350px" }}
                onClick={handleUpload}
              >
                Upload
              </button>
            </Buttoncontainer>
          </Container_img>
        </Form>
      </div>
    </>
  );
};

export default AddEvent;
