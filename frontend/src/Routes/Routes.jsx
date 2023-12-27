import { createBrowserRouter } from "react-router-dom";

import Main from "../Layout/Main";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Todo from "../Pages/Todo";
import Users from "../Pages/Users";
import Home from "../pages/Home";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/todo",
        element: (
          <PrivateRoute>
            <Todo />
          </PrivateRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
