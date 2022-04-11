import "./App.css";
import Home from "./pages/Home";
import Announcements from "./Components/Announcements";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { sliderItems } from "./data";

function App() {
  return (
    <>
      <Announcements />
      <Home />
      <ProductList />
      <Product />
      <Register />
      <Login />
      <Cart />
    </>
  );
}

export default App;
