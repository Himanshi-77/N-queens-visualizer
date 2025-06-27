import React, { useEffect, useState, useRef } from 'react';
import { useBoard } from '../context/BoardContext';
import '../styles/Visualizer.css';

const Visualizer = () => {
  const { n } = useBoard();
  const [board, setBoard] = useState([]);
  const [statusMessages, setStatusMessages] = useState([]);
  const logEndRef = useRef(null);

  useEffect(() => {
    if (n) {
      const initialBoard = Array.from({ length: n }, () => Array(n).fill(0));
      setBoard(initialBoard);
      addStatusMessage(`Solving ${n}×${n} board...`);
      runSolver(initialBoard);
    }
  }, [n]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [statusMessages]);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const addStatusMessage = (msg) => {
    setStatusMessages((prev) => [...prev, msg]);
  };

  const runSolver = async (b) => {
    await solveNQueens(b, 0);
    addStatusMessage('All possible arrangements tried.');
  };

  const isSafe = (b, row, col) => {
    for (let i = 0; i < row; i++) if (b[i][col]) return false;
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) if (b[i][j]) return false;
    for (let i = row, j = col; i >= 0 && j < n; i--, j++) if (b[i][j]) return false;
    return true;
  };

  const solveNQueens = async (b, row) => {
    if (row === n) {
      addStatusMessage('Found valid arrangement!');
      await delay(2000);
      return false;
    }

    for (let col = 0; col < n; col++) {
      addStatusMessage(`Trying position (${row}, ${col})...`);
      if (isSafe(b, row, col)) {
        b[row][col] = 1;
        setBoard([...b.map(row => [...row])]);
        await delay(700);

        const found = await solveNQueens(b, row + 1);
        if (found) return true;

        b[row][col] = 0;
        setBoard([...b.map(row => [...row])]);
        addStatusMessage(`Backtracking from (${row}, ${col})...`);
        await delay(700);
      }
    }
    return false;
  };

  return (
    <div className="visualizer-wrapper">
      <div className="visualizer-container">
        <h2>{n} × {n} Chessboard</h2>
        <div className="board">
          {board.map((row, i) => (
            <div className="row" key={i}>
              {row.map((cell, j) => (
                <div
                  key={j}
                  className={`cell ${(i + j) % 2 === 0 ? 'light' : 'dark'}`}
                >
                  {cell ? <span className="queen">♕</span> : ''}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="status-panel-box">
        <h3>Steps</h3>
        <div className="status-log-box">
          {statusMessages.map((msg, idx) => (
            <div key={idx} className="status-message">{msg}</div>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>
    </div>
  );
};

export default Visualizer;