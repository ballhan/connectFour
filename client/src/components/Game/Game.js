import React from "react";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import Square from "../Square/Square";
import "./Game.css";

class Game extends React.Component {
  renderSquare(i) {
    return <Square />;
  }

  render() {
    return (
      <div className="board">
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
          {this.renderSquare(2)}
        </div>
      </div>
    );
  }
}

export default Game;
