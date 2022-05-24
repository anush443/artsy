// import { Description } from '@material-ui/icons';
import { ShoppingCartOutlined } from "@material-ui/icons";
import Badge from "@mui/material/Badge";
import { Add, Remove } from "@material-ui/icons";
import { useContext, useState } from "react";
import React from "react";
import styled from "styled-components";
import ExhibitionCartContext from "../Store/ExhibitionCart-context";
import AuthContext from "../Store/auth-context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Image = styled.img`
  width: 300px;
  height: 50vh;
  border-radius: 1px;
  border-radius: 10px;
`;
const Information = styled.div`
  width: 300px;
  height: auto;

  margin-left: 30px;
  border: 1px solid #efefef;
  background-color: #efefef;
  border-radius: 10px;
  display: inline-block;
  box-shadow: 10px 10px 5px gray;
`;
const Info = styled.p`
  text-align: center;
`;
const AddContainer = styled.div`
  padding: 30px;
  display: flex;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

// const Button = styled.button`

//   width : 400px;
//   display : inline;
//   border: 2px solid #000000;
//   background-color: white;
//   cursor: pointer;
//   font-weight: 500;

//   &:hover {
//     background-color: #f8f4f4;
//   }
// `;
const Ticket = styled.div`
  margin-left: 40px;
`;

const convertDate = (date) => {
  const validDate = new Date(date);
  const day = validDate.getDate();
  const month = validDate.getMonth() + 1;
  const year = validDate.getFullYear();
  return day + "/" + month + "/" + year;
};

const itemInCart = (cart, exhi_id) => {
  const { length } = cart;
  const id = length + 1;
  const found = cart.some((el) => el.id === exhi_id);

  if (found) {
    return true;
  } else {
    return false;
  }
};
const notify = (message) => toast(message);

const ExhibitionCard = ({ exhibition }) => {
  const [ticketQty, setTicketQty] = useState(1);
  const authCtx = useContext(AuthContext);
  const exhibitionCtx = useContext(ExhibitionCartContext);

  const exhibitionCart = exhibitionCtx.exhibitions;

  const handleTicketQty = (type) => {
    if (type === "minus") {
      ticketQty > 1 && setTicketQty(ticketQty - 1);
    } else {
      ticketQty < 10 && setTicketQty(ticketQty + 1);
    }
  };

  const addToExhibitionCart = (ticketQty, exhibition) => {
    //console.log(exhibition);
    //console.log(ticketQty, exhibition.exhi_id);
    if (itemInCart(exhibitionCart, exhibition.exhi_id)) {
      exhibitionCtx.addExhibition({
        id: exhibition.exhi_id,
        name: exhibition.exhi_name,
        img: exhibition.exhi_img,
        from_date: convertDate(exhibition.from_date),
        to_date: convertDate(exhibition.to_date),
        price: exhibition.exhi_price,
        qty: ticketQty,
        loginStatus: authCtx.isLoggedIn,
      });

      //notify("Added to cart");
      if (authCtx.isLoggedIn) {
        //get qty of existing exhibition qty
        //add new qty to existing exhibition qty
        //then make a put request with updated qty
        const index = exhibitionCart.findIndex(
          (exhi) => exhi.id === exhibition.exhi_id
        );
        const x = exhibitionCtx.exhibitions[index];
        const updatedQty = x.qty + ticketQty;
        console.log(updatedQty);

        const data = {
          exhi_id: exhibition.exhi_id,
          price: exhibition.exhi_price,
          qty: updatedQty,
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
    } else {
      exhibitionCtx.addExhibition({
        id: exhibition.exhi_id,
        name: exhibition.exhi_name,
        img: exhibition.exhi_img,
        from_date: convertDate(exhibition.from_date),
        to_date: convertDate(exhibition.to_date),
        price: exhibition.exhi_price,
        qty: ticketQty,
        loginStatus: authCtx.isLoggedIn,
      });
      if (authCtx.isLoggedIn) {
        const data = {
          userid: authCtx.id,
          exhi_id: exhibition.exhi_id,
          qty: ticketQty,
          price: exhibition.exhi_price,
        };

        //notify("Added to cart");
        //post request for 1st time insertion
        axios
          .post(`http://localhost:5000/api/exhibitioncart`, data, {
            headers: {
              Authorization: "Bearer " + authCtx.token,
            },
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <>
      <br></br>
      <Information>
        <ToastContainer
          theme="dark"
          type="sucess"
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <Image src={exhibition.exhi_img} alt="First slide" />
        <br></br>
        <br></br>
        <Info>
          {exhibition.exhi_name}
          <br></br> <br></br>
          {exhibition.exhi_description}
          <br></br>
          <br></br>
          from {convertDate(exhibition.from_date)} to{" "}
          {convertDate(exhibition.to_date)}
          <br></br>
          <br></br>
          Ticket Price - {exhibition.exhi_price}
          <br></br>
        </Info>

        <AddContainer>
          <AmountContainer>
            <Remove onClick={() => handleTicketQty("minus")} />
            <Amount>{ticketQty}</Amount>
            <Add onClick={() => handleTicketQty("add")} />
          </AmountContainer>
          <Ticket>
            <Badge
              onClick={() => addToExhibitionCart(ticketQty, exhibition)}
              badgeContent={ticketQty === 1 ? 0 : ticketQty}
              color="primary"
            >
              <ShoppingCartOutlined />
            </Badge>
          </Ticket>
          {/* <Button>BOOK TICKETS</Button> */}
        </AddContainer>
      </Information>
    </>
  );
};

export default ExhibitionCard;
