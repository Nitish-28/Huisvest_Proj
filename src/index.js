import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './views/Home';
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";
import './index.css'
import  { Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TokenProvider } from "./ctx/TokenContext";
import PrivateRoute from "./ctx/Authorization";
import Details from "./views/Details";

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
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="details/:id" element={<Details />} />

        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
    </TokenProvider>

  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);