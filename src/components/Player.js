import React from "react";

function Player({ position }) {
    return (
        <div
            style={{
                position: "absolute",
                top: `${position.row * 30}px`,
                left: `${position.column * 30}px`,
                width: "30px",
                height: "30px",
                backgroundColor: "#f00",
                borderRadius: "50%",
            }}
        />
    );
}

export default Player;