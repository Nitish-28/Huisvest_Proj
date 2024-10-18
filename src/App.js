import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./components/Home";
import MyHouses from "./components/MyHouses";
import Biddings from "./components/Biddings";
import OutgoingBiddings from "./components/OutgoingBiddings";
import Profile from "./components/Profile";
import Details from "./views/Details";

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard layout that wraps dynamic content */}
        <Route path="/" element={<Dashboard />}>
          {/* Nested routes inside the Dashboard */}
          <Route path="MyHouses" element={<MyHouses />} />
          <Route path="biddings" element={<Biddings />} />
          <Route path="/outgoingbiddings" element={<OutgoingBiddings />} />
          <Route path="/details/:id" element={<Details />} />
        </Route>

        {/* Home dropdown list routings */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="outgoingbiddings" element={<OutgoingBiddings />} />
      </Routes>
    </Router>
  );
}

export default App;
