import React from "react";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Products from "../Components/Products";
import Slider from "../Components/Slider";
import { popularProducts } from "../data";

const Home = () => {
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
