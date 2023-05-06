import React from "react";
import './styles/Maze.css'

function Maze({ maze, playerPosition }) {
    const mazeRows = maze.map((mazeRow, rowIndex) => {
        const mazeCells = mazeRow.map((mazeCell, columnIndex) => {
            const isPlayer = rowIndex === playerPosition.row && columnIndex === playerPosition.column;

            return (
                <div
                    key={`${rowIndex}-${columnIndex}`}
                    style={{
                        width: "30px",
                        height: "30px",
                        backgroundColor: isPlayer ? "#0E294B" : mazeCell === 0 ? "#F2F2F2" : "#222",
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