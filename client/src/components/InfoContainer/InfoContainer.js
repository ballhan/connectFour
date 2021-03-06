import React from "react";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import styles from "./InfoContainer.module.css";

const InfoContainer = ({ room, users }) => (
  <div>
    <div className={styles.header}>Room {room}</div>
    {users ? (
      <div className={styles.userContainer}>
        {users.map(({ name, color }) => (
          <div key={(name, color)} className={styles.infoContainer}>
            <div>{name}</div>
            <div>
              <EmojiPeopleIcon
                className={styles.colorIcon}
                style={{ color: color }}
              ></EmojiPeopleIcon>
            </div>
          </div>
        ))}
      </div>
    ) : null}
  </div>
);

export default InfoContainer;
