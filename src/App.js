import "./App.css";
import Home from "./pages/Home";

import ArtworkList from "./pages/ArtworkList";
import Artwork from "./pages/Artwork";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import CartProvider from "./Store/cartProvider";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Exhibition from "./pages/Exhibition";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artworks/:category" element={<ArtworkList />} />
          <Route path="/artwork/:id" element={<Artwork />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Exhibition" element={<Exhibition />} />

          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
