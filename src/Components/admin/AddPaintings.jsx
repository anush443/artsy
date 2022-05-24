import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AdminNavbar from "./AdminNavbar";
import { storage } from "./firebase/firebase";
import AuthContext from "../../Store/auth-context";
import "./admin.css";

const Buttoncontainer = styled.div`
  margin-left: -40px;
  margin-top: 20px;
`;

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

styled.p`
  color: red;
`;

const schema = yup.object().shape({
  Title: yup.string().required("* required "),
  Price: yup.number().typeError("* required").min(0),
  Category: yup.string().required("* required"),
  Size: yup.string().required("* required"),
  ImagePath: yup.string().required("* required"),
  Description: yup.string().required("* required"),
  ArtistID: yup.string().required("* required"),
});

const AddPaintings = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  // const [Id, setid] = useState("");
  const [Title, settitle] = useState("");
  const [Price, setprice] = useState("");
  const [Category, setcategory] = useState("");
  const [Size, setsize] = useState("");
  const [ImagePath, setimage_path] = useState("");
  const [Description, setart_description] = useState("");
  const [ArtistID, setartist_id] = useState("");

  const authCtx = useContext(AuthContext);

  const [artistlist, setArtistlist] = useState([]);

  useEffect(() => {
    const getArtist = async () => {
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
    getArtist();
  }, [authCtx.token]);

  const submitForm = (data) => {
    console.log(data);

    Axios.post(
      "http://localhost:5000/api/artworks/addartwork",
      {
        artist_id: ArtistID,
        //  id: Id,
        price: Price,
        category: Category,
        img: ImagePath,
        description: Description,
        size: Size,
        title: Title,
        instock: 1,
      },
      {
        headers: {
          Authorization: "Bearer " + authCtx.token,
        },
      }
    ).then(() => {
      alert("Uploaded Successfully");
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
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
            setimage_path(url);
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
          ARTWORK INFORMATION
        </h3>
        <button className="btn" style={{ marginLeft: "60%", float: "right" }}>
          <Link
            to="/admin/artworks"
            style={{ color: "white", textDecoration: "none" }}
          >
            <span>View</span>
          </Link>
        </button>
      </div>
      <Form>
        <form onSubmit={handleSubmit(submitForm)}>
          <label className="adminlabel">INFORMATION</label> <br></br>
          <br></br>
          {/* <input
            type="text"
            name="id"
            className="admininput"
            placeholder="Artwork ID"
            onChange={(e) => {
              setid(e.target.value);
            }}
            ref={register}
          /> */}
          <p> {errors.Id?.message} </p>
          <input
            type="text"
            name="Title"
            placeholder="Artwork Title"
            className="admininput"
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
            onChange={(e) => {
              setprice(e.target.value);
            }}
            ref={register}
          />
          <p> {errors.Price?.message} </p>
          <select
            name="Category"
            className="adminselect"
            onChange={(e) => {
              setcategory(e.target.value);
            }}
            ref={register}
          >
            <option value="" selected>
              Category
            </option>
            <option value="landscape">Landscape</option>
            <option value="potrait">Potrait</option>
            <option value="urban">Urban</option>
            <option value="popculture">Pop Culture</option>
            <option value="abstract">Abstract</option>
            <option value="streetart">Street Art</option>
          </select>
          <p> {errors.Category?.message} </p>
          <select
            name="Size"
            className="adminselect"
            onChange={(e) => {
              setsize(e.target.value);
            }}
            ref={register}
          >
            <option value="" selected>
              Size
            </option>
            <option value="100X120"> 100X120</option>
            <option value="100X150">100X150</option>
            <option value="120X120">120X120</option>
            <option value="120X160">120X160</option>
            <option value="135X200">135X200 </option>
          </select>
          <p> {errors.Size?.message} </p>
          <input
            type="text"
            name="ImagePath"
            className="admininput"
            placeholder="Image Path"
            value={url}
            ref={register}
          />
          <p> {errors.ImagePath?.message} </p>
          <input
            type="text"
            name="Description"
            placeholder="Description"
            className="admininput"
            onChange={(e) => {
              setart_description(e.target.value);
            }}
            ref={register}
          />
          <p> {errors.Description?.message} </p>
          <select
            name="ArtistID"
            className="adminselect"
            onChange={(e) => {
              setartist_id(e.target.value);
            }}
            ref={register}
          >
            <option value="">Artist</option>
            {artistlist.map((item) => (
              <option value={item.artist_id}>{item.artist_name}</option>
            ))}
          </select>
          <p> {errors.ArtistID?.message} </p>
          <input type="submit" className="nbtn" id="Submit" />
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
            <label className="adminlabel" htmlFor="input">
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
    </>
  );
};

export default AddPaintings;
