import { createBrowserRouter } from "react-router";
import Protected from "./features/auth/components/protected";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import { InterviewProvider } from "./features/interview/interview.context";
import Home from "./features/interview/pages/Home";
import InterviewReport from "./features/interview/pages/interview";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><InterviewProvider><Home /></InterviewProvider></Protected>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/interview/:interviewId",
        element: <Protected><InterviewProvider><InterviewReport /></InterviewProvider></Protected>
    }
])