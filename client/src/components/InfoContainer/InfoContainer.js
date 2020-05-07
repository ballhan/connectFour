import React from "react";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import styles from "./InfoContainer.module.css";

const InfoContainer = ({ users }) => (
  <div>
    {users ? (
      <div className={styles.userContainer}>
        {users.map(({ name, color, turn }) => (
          <div key={(name, color, turn)} className={styles.infoContainer}>
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
