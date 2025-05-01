import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import { NightParticles } from './NightParticles';
import Home from './pages/home/Home';


function App() {
  return (


<div className="app-root ">
  <NightParticles />

  <div className=''>
  <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  </div>
</div>

  );
}

export default App;
