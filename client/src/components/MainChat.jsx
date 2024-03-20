import { useContext, useEffect } from "react";
import styles from "./../css/MainChat.module.css";
import AppContext from "../AppContext";
import { io } from "socket.io-client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersOnline from "./UsersOnline";
import Dm from "./Dm";
import { settings } from "../settings";

export default function MainChat({ handleUsersOnline }) {
  const context = useContext(AppContext);

  //===========USEEFFECT==============
  useEffect(() => {
    const socket = io(
      `${
        settings.mode === "development"
          ? "http://127.0.0.1:3001"
          : "https://chat-app-socket-o58d.onrender.com"
      }`
    );

    const online = setInterval(() => {
      socket.emit("userDetails", context.username);
      socket.on("usersOnline", (usersOnline) => {
        handleUsersOnline(usersOnline);
      });
    }, 3000);

    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();

      socket.emit("userOffline", context.username);
    });

    return () => {
      socket.disconnect();
      clearInterval(online);
    };
  }, [context.username, handleUsersOnline]);
  //=========================================

  //==============HANDLERS=============

  //==========router=========
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
      <RouterProvider router={router} />
    </div>
  );
}
