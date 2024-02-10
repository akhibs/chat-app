import { useContext, useEffect } from "react";
import styles from "./../css/MainChat.module.css";
import AppContext from "../AppContext";
import { io } from "socket.io-client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersOnline from "./UsersOnline";
import Dm from "./Dm";

export default function MainChat({ handleUsersOnline }) {
  const context = useContext(AppContext);

  useEffect(() => {
    const socket = io("http://127.0.0.1:3001");

    const online = setInterval(() => {
      socket.emit("userDetails", context.username);
      socket.on("usersOnline", (usersOnline) => {
        handleUsersOnline(usersOnline);
      });
    }, 10000);

    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();

      socket.emit("userOffline", context.username);
    });

    return () => {
      socket.disconnect();
      clearInterval(online);
    };
  }, [context.username, handleUsersOnline]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <UsersOnline />,
    },
    {
      path: "/:user",
      element: <Dm />,
    },
  ]);

  return (
    <div className={styles.MainChat} id="mainChat">
      <p className={styles.status}>
        welcome {context.username}
        {context.status}
      </p>
      <RouterProvider router={router} />
    </div>
  );
}
