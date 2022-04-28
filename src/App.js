import "./App.css";
import Home from "./pages/Home";

import ArtworkList from "./pages/ArtworkList";
import Artwork from "./pages/Artwork";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Exhibition from "./pages/Exhibition";

function App() {
  const user = true;

  return (
    <>
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
    </>
  );
}

export default App;
