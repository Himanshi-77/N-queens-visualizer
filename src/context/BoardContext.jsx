import React, { createContext, useContext, useState } from 'react';

const BoardContext = createContext();
export const useBoard = () => useContext(BoardContext);

export const BoardProvider = ({ children }) => {
  const [n, setN] = useState(8);
  const [board, setBoard] = useState([]);
  const [speed, setSpeed] = useState(500); // in ms

  return (
    <BoardContext.Provider value={{ n, setN, board, setBoard, speed, setSpeed }}>
      {children}
    </BoardContext.Provider>
  );
};