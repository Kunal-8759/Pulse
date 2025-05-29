import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import { NightParticles } from './NightParticles';
import Home from './pages/home/Home';
import AccountIntegration from './pages/setting/AccountIntegration';
import Task from './pages/task/Task';
import Contests from './pages/contest/Contests';
import Hackathons from './pages/hackathon/Hackathons';
import Navbar from './components/Navbar/Navbar';
import RevisionPreparation from './components/Revision/RevisionPreparation';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();


function App() {
  return (
      <QueryClientProvider client={queryClient}>
        
      <div className="app-root">
        <NightParticles />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<AccountIntegration />} />
          <Route path="/tasks" element={<Task />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/hackathons" element={<Hackathons />} />
          <Route path="/revision" element={<RevisionPreparation />} />
        </Routes>
      </div>
      </QueryClientProvider>
)}

export default App;
