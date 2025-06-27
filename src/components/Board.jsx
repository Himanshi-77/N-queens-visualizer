import React from 'react';
import { useBoard } from '../context/BoardContext';
import '../styles/Board.css';

const Board = () => {
  const { board } = useBoard();

  return (
    <div className="board">
      {board.map((row, rowIdx) => (
        <div className="row" key={rowIdx}>
          {row.map((cell, colIdx) => {
            const isDark = (rowIdx + colIdx) % 2 === 1;
            return (
              <div
                key={colIdx}
                className={`cell ${isDark ? 'dark' : 'light'}`}
              >
                {cell === 1 && <span className="queen">♕</span>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;