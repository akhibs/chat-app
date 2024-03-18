import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./../css/Dm.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import AppContext from "../AppContext";
import Messages from "./Messages";
import { settings } from "../settings";

export default function Dm() {
  const [message, setMessage] = useState("");
  const [recievedMessage, setRecievedMessage] = useState([]);
  const { user } = useParams();
  const navigate = useNavigate();
  const context = useContext(AppContext);

  const handleSendButton = useCallback(() => {
    //function to send message

    if (message.length > 0) {
      setRecievedMessage((e) => [...e, `${message}S`]);
      const socket = io(
        `${settings.mode === "development" ? "http://127.0.0.1:3001" : ""}`
      );
      socket.emit("newMessage", {
        from: context.username,
        to: user,
        message: message,
      });

      setMessage("");
    }
  }, [context.username, message, user]);

  function handleBackButton() {
    //handles button that goes back to home
    navigate("/");
  }

  function handleMessageInput(e) {
    //handles message input box
    setMessage(e.target.value);
  }

  useEffect(() => {
    const socket = io(
      `${settings.mode === "development" ? "http://127.0.0.1:3001" : ""}`
    );
    socket.on(`${context.username}`, (arg) => {
      setRecievedMessage((e) => [...e, `${arg.message}R`]);
    });

    return () => {
      socket.disconnect();
    };
  }, [context.username]);

  return (
    <div className={styles.Dm}>
      <div className={styles.userStatus}>
        <p className={styles.backButton} onClick={handleBackButton}>
          ◀
        </p>
        <p className={styles.user}>🟢 {user}</p>
      </div>

      <div className={styles.messagesBox}>
        {recievedMessage.map((el, index) => {
          return <Messages key={index} mess={el} />;
        })}
      </div>
      <div className={styles.senderBox}>
        <input
          className={styles.messageInput}
          type="text"
          onChange={handleMessageInput}
          value={message}
        />
        <button className={styles.sendButton} onClick={handleSendButton}>
          ▶
        </button>
      </div>
    </div>
  );
}
