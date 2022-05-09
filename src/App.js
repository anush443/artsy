import "./App.css";
import Home from "./pages/Home";

import ArtworkList from "./pages/ArtworkList";
import Artwork from "./pages/Artwork";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import CartProvider from "./Store/cartProvider";
import AuthContext from "./Store/auth-context";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Exhibition from "./pages/Exhibition";
import Profile from "./pages/Profile";
import { useContext } from "react";
import Admin from "./pages/Admin";
import CheckOut from "./pages/CheckOut";
import ExhibitionCartProvider from "./Store/exhibitionCartProvider";
//import { useSelector } from "react-redux";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <ExhibitionCartProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artworks/:category" element={<ArtworkList />} />
            <Route path="/artwork/:id" element={<Artwork />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Exhibition" element={<Exhibition />} />
            {!authCtx.isLoggedIn && <Route path="/login" element={<Login />} />}
            {!authCtx.isLoggedIn && (
              <Route path="/register" element={<Register />} />
            )}

            <Route
              path="/checkout"
              element={
                authCtx.isLoggedIn ? (
                  <CheckOut />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/profile"
              element={
                authCtx.isLoggedIn && !authCtx.isAdmin ? (
                  <Profile />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/admin"
              element={
                authCtx.isAdmin ? <Admin /> : <Navigate to="/login" replace />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </ExhibitionCartProvider>
  );
}

export default App;
