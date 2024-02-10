import styles from "./../css/Home.module.css";

export default function Home({ handleLoginPage, handleSignupPage }) {
  return (
    <div className={styles.Home}>
      <p className={styles.welcome}>welcome</p>
      <p className={styles.smiley}>🙂</p>
      <button className={styles.login} onClick={handleLoginPage}>
        Log In
      </button>
      <button className={styles.signup} onClick={handleSignupPage}>
        Sign Up
      </button>
    </div>
  );
}
