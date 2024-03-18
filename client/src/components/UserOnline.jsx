import { useNavigate } from "react-router-dom";
import styles from "./../css/UserOnline.module.css";

export default function UserOnline({ username}) {
const navigate = useNavigate()


   function handleUserDm() {
     navigate(`/${username}`);
   }
  return (
    <div
      className={styles.UserOnline}
      onClick={handleUserDm}
      id={username}
      name={username}
    >
      <p className={styles.status} id={username}>
        🟢
      </p>
      <p className={styles.username} id={username}>
        {username}
      </p>
      <p className={styles.message} id={username}>
        message message message
      </p>
    </div>
  );
}
