import { Add, Remove } from "@material-ui/icons";

import styled from "styled-components";

import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar/Navbar";
import { mobile } from "../responsive";
import { useContext, useEffect, useState } from "react";
import CartContext from "../Store/cart-context";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios, { Axios } from "axios";
import AuthContext from "../Store/auth-context";
import ExhibitionCartContext from "../Store/ExhibitionCart-context";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;

  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;

  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const exhibitionCtx = useContext(ExhibitionCartContext);

  const token = authCtx.token;
  const totalAmount = cartCtx.totalAmount + exhibitionCtx.totalAmount;
  const shoppingBag = cartCtx.items.length + exhibitionCtx.exhibitions.length;

  //console.log(totalAmount);
  const removeCartItem = (art_id) => {
    //const id = authCtx.id;

    cartCtx.removeItem(art_id);
    if (authCtx.isLoggedIn) {
      axios
        .delete(`http://localhost:5000/api/cart/delete/${authCtx.id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
          data: {
            art_id: art_id,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addToExhibitionCart = (exhibition, curQty) => {
    //console.log(curQty);
    exhibitionCtx.addExhibition({ ...exhibition, qty: 1 });
    if (authCtx.isLoggedIn) {
      const data = {
        exhi_id: exhibition.id,
        price: exhibition.price,
        qty: curQty + 1,
      };
      axios
        .put(
          `http://localhost:5000/api/exhibitioncart/update/${authCtx.id}`,
          data,
          {
            headers: {
              Authorization: "Bearer " + authCtx.token,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const removeFromExhibitionCart = (exhibition, curQty) => {
    //console.log(exhibitionCtx.exhibitions);
    exhibitionCtx.removeExhibition(exhibition.id);
    console.log(curQty);
    //make a put request and update qty=qty-1
    if (authCtx.isLoggedIn && curQty > 1) {
      if (authCtx.isLoggedIn) {
        const data = {
          exhi_id: exhibition.id,
          price: exhibition.price,
          qty: curQty - 1,
        };
        axios
          .put(
            `http://localhost:5000/api/exhibitioncart/update/${authCtx.id}`,
            data,
            {
              headers: {
                Authorization: "Bearer " + authCtx.token,
              },
            }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    if (authCtx.isLoggedIn && curQty === 1) {
      axios
        .delete(
          `http://localhost:5000/api/exhibitioncart/delete/${authCtx.id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
            data: { exhi_id: exhibition.id },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Container>
      <Navbar />

      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({shoppingBag})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          {cartCtx.items.length > 0 && (
            <TopButton type="filled">CHECKOUT NOW</TopButton>
          )}
        </Top>
        <Bottom>
          <Info>
            {cartCtx.items && <h3>Artworks</h3>}
            {cartCtx.items.map((item) => (
              <Product>
                <ProductDetail>
                  <Image src={item.img} />
                  <Details>
                    <ProductName>
                      <b>Artwork:</b> {item.title}
                    </ProductName>
                    <ProductName>
                      <b>Artist:</b> {item.artist_name}
                    </ProductName>

                    <ProductId key={item.id}>
                      <b>ID:</b> {item.id}
                    </ProductId>
                    <ProductSize>
                      <b>Size:</b> {item.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Remove onClick={() => removeCartItem(item.id)} />
                  </ProductAmountContainer>
                  <ProductPrice>₹{item.price * item.amount}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            {exhibitionCtx.exhibitions && <h3>Your Tickets</h3>}
            {exhibitionCtx.exhibitions.map((exhibition) => (
              <Product>
                <ProductDetail>
                  <Image src={exhibition.img} />
                  <Details>
                    <ProductId key={exhibition.id}>
                      <b>ID:</b> {exhibition.id}
                    </ProductId>
                    <ProductName>
                      <b>{exhibition.name}</b>
                    </ProductName>
                    <ProductName>
                      from <b>{exhibition.from_date}</b> to{" "}
                      <b>{exhibition.to_date}</b>
                    </ProductName>

                    <ProductSize>
                      <b>Price:</b> {exhibition.price}
                      <br></br>
                      <b>No of tickets </b> {exhibition.qty}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add
                      onClick={() =>
                        addToExhibitionCart(exhibition, exhibition.qty)
                      }
                    />
                    <ProductAmount>{exhibition.qty}</ProductAmount>
                    <Remove
                      onClick={() =>
                        removeFromExhibitionCart(exhibition, exhibition.qty)
                      }
                    />
                  </ProductAmountContainer>
                  <ProductPrice>
                    ₹{exhibition.price * exhibition.qty}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}

            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{totalAmount}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₹00</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>₹00</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹{totalAmount}</SummaryItemPrice>
            </SummaryItem>
            {(cartCtx.items.length > 0 ||
              exhibitionCtx.exhibitions.length > 0) && (
              <Link to="/checkout">
                <Button>CHECKOUT NOW</Button>
              </Link>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
