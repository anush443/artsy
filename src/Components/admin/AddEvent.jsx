import React, { useState, useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import Axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { storage } from "./firebase/firebase";
import "./admin.css";

const Form = styled.div`
  background-color: black;
  position: absolute;
  padding: 60px;
  width: 900px;
  top: 14%;
  font-size: 18px;
  height: 1050px;
  margin-left: 25%;
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
  name: yup.string().required("*required "),
  price: yup.number().min(100).required("*required"),
  description: yup.string().required("*required"),
  limit: yup.number().min(10).required("*required"),
  imagepath: yup.string().required("*required"),
  enddate: yup.date().required("*required"),
  startdate: yup.date().required("*required"),
});
// startdate:yup.date().required(),

const AddEvent = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");
  const [limit, setlimit] = useState("");
  const [imagepath, setimagepath] = useState("");
  // let navigate = useNavigate();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const submitForm = (data) => {
    console.log(data);
    //alert(name);
    Axios.post("http://localhost:7000/api/addEvent", {
      ename: name,
      eprice: price,
      edescription: description,
      estartdate: startdate,
      eenddate: enddate,
      elimit: limit,
      eimagepath: imagepath,
    }).then(() => {
      alert("Event Added Successfully ...");
      //  window.location.reload(false);
      // window.location.reload(false);
      // let path = `/Events`;
      // navigate(path);
      <Navigate to="/Events"></Navigate>;
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
      <div style={{ display: "flex" }}>
        <AdminNavbar></AdminNavbar>
        <h3 style={{ padding: "20px", marginLeft: "10px" }}>
          EVENT INFORMATION
        </h3>
        <button className="btn">
          <Link to="/Events" style={{ color: "white", textDecoration: "none" }}>
            <span>View</span>
          </Link>
        </button>
        <Form>
          <form onSubmit={() => handleSubmit(submitForm())}>
            <label>INFORMATION</label> <br></br>
            <br></br>
            <input
              type="text"
              name="ename"
              placeholder="Event Name"
              ref={register}
              className="admininput"
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <p> {errors.ename?.message} </p>
            <input
              type="number"
              name="eprice"
              placeholder="Price"
              ref={register}
              className="admininput"
              onChange={(e) => {
                setprice(e.target.value);
              }}
            />
            <p> {errors.eprice?.message} </p>
            <input
              type="text"
              name="edescription"
              placeholder="Description"
              ref={register}
              className="admininput"
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
            <p> {errors.edescription?.message} </p>
            <input
              type="date"
              style={{ backgroundColor: "white", color: "black" }}
              name="estartdate"
              placeholder="Start Date"
              ref={register}
              className="admininput"
              onChange={(e) => {
                setstartdate(e.target.value);
              }}
            />
            <p> {errors.estartdate?.message} </p>
            <input
              type="date"
              style={{ backgroundColor: "white", color: "black" }}
              name="eenddate"
              placeholder="End Date"
              ref={register}
              className="admininput"
              onChange={(e) => {
                setenddate(e.target.value);
              }}
            />
            <p> {errors.eenddate?.message} </p>
            <input
              type="number"
              name="elimit"
              placeholder="Ticket Limit"
              ref={register}
              className="admininput"
              onChange={(e) => {
                setlimit(e.target.value);
              }}
            />
            <p> {errors.elimit?.message} </p>
            <input
              type="text"
              name="eimagepath"
              placeholder="Image Path"
              ref={register}
              value={url}
              onChange={(e) => {
                setimagepath(e.target.value);
              }}
            />
            <p> {errors.eimagepath?.message} </p>
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
              className="admininput"
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
