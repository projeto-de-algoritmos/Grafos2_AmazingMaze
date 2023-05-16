import React, { useEffect } from "react";
import './styles/Maze.css';

function Maze({ maze, playerPosition, handleMazeCompleted }) {
    useEffect(() => {
        const { row, column } = playerPosition;
        if (maze[row][column] === 2) {
        handleMazeCompleted();
        }
    }, [maze, playerPosition, handleMazeCompleted]);
    const mazeRows = maze.map((mazeRow, rowIndex) => {
        const mazeCells = mazeRow.map((mazeCell, columnIndex) => {
            const isPlayer = rowIndex === playerPosition.row && columnIndex === playerPosition.column;
            const isEndCell = rowIndex === 9 && columnIndex === 41;

            return (
                <div
                    key={`${rowIndex}-${columnIndex}`}
                    style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: isPlayer ? "#56CCF2" : isEndCell ? "red" : mazeCell === 0 ? "#F2F2F2" : "#222",
                        border: "1px solid #56CCF2",
                        boxSizing: "border-box",
                    }}
                />
            );
        });

        return (
            <div key={rowIndex} style={{ display: "flex" }}>
                {mazeCells}
            </div>
        );
    });

    return <div>{mazeRows}</div>;
}

export default Maze;