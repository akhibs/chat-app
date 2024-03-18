import styles from "./../css/UsersOnline.module.css";
import AppContext from "../AppContext";
import { useContext } from "react";
import UserOnline from "./UserOnline";

export default function UsersOnline() {
  const context = useContext(AppContext);

  return (
    <div className={styles.UsersOnline}>
      {context.usersOnline.map((el) => {
        if (context.username === el) {
          return;
        }
        return <UserOnline key={el} username={el} />;
      })}
    </div>
  );
}
