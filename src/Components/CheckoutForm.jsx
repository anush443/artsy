import React, { useContext } from "react";

import styled from "styled-components";
import AuthContext from "../Store/auth-context";
import CartContext from "../Store/cart-context";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ExhibitionCartContext from "../Store/ExhibitionCart-context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Row = styled.div`
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
  margin: 0 -16px;
`;

const Col25 = styled.div`
  -ms-flex: 25%; /* IE10 */
  flex: 25%;
  padding: 0 16px;
`;

const Col50 = styled.div`
  -ms-flex: 50%; /* IE10 */
  flex: 50%;
  padding: 0 16px;
`;

const Col75 = styled.div`
  -ms-flex: 75%; /* IE10 */
  flex: 75%;
  padding: 0 16px;
`;

const Container = styled.div`
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgrey;

  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 31px -19px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 31px -19px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 31px -19px rgba(0, 0, 0, 0.75);
`;
const Form = styled.form``;
const Input = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  display: block;
`;

const IconContainer = styled.div`
  margin-bottom: 20px;
  padding: 7px 0;
  font-size: 24px;
`;
const Price = styled.div`
  float: right;
  color: black;
  font-weight: bold;
`;
const Button = styled.button`
  background-color: black;
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
  :hover {
    background-color: #212121;
  }
`;

const paymentHelper = (paymentType, amount, authCtx, exhibitionCtx) => {
  axios
    .post(
      `http://localhost:5000/api/payment/${authCtx.id}`,
      { amount, paymentType },
      {
        headers: {
          Authorization: "Bearer " + authCtx.token,
        },
      }
    )
    .then((res) => {
      alert("Payment Succesfull");

      if (paymentType === 0) {
        localStorage.removeItem("cart");
        window.location.reload(false);
      } else if (paymentType === 1) {
        localStorage.removeItem("exhibition");
        window.location.reload(false);
      } else {
        localStorage.removeItem("cart");
        localStorage.removeItem("exhibition");
        window.location.reload(false);
      }
    })
    .catch((err) => {
      alert("Payment failed");
    });
};

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  userName: yup.string().min(4).max(8).required(),
  password: yup.string().min(4).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});
const CheckoutForm = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const exhibitionCtx = useContext(ExhibitionCartContext);
  const cartItems = cartCtx.items.length + exhibitionCtx.exhibitions.length;
  const totalAmount = cartCtx.totalAmount + exhibitionCtx.totalAmount;
  const navigate = useNavigate();

  let paymentType;
  //only artworks
  if (cartCtx.items.length > 0 && exhibitionCtx.exhibitions.length === 0) {
    paymentType = 0;
    console.log(paymentType);
  }

  //only exhibitions
  if (cartCtx.items.length === 0 && exhibitionCtx.exhibitions.length > 0) {
    paymentType = 1;
    console.log(paymentType);
  }
  //both artworks and  exhibitions
  if (cartCtx.items.length > 0 && exhibitionCtx.exhibitions.length > 0) {
    paymentType = 2;
    console.log(paymentType);
  }

  const handlePayment = () => {
    if (paymentType === 0) {
      paymentHelper(paymentType, totalAmount, authCtx, exhibitionCtx);
      navigate("/profile");
    } else if (paymentType === 1) {
      paymentHelper(paymentType, totalAmount, authCtx, exhibitionCtx);
      navigate("/profile");
    } else {
      paymentHelper(paymentType, totalAmount, authCtx, exhibitionCtx);
      navigate("/profile");
    }
  };

  return (
    <>
      <h2> Checkout Form</h2>
      <p></p>
      <Row>
        <Col75>
          <Container>
            <Form>
              <Row>
                <Col50>
                  <h3>Billing Address</h3>
                  <Label hmtlFor="fname">
                    <PersonIcon />
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    id="fname"
                    name="firstname"
                    placeholder="John M. Doe"
                  />
                  <Label hmtlFor="email">
                    <EmailIcon />
                    Email
                  </Label>
                  <Input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                  />
                  <Label hmtlFor="adr">
                    <HomeIcon />
                    Address
                  </Label>
                  <Input
                    type="text"
                    id="adr"
                    name="address"
                    placeholder="542 W. 15th Street"
                  />
                  <Label htmlFor="city">
                    <LocationCityIcon />
                    City
                  </Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="New York"
                  />

                  <Row>
                    <Col50>
                      <Label htmlFor="state">State</Label>
                      <Input
                        type="text"
                        id="state"
                        name="state"
                        placeholder="NY"
                      />
                    </Col50>
                    <Col50>
                      <Label htmlFor="zip">Zip</Label>
                      <Input
                        type="text"
                        id="zip"
                        name="zip"
                        placeholder="10001"
                      />
                    </Col50>
                  </Row>
                </Col50>

                <Col50>
                  <h3>Payment</h3>
                  <Label htmlFor="fname">Accepted Cards</Label>
                  <IconContainer>
                    <img src="https://i.ibb.co/Qfvn4z6/payment.png"></img>
                  </IconContainer>
                  <Label htmlFor="cname">Name on Card</Label>
                  <Input
                    type="text"
                    id="cname"
                    name="cardname"
                    placeholder="John More Doe"
                  />
                  <Label htmlFor="ccnum">Credit card number</Label>
                  <Input
                    type="text"
                    id="ccnum"
                    name="cardnumber"
                    placeholder="1111-2222-3333-4444"
                  />
                  <Label htmlFor="expmonth">Exp Month</Label>
                  <Input
                    type="text"
                    id="expmonth"
                    name="expmonth"
                    placeholder="September"
                  />
                  <Row>
                    <Col50>
                      <Label htmlFor="expyear">Exp Year</Label>
                      <Input
                        type="text"
                        id="expyear"
                        name="expyear"
                        placeholder="2018"
                      />
                    </Col50>
                    <Col50>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder="352"
                      />
                    </Col50>
                  </Row>
                </Col50>
              </Row>
            </Form>
          </Container>
        </Col75>
        <Col25>
          <Container>
            <h4>
              Cart{" "}
              <Price>
                <i></i> <b>{cartItems}</b>
              </Price>
            </h4>

            {cartCtx.items.map((item) => (
              <p>
                {item.title}
                <Price>{item.price}</Price>
              </p>
            ))}
            {exhibitionCtx.exhibitions.length > 0 && <b>Your Tickets</b>}
            {exhibitionCtx.exhibitions.map((exhibition) => (
              <p>
                {exhibition.name} x {exhibition.qty} {exhibition.price}
                <Price>{exhibition.price * exhibition.qty}</Price>
              </p>
            ))}

            <p>
              Total <Price>{totalAmount}</Price>
            </p>
            {(authCtx.isLoggedIn && cartCtx.items.length > 0 && (
              <Button onClick={() => handlePayment()}>Confirm and pay</Button>
            )) ||
              (authCtx.isLoggedIn && exhibitionCtx.exhibitions.length > 0 && (
                <Button onClick={() => handlePayment()}>Confirm & pay</Button>
              ))}
          </Container>
        </Col25>
      </Row>
    </>
  );
};

export default CheckoutForm;
