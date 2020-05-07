import React from "react";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import Square from "../Square/Square";
import styles from "./Game.module.css";

class Game extends React.Component {
  renderSquare(i) {
    return <Square />;
  }

  render() {
    return (
      <div className={styles.container}>
        {/* <div className={styles.status}>{this.props.users[0].name}'s Turn</div>
        {/* {users ? ({users.map(({ name }) => (
          <div key={name} className={styles.status}>
            <div>{name}'s Turn</div>
          </div>
        ))}):null} */}{" "}
        */}
        <div className={styles.board}>
          <div className={styles.boardRow}>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
          </div>
          <div className={styles.boardRow}>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
          </div>
          <div className={styles.boardRow}>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
          </div>
          <div className={styles.boardRow}>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
          </div>
          <div className={styles.boardRow}>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
          </div>
          <div className={styles.boardRow}>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
            {this.renderSquare(2)}
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
