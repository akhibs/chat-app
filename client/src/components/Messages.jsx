import styles from "./../css/Messages.module.css";

export default function Messages({ mess }) {
  return (
    <p className={mess.at(-1) === "S" ? styles.MessageS : styles.MessageR}>
      {mess.slice(0, -1)}
    </p>
  );
}
