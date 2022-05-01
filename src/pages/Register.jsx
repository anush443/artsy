import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/20967/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: black;
  color: white;
  cursor: pointer;
  &:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`;

const Register = () => {
  const [submitBtn, setSubmitBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errMsg, setErrorMsg] = useState("");

  const emailInputRef = useRef();
  const passInputRef = useRef();
  const confirmPassInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setErrorMsg(""); // count is 0 here
    }, 10000);
    // Update count to be 5 after timeout is scheduled
  }, [errMsg]);

  const confirmPass = () => {
    if (passInputRef.current.value === confirmPassInputRef.current.value) {
      setSubmitBtn(true);
    } else {
      setSubmitBtn(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const email = emailInputRef.current.value;
    const password = passInputRef.current.value;

    setIsLoading(true);

    axios
      .post("http://localhost:5000/api/auth/register", {
        email: email,
        password: password,
      })
      .then((res) => {
        setIsLoading(false);
        if (res.data.message === "Successfully Registered new user") {
          navigate("/login");
        } else {
          setErrorMsg("User Already Registered. Please Login.");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        setErrorMsg("Regesteration Failed.....");
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={submitHandler}>
          <Input placeholder="email" ref={emailInputRef} />

          <Input
            placeholder="password"
            ref={passInputRef}
            onChange={confirmPass}
          />
          <Input
            placeholder="confirm password"
            ref={confirmPassInputRef}
            onChange={confirmPass}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          {!isLoading && (
            <Button disabled={!submitBtn ? true : false}>CREATE</Button>
          )}
          {isLoading && <p>Regestering ....</p>}
          {errMsg}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
