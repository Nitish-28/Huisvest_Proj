import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard'; // Dashboard layout
import MyHouses from './views/MyHouses';   // Dynamic content components
import Biddings from './views/Biddings';
import OutgoingBiddings from './views/OutgoingBiddings';
import Profile from './views/Profile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Wrap all dynamic content inside the Dashboard layout */}
        <Route path="/" element={<Dashboard />}>
          <Route path="MyHouses" element={<MyHouses />} />
          <Route path="Biddings" element={<Biddings />} />
          <Route path="OutgoingBiddings" element={<OutgoingBiddings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;