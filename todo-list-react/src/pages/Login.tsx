import { useAuth0 } from "@auth0/auth0-react";
import Button from "../components/Button";
import AuthRoute from "./AuthRoute";

export default function Login() {
  const {
    loginWithPopup: login, // Starts the login flow// User profile
  } = useAuth0();

  const signup = () =>
    login({
      authorizationParams: {
        screen_hint: "signup",
        prompt: "login",
      },
    });
  return (
    <>
      <AuthRoute />
      <h1>Login</h1>
      <Button title="Signup" handleClick={signup} />

      <Button title="Login" handleClick={login} />
    </>
  );
}
