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
import AddArtist from "./Components/admin/AddArtist";
import AddEvent from "./Components/admin/AddEvent";
import AddPaintings from "./Components/admin/AddPaintings";
import AdminHome from "./Components/admin/AdminHome";
import Artist from "./Components/admin/Artist";
import ArtworkTable from "./Components/admin/Artwork";
import EditArtist from "./Components/admin/EditArtist";
import Events from "./Components/admin/Events";
import OrderList from "./Components/admin/OrderList";
import PaymentList from "./Components/admin/PaymentList";
import EditArtwork from "./Components/admin/EditArtwork";
import EditEvents from "./Components/admin/EditEvents";

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
            <Route
              path="/adminhome"
              element={
                authCtx.isAdmin ? (
                  <AdminHome />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/addpaintings"
              element={
                authCtx.isAdmin ? (
                  <AddPaintings />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/artist"
              element={
                authCtx.isAdmin ? <Artist /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/addartist"
              element={
                authCtx.isAdmin ? (
                  <AddArtist />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/editartist/:artist_id"
              element={
                authCtx.isAdmin ? (
                  <EditArtist />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/admin/artworks"
              element={
                authCtx.isAdmin ? (
                  <ArtworkTable />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/editartwork/:art_id"
              element={
                authCtx.isAdmin ? (
                  <EditArtwork />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/events"
              element={
                authCtx.isAdmin ? <Events /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/addevent"
              element={
                authCtx.isAdmin ? (
                  <AddEvent />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/editevents/:id"
              element={
                authCtx.isAdmin ? (
                  <EditEvents />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/orderlist"
              element={
                authCtx.isAdmin ? (
                  <OrderList />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/paymentlist"
              element={
                authCtx.isAdmin ? (
                  <PaymentList />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </ExhibitionCartProvider>
  );
}

export default App;
