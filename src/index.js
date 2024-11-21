import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";
import "./index.css";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TokenProvider } from "./ctx/TokenContext";
import PrivateRoute from "./ctx/Authorization";
import Details from "./views/Details";
import Bids from "./views/Bids";
import Profile from "./components/Profile";
import Saved from "./views/Saved";

import EditProfile from "./components/EditProfile";

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteSeller from "./components/ProtectedRouteSeller";

export default function App() {
  return (
    <TokenProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRouteSeller>
                  <Dashboard />
                </ProtectedRouteSeller>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="details/:id" element={<Details />} />

            <Route path="saves" element={<ProtectedRoute><Saved /></ProtectedRoute>} />


            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="bids" element={<ProtectedRoute><Bids /></ProtectedRoute>} />

          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </TokenProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
