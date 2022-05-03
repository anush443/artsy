import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import AuthContext from "../Store/auth-context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;

  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Box = styled.div`
  width: 50%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  ${mobile({ flexDirection: "column" })}
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;
const Button = styled.button`
  width: 50%;
  border: none;
  padding: 10px 15px;
  background-color: black;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`;
const Msg = styled.h2`
  margin: 5px 0px;
  font-size: 12px;
`;
const schema = yup.object().shape({
  password: yup.string().min(4).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});
const Settings = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState(false);

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const id = authCtx.id;
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setMsg(""); // count is 0 here
    }, 7000);
    // Update count to be 5 after timeout is scheduled
  }, [msg]);

  const submitForm = (data) => {
    const newPass = {
      password: data.password,
    };

    setIsLoading(true);
    //console.log(token);
    axios
      .put(`http://localhost:5000/api/users/${id}`, newPass, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setMsg(res.data);
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        setMsg("Please Try Again");
      });
  };
  return (
    <>
      <Container>
        <Title>Account Settings</Title>

        <Box>
          <Button onClick={() => setShowForm((prevState) => !prevState)}>
            Update Password
          </Button>
          <h4>Email:{authCtx.email}</h4>
          {showForm && (
            <Form onSubmit={handleSubmit(submitForm)}>
              <label htmlFor="new-password">New password</label>
              <Input
                type="password"
                name="password"
                placeholder="password"
                ref={register}
              />
              {errors.password?.message}
              <label htmlFor="confirm-password">Confirm password</label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="confirm password"
                ref={register}
              />
              {errors.confirmPassword && "Passwords Should Match!"}
              {!isLoading && <Button>CREATE</Button>}
              {isLoading && <p>Please wait ....</p>}
            </Form>
          )}
        </Box>
        <Msg>{msg}</Msg>
      </Container>
    </>
  );
};

export default Settings;
