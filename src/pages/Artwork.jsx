import { Add, Remove } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState, useContext } from "react";

import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

import { mobile } from "../responsive";
import CartContext from "../Store/cart-context";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
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

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;
const Artwork = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [artwork, setArtwork] = useState({});
  const [quantity, setQuantity] = useState(1);
  const cartCtx = useContext(CartContext);
  //const dispatch = useDispatch();

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = (artwork) => {
    const item = artwork.artwork;
    //console.log(item);

    const addToCartHandler = (quantity, item) => {
      cartCtx.addItem({
        id: item.id,
        artist_name: item.artist_name,
        category: item.category,
        price: item.price,
        title: item.title,
        amount: quantity,
        img: item.img,
        size: item.size,
      });
    };
    addToCartHandler(quantity, item);
  };

  useEffect(() => {
    const getArtwork = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/artworks/find/${id}`
        );

        setArtwork(...res.data);
      } catch {}
    };
    getArtwork();
  }, [id]);

  // const handleClick = () => {
  //   dispatch(addArtwork({ ...artwork, quantity }));
  // };

  return (
    <Container>
      <Navbar />

      <Wrapper>
        <ImgContainer>
          <Image src={artwork.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>
            {artwork.title} by {artwork.artist_name}{" "}
          </Title>
          <Desc></Desc>
          <Desc>{artwork.art_description}</Desc>
          <Price></Price>
          <Price>₹ {artwork.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Size: {artwork.size}</FilterTitle>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={() => handleClick({ artwork })}>
              ADD TO CART
            </Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>

      <Footer />
    </Container>
  );
};

export default Artwork;
