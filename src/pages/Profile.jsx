// import React, { useContext, useEffect, useState } from "react";
//import Navbar from "../Components/Navbar/Navbar";
// import styled from "styled-components";
// import { mobile } from "../responsive";
// import AuthContext from "../Store/auth-context";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// const Container = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
// const Wrapper = styled.div`
//   width: 25%;
//   padding: 20px;
//   background-color: white;
//   ${mobile({ width: "75%" })}
// `;

// const Title = styled.h1`
//   font-size: 24px;
//   font-weight: 300;
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const Input = styled.input`
//   flex: 1;
//   min-width: 40%;
//   margin: 10px 0;
//   padding: 10px;
// `;
// const Button = styled.button`
//   width: 40%;
//   border: none;
//   padding: 15px 20px;
//   background-color: black;
//   color: white;
//   cursor: pointer;
//   margin-bottom: 10px;
//   &:disabled {
//     background-color: grey;
//     cursor: not-allowed;
//   }
// `;
// const Msg = styled.h2`
//   margin: 5px 0px;
//   font-size: 12px;
// `;
// const schema = yup.object().shape({
//   password: yup.string().min(4).max(15).required(),
//   confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
// });

// const Profile = () => {
//   const { register, handleSubmit, errors } = useForm({
//     resolver: yupResolver(schema),
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [msg, setMsg] = useState(false);

//   const authCtx = useContext(AuthContext);
//   const token = authCtx.token;
//   const id = authCtx.id;
//   const navigate = useNavigate();

//   useEffect(() => {
//     setTimeout(() => {
//       setMsg(""); // count is 0 here
//     }, 7000);
//     // Update count to be 5 after timeout is scheduled
//   }, [msg]);

//   const submitForm = (data) => {
//     const newPass = {
//       password: data.password,
//     };

//     setIsLoading(true);
//     //console.log(token);
//     axios
//       .put(`http://localhost:5000/api/users/${id}`, newPass, {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       })
//       .then((res) => {
//         setIsLoading(false);
//         setMsg(res.data);
//         navigate("/");
//       })
//       .catch((err) => {
//         setIsLoading(false);
//         setMsg("Please Try Again");
//       });
//   };
//   return (
//     <>
//       <Navbar />
//       <Container>
//         <Wrapper>
//           <h4>Your email:{authCtx.email}</h4>
//           <Title>Change Password</Title>
//           <Form onSubmit={handleSubmit(submitForm)}>
//             <label htmlFor="new-password">New password</label>
//             <Input
//               type="password"
//               name="password"
//               placeholder="password"
//               ref={register}
//             />
//             {errors.password?.message}
//             <label htmlFor="confirm-password">Confirm password</label>
//             <Input
//               type="password"
//               name="confirmPassword"
//               placeholder="confirm password"
//               ref={register}
//             />
//             {errors.confirmPassword && "Passwords Should Match!"}
//             {!isLoading && <Button>CREATE</Button>}
//             {isLoading && <p>Please wait ....</p>}
//           </Form>
//           <Msg>{msg}</Msg>
//         </Wrapper>
//       </Container>
//     </>
//   );
// };

import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AuthContext from "../Store/auth-context";
import { ShoppingBasket } from "@material-ui/icons";
import SettingsIcon from "@mui/icons-material/Settings";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PaymentsIcon from "@mui/icons-material/Payments";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import Orders from "../Components/Orders";
import Payments from "../Components/Payments";
import Tickets from "../Components/Tickets";
import Settings from "../Components/Settings";
import { Link } from "react-router-dom";

const drawerWidth = 240;

export default function ClippedDrawer() {
  const [isActive, setIsActive] = useState("Orders");
  const authCtx = useContext(AuthContext);
  const day = new Date();
  const getHr = day.getHours();
  const [msg, setMsg] = useState();

  useEffect(() => {
    if (getHr > 1 && getHr < 12) {
      setMsg("Good Morning");
    } else if (getHr > 12 && getHr < 18) {
      setMsg("Good Evening");
    } else {
      setMsg("Night");
    }
  }, [getHr]);
  console.log(msg);
  const handleLogout = () => {
    authCtx.logout();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{ background: "#212121" }}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {msg}{" "}
            {authCtx.userName.charAt(0).toUpperCase() +
              authCtx.userName.slice(1)}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <List>
              <ListItem button key={"Return to shop"}>
                <ListItemIcon>
                  <KeyboardReturnIcon />
                </ListItemIcon>
                <ListItemText
                  style={{ color: "#212121" }}
                  primary={"Return to shop"}
                />
              </ListItem>
            </List>
          </Link>

          <List>
            <ListItem
              onClick={() => setIsActive("Orders")}
              button
              key={"Orders"}
            >
              <ListItemIcon>
                <ShoppingBasket />
              </ListItemIcon>
              <ListItemText primary={"Orders"} />
            </ListItem>
          </List>
          <List>
            <ListItem
              onClick={() => setIsActive("Payments")}
              button
              key={"Payments"}
            >
              <ListItemIcon>
                <PaymentsIcon />
              </ListItemIcon>
              <ListItemText primary={"Payments"} />
            </ListItem>
          </List>
          <List>
            <ListItem
              onClick={() => setIsActive("Tickets")}
              button
              key={"Tickets"}
            >
              <ListItemIcon>
                <ConfirmationNumberIcon />
              </ListItemIcon>
              <ListItemText primary={"Tickets"} />
            </ListItem>
          </List>
          <List>
            <ListItem
              onClick={() => setIsActive("Settings")}
              button
              key={"Sttings"}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={"Settings"} />
            </ListItem>
          </List>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <Divider />
            <List>
              <ListItem onClick={handleLogout} button key={"Logout"}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItem>
            </List>
          </Link>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {isActive === "Orders" && <Orders />}
        {isActive === "Payments" && <Payments />}
        {isActive === "Tickets" && <Tickets />}
        {isActive === "Settings" && <Settings />}
      </Box>
    </Box>
  );
}
