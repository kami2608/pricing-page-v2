import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { lazy, Suspense } from "react";

const TodoApp = lazy(() => import("./pages/TodoApp"));
const Login = lazy(() => import("./pages/Login"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" loader={() => redirect("/login")} />
      <Route
        path="/login"
        element={
          <Suspense fallback={<p>Loading....</p>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/home"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <ProtectedRoute>
              <TodoApp />
            </ProtectedRoute>
          </Suspense>
        }
      />
    </>,
  ),
);
