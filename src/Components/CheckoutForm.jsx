import React, { useContext, useEffect, useState } from "react";

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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  width: 40%;
  background-color: black;
  color: white;
  padding: 12px;
  margin: 10px 0;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 17px;
  :hover {
    background-color: #212121;
  }
`;

const paymentHelper = (paymentType, amount, authCtx) => {
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
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = yup.object().shape({
  fullName: yup.string().min(4).max(40).required("Full is required"),
  email: yup.string().email().required("Email is required"),
  address: yup.string().min(5).max(199).required(),
  city: yup.string().min(5).max(44).required(),
  state: yup.string().min(5).max(44).required(),
  zipcode: yup.number().required("Zipcode is required"),
  mobile: yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

const notify = (message) => toast(message);

const CheckoutForm = () => {
  const [customerInfo, setCustomerInfo] = useState("");

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const exhibitionCtx = useContext(ExhibitionCartContext);
  const cartItems = cartCtx.items.length + exhibitionCtx.exhibitions.length;
  const totalAmount = cartCtx.totalAmount + exhibitionCtx.totalAmount;
  const navigate = useNavigate();

  useEffect(() => {
    const getCustomerInfo = async () => {
      try {
        const info = await axios.get(
          `http://localhost:5000/api/customer/${authCtx.id}`,
          {
            headers: {
              Authorization: "Bearer " + authCtx.token,
            },
          }
        );
        if (info.data.length > 0) {
          setCustomerInfo(...info.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getCustomerInfo();
  }, [authCtx.id]);

  const submitForm = (data) => {
    if (!customerInfo) {
      const customer = {
        ...data,
        id: authCtx.id,
      };
      axios
        .post(`http://localhost:5000/api/customer`, customer, {
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
        })
        .then((res) => {
          if (res.data.message) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put(`http://localhost:5000/api/customer/update/${authCtx.id}`, data, {
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
        })
        .then((res) => {
          if (res.data.message) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  let paymentType;
  //only artworks
  if (cartCtx.items.length > 0 && exhibitionCtx.exhibitions.length === 0) {
    paymentType = 0;
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
      paymentHelper(paymentType, totalAmount, authCtx);
      navigate("/profile");
    } else if (paymentType === 1) {
      paymentHelper(paymentType, totalAmount, authCtx);
      navigate("/profile");
    } else {
      paymentHelper(paymentType, totalAmount, authCtx);
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
            <Form onSubmit={handleSubmit(submitForm)}>
              <Row>
                <Col50>
                  <h3>Billing Address</h3>
                  <Row>
                    <Col50>
                      <Label hmtlFor="fname">
                        <PersonIcon />
                        Full Name
                      </Label>
                      <Input
                        type="text"
                        id="fname"
                        name="fullName"
                        placeholder="John M. Doe"
                        defaultValue={customerInfo?.name}
                        ref={register}
                      />

                      {errors.fullName?.message}
                    </Col50>
                    <Col50>
                      <Label hmtlFor="email">
                        <EmailIcon />
                        Email
                      </Label>
                      <Input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="john@example.com"
                        defaultValue={customerInfo?.email}
                        ref={register}
                      />
                      {errors.email?.message}
                    </Col50>
                  </Row>
                  <Row>
                    <Col50>
                      <Label hmtlFor="adr">
                        <HomeIcon />
                        Address
                      </Label>
                      <Input
                        type="text"
                        id="adr"
                        name="address"
                        placeholder="542 W. 15th Street"
                        defaultValue={customerInfo?.address}
                        ref={register}
                      />
                      {errors.address?.message}
                    </Col50>
                    <Col50>
                      <Label htmlFor="city">
                        <LocationCityIcon />
                        City
                      </Label>
                      <Input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="New York"
                        defaultValue={customerInfo?.city}
                        ref={register}
                      />
                      {errors.city?.message}
                    </Col50>
                  </Row>

                  <Row>
                    <Col50>
                      <Label htmlFor="state">State</Label>
                      <Input
                        type="text"
                        id="state"
                        name="state"
                        placeholder="NY"
                        defaultValue={customerInfo?.state}
                        ref={register}
                      />
                      {errors.state?.message}
                    </Col50>
                    <Col50>
                      <Label htmlFor="zipcode">Zipcode</Label>
                      <Input
                        type="number"
                        id="zip"
                        name="zipcode"
                        placeholder="10001"
                        defaultValue={customerInfo?.zipcode}
                        ref={register}
                      />
                      {errors.zipcode?.message}
                    </Col50>
                  </Row>
                  <Row>
                    <Col50>
                      <Label htmlFor="mobile">Mobile</Label>
                      <Input
                        style={{ width: "50%" }}
                        type="number"
                        id="mobile"
                        name="mobile"
                        placeholder="9190770050"
                        defaultValue={customerInfo?.mobile}
                        ref={register}
                      />
                      {errors.mobile?.message}
                    </Col50>
                  </Row>

                  <Button>{!customerInfo ? "Submit" : "Update Details"}</Button>
                </Col50>

                {/* <Col50>
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
                </Col50> */}
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
            {(customerInfo &&
              authCtx.isLoggedIn &&
              cartCtx.items.length > 0 && (
                <Button onClick={() => handlePayment()}>Confirm and pay</Button>
              )) ||
              (customerInfo &&
                authCtx.isLoggedIn &&
                exhibitionCtx.exhibitions.length > 0 && (
                  <Button onClick={() => handlePayment()}>Confirm & pay</Button>
                ))}
          </Container>
        </Col25>
      </Row>
    </>
  );
};

export default CheckoutForm;
