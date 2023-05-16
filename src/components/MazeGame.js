import React, { useState, useEffect } from "react";
import Maze from "./Maze";
import "./styles/MazeGame.css";

export default function MazeGame() {

  const maze = [
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 2],
    [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
  ];

  const [playerPosition, setPlayerPosition] = useState({
    row: 0,
    column: 1,
  });
  const [isMazeCompleted, setIsMazeCompleted] = useState(false);
  const [distances, setDistances] = useState([]);
  const [shortestPath, setShortestPath] = useState([]);
  const [foundShortestPath, setFoundShortestPath] = useState(false);
  const [pathSquares, setPathSquares] = useState([]);

  useEffect(() => {
    const shortestPath = dijkstra(maze, playerPosition);
    setDistances(shortestPath);

    const pathSquares = shortestPath.map((path) => `${path.row}-${path.column}`);
    setPathSquares(pathSquares);
  }, [maze, playerPosition]);


  const dijkstra = (maze, start) => {
    const visited = new Set();
    const queue = [[start.row, start.column, 0]];
    const shortestPath = [];

    while (queue.length > 0) {
      const [row, column, distance] = queue.shift();
      const key = `${row},${column}`;

      if (visited.has(key)) continue;
      visited.add(key);

      shortestPath.push({ row, column, distance });

      // Check neighboring cells
      const neighbors = [
        [row - 1, column], // Up
        [row + 1, column], // Down
        [row, column - 1], // Left
        [row, column + 1], // Right
      ];

      for (const [nextRow, nextColumn] of neighbors) {
        if (
          nextRow >= 0 &&
          nextRow < maze.length &&
          nextColumn >= 0 &&
          nextColumn < maze[0].length &&
          !visited.has(`${nextRow},${nextColumn}`)
        ) {
          if (maze[nextRow][nextColumn] === 0) {
            queue.push([nextRow, nextColumn, distance + 1]);
          }
        }
      }      
    }

    return shortestPath;
  };


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

    const currentDistance = distances.find(
      (d) =>
        d && d.row === playerPosition.row && d.column === playerPosition.column
    );
  
    const distanceToGoal = currentDistance ? currentDistance.distance : undefined;
  
    if (
      distanceToGoal === shortestPath[shortestPath.length - 1]?.distance &&
      playerPosition.row === 9 &&
      playerPosition.column === 41
    ) {
      alert(
        "Parabéns! Você encontrou o menor caminho possível e concluiu o labirinto!"
      );
    } else if (distanceToGoal === shortestPath[shortestPath.length - 1]?.distance) {
      alert("Parabéns! Você encontrou o menor caminho possível!");
    } else if (playerPosition.row === 9 && playerPosition.column === 41) {
      alert("Parabéns! Você concluiu o labirinto!");
    }

  };

  const handleMazeCompleted = () => {
    setIsMazeCompleted(true);
  };

  return (
    <div className="maze-game" onKeyDown={handleKeyDown} tabIndex="0">
      {isMazeCompleted ? (
        <span className="maze-completed">
          {foundShortestPath
            ? "Labirinto concluído e menor caminho encontrado!"
            : "Labirinto concluído!"}
        </span>
      ) : (
        <div>
          <div style={{ display: "flex" }}>
            <Maze
              maze={maze}
              playerPosition={playerPosition}
              handleMazeCompleted={handleMazeCompleted}
              pathSquares={pathSquares}
            />
          </div>
        </div>
      )}
    </div>
  );
}