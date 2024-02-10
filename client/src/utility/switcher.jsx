import Home from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function switcher(
  mainPageSwitch,
  handleLoginPage,
  handleSignupPage,
  handleLoginChange,
  handleLogin,
  handleUsersOnline,
  handleSignupChange,
  handleSignup
) {
  let switched;

  if (mainPageSwitch === "home page") {
    switched = (
      <Home
        handleLoginPage={handleLoginPage}
        handleSignupPage={handleSignupPage}
      />
    );
  } else if (mainPageSwitch === "login page") {
    switched = (
      <Login
        handleLoginChange={handleLoginChange}
        handleLogin={handleLogin}
        handleUsersOnline={handleUsersOnline}
      />
    );
  } else if (mainPageSwitch === "signup page") {
    switched = (
      <Signup
        handleSignupChange={handleSignupChange}
        handleSignup={handleSignup}
      />
    );
  }

  return switched;
}
