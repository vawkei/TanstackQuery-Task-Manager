// import MockApp from "./MockApp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
// import UserForm from "./components/user-form/UserForm";
import AuthPage from "./pages/AuthPage";
import TaskFormPage from "./pages/TaskFormPage";
import TaskListPage from "./pages/TaskListPage";
import {ProtectedRoute} from "./components/auth/protected/Protected";
import EditTaskPage from "./pages/EditTaskPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/auth-form", element: <AuthPage /> },
        {
          path: "/task-form",
          element: (
            <ProtectedRoute>
              <TaskFormPage />
            </ProtectedRoute>
          ),
        },

        {
          path: "/task-list",
          element: (
            <ProtectedRoute>
              <TaskListPage />
            </ProtectedRoute>
          ),
        },
        {
          path:"/task-list/:id",
          element:(
            <ProtectedRoute>
              <EditTaskPage />
            </ProtectedRoute>
          )
        }
        // { path: "/user-form", element: <UserForm /> },
      ],
    },
  ]);

  return (
    <>
      {/* <MockApp /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
