import { createBrowserRouter } from "react-router";
import Protected from "./features/auth/components/protected";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Home from "./features/home/pages/home";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Home /></Protected>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    }
])