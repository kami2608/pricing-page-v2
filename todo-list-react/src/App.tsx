import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "./components/Button";
import TodoApp from "./TodoApp";

function App() {
  const {
    isLoading, // Loading state, the SDK needs to reach Auth0 on load
    isAuthenticated,
    error,
    loginWithRedirect: login, // Starts the login flow// User profile
  } = useAuth0();

  const signup = () =>
    login({
      authorizationParams: {
        screen_hint: "signup",
        prompt: "login",
      },
    });


  if (isLoading) return "Loading...";

  return isAuthenticated ? (
    <TodoApp />
  ) : (
    <>
      {error && <p>Error: {error.message}</p>}

      <Button title="Signup" handleClick={signup} />

      <Button title="Login" handleClick={login} />
    </>
  );
}

export default App;
