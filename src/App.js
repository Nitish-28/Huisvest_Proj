import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MyHouses from './components/MyHouses'; // Import the content components
import Biddings from './components/Biddings';
import OutgoingBiddings from './components/OutgoingBiddings';
import Profile from './components/Profile';
import Details from './views/Details'; // Assuming you have a Details page for more information

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your main routes */}
        <Route path="/" element={<Dashboard />}>
          {/* Nested routes under Dashboard */}
          <Route path="myhouses" element={<MyHouses />} />
          <Route path="biddings" element={<Biddings />} />
          <Route path="outgoingbiddings" element={<OutgoingBiddings />} />
          <Route path="profile" element={<Profile />} />
          {/* Add any other nested routes here */}
        </Route>
        {/* Other standalone routes */}
        <Route path="/details/:id" element={<Details />} /> {/* Example detail view */}
      </Routes>
    </Router>
  );
}

export default App;
