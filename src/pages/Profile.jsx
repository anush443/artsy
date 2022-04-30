import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import styled from "styled-components";
import { mobile } from "../responsive";
import AuthContext from "../Store/auth-context";
import axios from "axios";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`;
const msg = styled.h2`
  margin: 5px 0px;
  font-size: 12px;
`;

const Profile = () => {
  const [submitBtn, setSubmitBtn] = useState(false);
  const [msg, setMsg] = useState(false);
  const oldPassInputRef = useRef();
  const passInputRef = useRef();
  const confirmPassInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const id = authCtx.id;

  useEffect(() => {
    setTimeout(() => {
      setMsg(""); // count is 0 here
    }, 7000);
    // Update count to be 5 after timeout is scheduled
  }, [msg]);

  const confirmPass = () => {
    if (
      passInputRef.current.value === confirmPassInputRef.current.value &&
      passInputRef.current.value.length >= 5
    ) {
      setSubmitBtn(true);
    } else {
      setMsg("Passwords should match,min 5 characters");
      setSubmitBtn(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const password = passInputRef.current.value;

    //console.log(token);

    axios
      .put(
        `http://localhost:5000/api/users/${id}`,
        { password: password },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setMsg(res.data);
      })
      .catch((err) => {
        setMsg("Please Try Again");
      });
  };
  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>Change Password</Title>
          <Form onSubmit={submitHandler}>
            {/* <label htmlFor="old-password">Old password</label>
            <Input
              type="password"
              id="old-password"
              ref={oldPassInputRef}
              onChange={confirmOldPass}
            /> */}
            <label htmlFor="new-password">New password</label>
            <Input
              type="password"
              id="new-password"
              ref={passInputRef}
              onChange={confirmPass}
            />
            <label htmlFor="confirm-password">Confirm password</label>
            <Input
              type="password"
              id="confirm-password"
              ref={confirmPassInputRef}
              onChange={confirmPass}
            />
            <Button disabled={!submitBtn ? true : false}> Confirm </Button>
          </Form>
          {msg}
        </Wrapper>
      </Container>
    </>
  );
};

export default Profile;
