import { useContext } from "react";
import styles from "./../css/Signup.module.css";
import AppContext from "../AppContext";

export default function Signup({ handleSignupChange, handleSignup }) {
  const context = useContext(AppContext);

  return (
    <div className={styles.Signup}>
      <p>Sign up</p>
      <p className={styles.error}>{context.signupError}</p>
      <input
        name="username"
        type="text"
        value={context.username}
        onChange={handleSignupChange}
        placeholder="enter username"
      />
      <input
        name="password"
        type="password"
        value={context.password}
        onChange={handleSignupChange}
        placeholder="enter password"
      />
      <button className={styles.signupButton} onClick={handleSignup}>
        Submit
      </button>
    </div>
  );
}
