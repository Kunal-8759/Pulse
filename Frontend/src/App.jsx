import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import { NightParticles } from './NightParticles';
import Home from './pages/home/Home';
import Task from './pages/task/Task';


function App() {
  return (


<div className="app-root ">
  <NightParticles />

  <div className=''>
  <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Task />} />
      </Routes>
    </Router>
  </div>
</div>

  );
}

export default App;
