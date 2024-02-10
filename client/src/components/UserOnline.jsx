import styles from "./../css/UserOnline.module.css";

export default function UserOnline({ username, handleUserOnlineClick }) {
  return (
    <div
      className={styles.UserOnline}
      onClick={handleUserOnlineClick}
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
