import React from "react";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar/Navbar";
import Products from "../Components/Products";
import Slider from "../Components/Slider";
import { popularProducts } from "../data";

const Home = () => {
  // const getData = () =>
  //   fetch("http://localhost:5000/api/users/user")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));

  return (
    <div>
      <Navbar />
      <Slider />
      <Categories />
      <Products title={"Frequently Bought"} category={popularProducts} />
      <Footer />
    </div>
  );
};

export default Home;
