import styles from "./../css/UsersOnline.module.css";
import AppContext from "../AppContext";
import { useContext, useState } from "react";
import UserOnline from "./UserOnline";
import { useNavigate } from "react-router-dom";

export default function UsersOnline() {
  const context = useContext(AppContext);
  const [currentChat, setCurrentChat] = useState("");
  const navigate = useNavigate();

  function handleUserOnlineClick(e) {
    console.log(e.target.id);
    setCurrentChat(e.target.id);
    navigate(`/${currentChat}`);
  }

  return (
    <div className={styles.UsersOnline}>
      {context.usersOnline.map((el) => {
        if (context.username === el) {
          return;
        }
        return (
          <UserOnline
            key={el}
            username={el}
            handleUserOnlineClick={handleUserOnlineClick}
          />
        );
      })}
    </div>
  );
}
