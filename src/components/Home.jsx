import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoard } from '../context/BoardContext';
import '../styles/Home.css';

const Home = () => {
  const [inputN, setInputN] = useState(8);
  const { setN } = useBoard();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputN < 1 || inputN > 20) {
      alert('Please enter a number between 1 and 20');
      return;
    }
    setN(parseInt(inputN));
    navigate('/visualizer');
  };

  return (
    <div className="home-container">
      <div className="card">
        <h1 className="title">N-Queens Visualizer</h1>
        <p className="subtitle">Visualize the N-Queens problem in real time using backtracking!</p>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="number"
            min="1"
            max="20"
            value={inputN}
            onChange={(e) => setInputN(e.target.value)}
            placeholder="Enter number of queens"
            className="input"
          />
          <button type="submit" className="button">Start Visualization</button>
        </form>
      </div>
    </div>
  );
};

export default Home;