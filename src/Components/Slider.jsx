import React from "react";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";

const Image = styled.img`
  width: 100%;
  height: 85vh;
`;

const Slider = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item interval={3000}>
          <Image
            className="d-block w-100"
            src="https://images.pexels.com/photos/1604991/pexels-photo-1604991.jpeg?cs=srgb&dl=pexels-sevenstorm-juhaszimrus-1604991.jpg&fm=jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h1>Elevate your world with unique Art & Design</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <Image
            className="d-block w-100"
            src="https://images.pexels.com/photos/3004909/pexels-photo-3004909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h1>Elevate your world with unique Art & Design</h1>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <Image
            className="d-block w-100"
            src="https://images.pexels.com/photos/2087708/pexels-photo-2087708.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h1>Elevate your world with unique Art & Design</h1>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Slider;
