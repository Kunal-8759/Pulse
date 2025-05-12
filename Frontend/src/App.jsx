import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import { NightParticles } from './NightParticles';
import Home from './pages/home/Home';
import AccountIntegration from './pages/setting/AccountIntegration';
import Task from './pages/task/Task';
import Contests from './pages/contest/Contests';
import Hackathons from './pages/hackathon/Hackathons';
import Navbar from './components/Navbar/Navbar';


function App() {
  return (


<div className="app-root ">
  <NightParticles />
  <Navbar />

  <div className=''>
  <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<AccountIntegration />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/contests" element={<Contests />} />
        <Route path="/hackathons" element={<Hackathons />} />
      </Routes>
    </Router>
  </div>
</div>

  );
}

export default App;
