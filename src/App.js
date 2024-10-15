import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MyHouses from './components/MyHouses'; // Import the content components
import Biddings from './components/Biddings';
import OutgoingBiddings from './components/OutgoingBiddings';
import Profile from './components/Profile';
import Details from './views/Details';

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard layout that wraps dynamic content */}
          <Route path="/" element={<Dashboard />}>
          {/* Nested routes inside the Dashboard */}
          <Route path="MyHouses" element={<MyHouses />} />
          <Route path="biddings" element={<Biddings />} />
          <Route path="OutgoingBiddings" element={<OutgoingBiddings />} />
          <Route path="profile" element={<Profile />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
