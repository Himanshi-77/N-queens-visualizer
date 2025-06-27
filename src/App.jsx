import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Visualizer from './components/Visualizer';
import { BoardProvider } from './context/BoardContext';

const App = () => {
  return (
    <BoardProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visualizer" element={<Visualizer />} />
        </Routes>
      </Router>
    </BoardProvider>
  );
};

export default App;