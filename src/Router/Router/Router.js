import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/MainLayout/Main";
import Home from "../../Pages/Home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            }
        ]
    },
    {
        path: "/dashboard",
    }
])