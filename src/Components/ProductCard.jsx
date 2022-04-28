import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./ProductCard.css";

const Container = styled.div``;

const ProductCard = ({ item }) => {
  return (
    <Container>
      <Link to={`/artwork/${item.id}`} style={{ textDecoration: "none" }}>
        <div class="artwork">
          <div class="artwork-image">
            <img src={item.img} />
          </div>
          <div class="artwork-details">
            <div class="artwork-name">
              <h1 class="text-center"> {item.title}</h1>
              <h2 class="text-center">By {item.artist_name}</h2>
              <h2 class="text-center">₹ {item.price}</h2>

              <div class="icon">
                <ShoppingCartOutlined />
              </div>
              <div class="icon">
                <ShoppingCartOutlined />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Container>
  );
};

export default ProductCard;
