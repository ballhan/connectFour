import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import styles from "./Join.module.css";

export default function SignIn() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className={styles.joinOuterContainer}>
      <div className={styles.joinInnerContainer}>
        <h1 className={styles.heading}>4 in a Row</h1>
        <div>
          <input
            placeholder="Name"
            className={styles.joinInput}
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className={(styles.joinInput, styles.mt20)}
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/main?name=${name}&room=${room}`}
        >
          <Button
            variant="contained"
            color="primary"
            className={(styles.button, styles.mt20)}
            type="submit"
          >
            play
          </Button>
        </Link>
      </div>
    </div>
  );
}
