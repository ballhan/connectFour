import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import classNames from "classnames";

import styles from "./Join.module.css";

const Join = () => {
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
            className={classNames({
              [styles.joinInput]: true,
              [styles.mt20]: true,
            })}
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          className={styles.buttonText}
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/main?name=${name}&room=${room}`}
        >
          <Button
            variant="contained"
            color="secondary"
            className={classNames({
              [styles.button]: true,
              [styles.mt20]: true,
            })}
            type="submit"
          >
            play
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
