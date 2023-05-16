import React, { useState, useEffect } from "react";
import Maze from "./Maze";
import './styles/MazeGame.css'

export default function MazeGame() {

  const maze = [
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 2],
    [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
  ];

  const [playerPosition, setPlayerPosition] = useState({
    row: 0,
    column: 1,
  });

  const [isMazeCompleted, setIsMazeCompleted] = useState(false);


  const handleKeyDown = (event) => {
    const { key } = event;

    switch (key) {
      case "ArrowUp":
        if (
          playerPosition.row > 0 &&
          maze[playerPosition.row - 1][playerPosition.column] === 0
        ) {
          setPlayerPosition((prev) => ({
            ...prev,
            row: prev.row - 1,
          }));
        }
        break;
      case "ArrowDown":
        if (
          playerPosition.row < maze.length - 1 &&
          maze[playerPosition.row + 1][playerPosition.column] === 0
        ) {
          setPlayerPosition((prev) => ({
            ...prev,
            row: prev.row + 1,
          }));
        }
        break;
      case "ArrowLeft":
        if (
          playerPosition.column > 0 &&
          maze[playerPosition.row][playerPosition.column - 1] === 0
        ) {
          setPlayerPosition((prev) => ({
            ...prev,
            column: prev.column - 1,
          }));
        }
        break;
      case "ArrowRight":
        if (
          playerPosition.column < maze[0].length - 1 &&
          maze[playerPosition.row][playerPosition.column + 1] === 0
        ) {
          setPlayerPosition((prev) => ({
            ...prev,
            column: prev.column + 1,
          }));
        }
        break;
      default:
        break;
    }
  };

  const { row, column } = playerPosition;
  if (row === 9 && column === 41) {
    alert("Parabéns! Você concluiu o labirinto!");
  }

  useEffect(() => {
    const { row, column } = playerPosition;
    if (maze[row][column] === 2) {
      setIsMazeCompleted(true);
    }
  }, [maze, playerPosition]);

  const handleMazeCompleted = () => {
    setIsMazeCompleted(true);
  };

  return (
    <div className="maze-game" onKeyDown={handleKeyDown} tabIndex="0">
      {isMazeCompleted ? (
        <span className="maze-completed">Labirinto concluído!</span>
      ) : (
        <div>
          <div style={{ display: "flex" }}>
            <Maze
              maze={maze}
              playerPosition={playerPosition}
              handleMazeCompleted={handleMazeCompleted}
            />
          </div>
        </div>
      )}
    </div>
  );
}