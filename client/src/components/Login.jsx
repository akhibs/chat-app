import { useContext, useEffect } from "react";
import styles from "./../css/Login.module.css";
import AppContext from "../AppContext";
import { io } from "socket.io-client";
import { settings } from "../settings";

export default function Login({
  handleLoginChange,
  handleLogin,
  handleUsersOnline,
}) {
  const context = useContext(AppContext);

  useEffect(() => {
    const loginButton = document.querySelector("#loginButton");
    const socket = io(
      `${settings.mode === "development" ? "http://127.0.0.1:3001" : "https://chat-app-socket-o58d.onrender.com"}`
    );

    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleLogin();
        socket.emit("userDetails", context.username);
        socket.on("usersOnline", (usersOnline) => {
          handleUsersOnline(usersOnline);
        });
        console.log("done");
      }
    });

    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      socket.emit("userDetails", context.username);
      socket.on("usersOnline", (usersOnline) => {
        handleUsersOnline(usersOnline);
      });
    });
    return () => {
      socket.disconnect();
    };
  }, [context.username, handleUsersOnline, handleLogin]);

  return (
    <div className={styles.Login}>
      <p>log in</p>
      <p className={styles.error}>{context.loginError}</p>
      <input
        name="username"
        type="text"
        value={context.username}
        onChange={handleLoginChange}
        placeholder=" enter username"
      />
      <input
        name="password"
        type="password"
        value={context.password}
        onChange={handleLoginChange}
        placeholder="enter password"
      />
      <button
        className={styles.loginButton}
        onClick={handleLogin}
        id="loginButton"
      >
        Log in{" "}
      </button>
    </div>
  );
}
