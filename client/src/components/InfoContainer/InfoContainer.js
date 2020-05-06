import React from "react";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import styles from "./InfoContainer.module.css";

const InfoContainer = ({ users }) => (
  <div>
    {users ? (
      <div className={styles.userContainer}>
        {users.map(({ name, color, turn }) => (
          <div key={(name, color, turn)} className={styles.infoContainer}>
            <div>{name}</div>
            <div>
              <Brightness1Icon
                className={styles.colorIcon}
                style={{ color: color }}
              ></Brightness1Icon>
            </div>
          </div>
        ))}
      </div>
    ) : null}
  </div>
);

export default InfoContainer;
