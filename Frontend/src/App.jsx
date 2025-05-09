import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import { NightParticles } from './NightParticles';
import Home from './pages/home/Home';
import Task from './pages/task/Task';
import Contests from './pages/contest/Contests';


function App() {
  return (


<div className="app-root ">
  <NightParticles />

  <div className=''>
  <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/contests" element={<Contests />} />
      </Routes>
    </Router>
  </div>
</div>

  );
}

export default App;
