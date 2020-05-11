import React from "react";
import Cell from "../Cell/Cell";

// Row component
const Row = ({ row, play, player, firstPlayer, move, winner }) => {
  return (
    <tr>
      {row.map((cell, i) => (
        <Cell
          key={i}
          color={cell}
          columnIndex={i}
          play={play}
          player={player}
          firstPlayer={firstPlayer}
          move={move}
          winner={winner}
        />
      ))}
    </tr>
  );
};

export default Row;
