import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import AuthContext from "../Store/auth-context";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CartContext from "../Store/cart-context";
import ExhibitionCartContext from "../Store/ExhibitionCart-context";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/889839/pexels-photo-889839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
      center;
  background-size: cover;
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

const Span = styled.span`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(4).max(15).required(),
});

const Login = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrorMsg] = useState();

  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const exhibitionCtx = useContext(ExhibitionCartContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setErrorMsg(""); // count is 0 here
    }, 10000);
    // Update count to be 5 after timeout is scheduled
  }, [errMsg]);

  const submitForm = (data) => {
    //console.log(data);
    setIsLoading(true);
    axios
      .post("http://localhost:5000/api/auth/login", data)
      .then((res) => {
        setIsLoading(false);
        if (res.data.message === "please register first") {
          setErrorMsg(res.data.message);
        } else if (res.data.message === "Incorrect Password") {
          setErrorMsg(res.data.message);
        } else {
          //console.log(res.data.expiresIn);
          //console.log(res.data.isAdmin);
          cartCtx.items.length = 0;
          exhibitionCtx.exhibitions.length = 0;
          const expirationTime = new Date(
            new Date().getTime() + +res.data.expiresIn * 1000
          );
          // console.log(expirationTime);
          authCtx.login(
            res.data.accessToken,
            res.data.id,
            res.data.email,
            res.data.username,
            res.data.isAdmin,
            expirationTime.toISOString()
          );
          navigate("/");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMsg("Login Failed.....");
      });
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit(submitForm)}>
          <Input type="text" name="email" placeholder="email" ref={register} />
          {errors.email?.message}
          <Input
            type="password"
            name="password"
            placeholder="password"
            ref={register}
          />
          {errors.password?.message}
          {!isLoading && <Button>LOGIN</Button>}
          {isLoading && <span>Signing In....</span>}
          {/* <Span>DO NOT YOU REMEMBER THE PASSWORD?</Span> */}
          <Link to="/register">
            <Span>CREATE A NEW ACCOUNT</Span>
          </Link>
          {errMsg}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
