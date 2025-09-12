import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { lazy, Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 10000,
      // gcTime: 2000,
    },
  },
});

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
  }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient;

const TodoApp = lazy(() => import("./pages/TodoApp"));
const Login = lazy(() => import("./pages/Login"));
const TodoListRTK = lazy(() => import("./pages/rtk/TodoListRTK"));
const TodoListRTKQuery = lazy(
  () => import("./pages/rtk-query/TodoListRTKQuery"),
);

const TodoListReactQuery = lazy(
  () => import("./pages/react-query/TodoListReactQuery"),
);

const PaginatedTodos = lazy(() => import("./pages/react-query/PaginatedTodos"));

const InfiniteTodos = lazy(() => import("./pages/react-query/InfiniteTodos"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" loader={() => redirect("/rtk")} />
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
      <Route
        path="/rtk"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <TodoListRTK />
          </Suspense>
        }
      />
      <Route
        path="/rtk-query"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <TodoListRTKQuery />
          </Suspense>
        }
      />
      <Route
        path="/react-query"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <QueryClientProvider client={queryClient}>
              <TodoListReactQuery />
            </QueryClientProvider>
          </Suspense>
        }
      />
      <Route
        path="/paginated-queries"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <QueryClientProvider client={queryClient}>
              <PaginatedTodos />
            </QueryClientProvider>
          </Suspense>
        }
      />
      <Route
        path="/infinite-queries"
        element={
          <Suspense fallback={<p>Loading...</p>}>
            <QueryClientProvider client={queryClient}>
              <InfiniteTodos />
            </QueryClientProvider>
          </Suspense>
        }
      />
    </>,
  ),
);
