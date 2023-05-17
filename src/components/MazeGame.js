import React, { useState, useEffect } from "react";
import Maze from "./Maze";
import './styles/MazeGame.css'
import Cronometro from "./Cronometro";

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
    [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1],
  ];

  const [playerPosition, setPlayerPosition] = useState({
    row: 0,
    column: 1,
  });

  const [destinoAlcancado, setDestinoAlcancado] = useState(false);
  const [isMazeCompleted, setIsMazeCompleted] = useState(false);
  const [distances, setDistances] = useState([]);
  const [shortestPath, setShortestPath] = useState([]);
  const [foundShortestPath, setFoundShortestPath] = useState(false);
  const [pathSquares, setPathSquares] = useState([]);
  const [visitedSquares, setVisitedSquares] = useState([]);
  const [hasVisitedGoal, setHasVisitedGoal] = useState(false);
  const [userPath, setUserPath] = useState([]);

  useEffect(() => {
    const shortestPath = dijkstra(maze, playerPosition);
    setDistances(shortestPath);

    const pathSquares = shortestPath.map((path) => `${path.row}-${path.column}`);
    setPathSquares(pathSquares);

    const reachedGoal = playerPosition.row === 9 && playerPosition.column === 41;
    if (reachedGoal) {
      setFoundShortestPath(true);
    }
  }, [maze, playerPosition]);

  useEffect(() => {
    const shortestPath = calculateShortestPath();
    setShortestPath(shortestPath);

    const pathSquares = shortestPath.map((path) => `${path.row}-${path.column}`);
    setPathSquares(pathSquares);

    const reachedGoal = playerPosition.row === 9 && playerPosition.column === 41;
    if (reachedGoal) {
      setFoundShortestPath(true);
    }
  }, [maze, playerPosition]);

  useEffect(() => {
    const reachedGoal = playerPosition.row === 9 && playerPosition.column === 41;
    if (reachedGoal) {
      if (hasVisitedGoal) {
        setIsMazeCompleted(true);
      } else {
        setIsMazeCompleted(true);
        setHasVisitedGoal(true);
      }
    }
  }, [playerPosition, hasVisitedGoal]);
  

  const calculateShortestPath = () => {
    const start = { row: 0, column: 1 };
    const goal = { row: 9, column: 41 };
  
    const visited = new Set();
    const distances = Array.from({ length: maze.length }, () =>
      Array(maze[0].length).fill(Infinity)
    );
    const previous = Array.from({ length: maze.length }, () =>
      Array(maze[0].length).fill(null)
    );
  
    distances[start.row][start.column] = 0;
  
    while (true) {
      let minDistance = Infinity;
      let current = null;
  
      // Find the unvisited square with the minimum distance
      for (let row = 0; row < maze.length; row++) {
        for (let column = 0; column < maze[row].length; column++) {
          if (!visited.has(`${row}-${column}`) && distances[row][column] < minDistance) {
            minDistance = distances[row][column];
            current = { row, column };
          }
        }
      }
  
      if (current === null) {
        break;
      }
  
      visited.add(`${current.row}-${current.column}`);
  
      const neighbors = getNeighbors(current);
      for (const neighbor of neighbors) {
        const { row, column } = neighbor;
  
        if (
          row >= 0 &&
          row < maze.length &&
          column >= 0 &&
          column < maze[0].length &&
          !visited.has(`${row}-${column}`) &&
          maze[row][column] === 0
        ) {
          const distance = distances[current.row][current.column] + 1;
          if (distance < distances[row][column]) {
            distances[row][column] = distance;
            previous[row][column] = current;
          }
        }
      }
    }
  
    const shortestPath = [];
    let current = goal;
  
    while (current !== null) {
      shortestPath.unshift(current);
      current = previous[current.row][current.column];
    }
  
    return shortestPath;
  };
  
  const getNeighbors = ({ row, column }) => {
    return [
      { row: row - 1, column }, // Up
      { row: row + 1, column }, // Down
      { row, column: column - 1 }, // Left
      { row, column: column + 1 }, // Right
    ];
  };
  

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
        setPlayerPosition((prev) => {
          const newRow = prev.row - 1;
          if (
            newRow >= 0 &&
            maze[newRow][prev.column] === 0
          ) {
            const newPosition = {
              ...prev,
              row: newRow,
            };
            checkGoalReached(newPosition);
            return newPosition;
          }
          return prev;
        });
        break;
      case "ArrowDown":
        setPlayerPosition((prev) => {
          const newRow = prev.row + 1;
          if (
            newRow < maze.length &&
            maze[newRow][prev.column] === 0
          ) {
            const newPosition = {
              ...prev,
              row: newRow,
            };
            checkGoalReached(newPosition);
            return newPosition;
          }
          return prev;
        });
        break;
      case "ArrowLeft":
        setPlayerPosition((prev) => {
          const newColumn = prev.column - 1;
          if (
            newColumn >= 0 &&
            maze[prev.row][newColumn] === 0
          ) {
            const newPosition = {
              ...prev,
              column: newColumn,
            };
            checkGoalReached(newPosition);
            return newPosition;
          }
          return prev;
        });
        break;
      case "ArrowRight":
        setPlayerPosition((prev) => {
          const newColumn = prev.column + 1;
          if (
            newColumn < maze[0].length &&
            maze[prev.row][newColumn] === 0
          ) {
            const newPosition = {
              ...prev,
              column: newColumn,
            };
            checkGoalReached(newPosition);
            return newPosition;
          }
          return prev;
        });
        break;
      default:
        break;
    }
  };
  
  const checkGoalReached = (position) => {
    const reachedGoal = position.row === 9 && position.column === 41;
    if (reachedGoal) {
      if (hasVisitedGoal) {
        setIsMazeCompleted(true);
      } else {
        setIsMazeCompleted(true);
        setHasVisitedGoal(true);
        setDestinoAlcancado(true);
      }
    }
  };
  
  return (
    <div className="maze-game" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="maze-container">
        <Maze
          maze={maze}
          playerPosition={playerPosition}
          isMazeCompleted={isMazeCompleted}
          shortestPath={shortestPath}
        />
      </div>
      {isMazeCompleted && !foundShortestPath && (
        <span className="message">
          Parabéns! Você concluiu o labirinto, mas não com o menor caminho!
        </span>
      )}
      {isMazeCompleted && foundShortestPath && (
        <alert className="message">
          Parabéns! Você concluiu o labirinto. O caminho rosa é o caminho mais curto.<br/>
          Compare o seu caminho com o menor caminho para melhorar o seu tempo na próxima.
        </alert>
        
      )}
      <div className={`cronometro ${destinoAlcancado ? 'cronometro-border-color' : '#56CCF2'}`}>
        <Cronometro destino={{ alcancado: destinoAlcancado }} />
      </div>
    </div>
  );
}