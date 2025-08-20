import { useAuth0 } from "@auth0/auth0-react";
import Button from "../components/Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    isLoading,
    loginWithPopup: login, // Starts the login flow// User profile
  } = useAuth0();

  const signup = () =>
    login({
      authorizationParams: {
        screen_hint: "signup",
        prompt: "login",
      },
    });

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated]);

  if (isLoading) return "Loading...";
  return (
    <>
      <h1>Login</h1>
      <Button title="Signup" handleClick={signup} />

      <Button title="Login" handleClick={login} />
    </>
  );
}
