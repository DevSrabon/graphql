import { createBrowserRouter } from "react-router-dom";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import Todo from "../Components/Todo";
import Main from "../Layout/Main";
import Home from "../pages/Home";
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
        path: "*",
        element: (
          <PrivateRoute>
            <Todo />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
