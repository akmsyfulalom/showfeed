import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/MainLayout/Main";
import Login from "../../Login/Login/Login";
import Feedback from "../../Pages/Conpany/Feedback/Feedback";
import PrivacyPolicy from "../../Pages/Conpany/PrivacyPolicy/PrivacyPolicy";
import Support from "../../Pages/Conpany/Support/Support";
import Home from "../../Pages/Home/Home";
import Message from "../../Pages/Message/Message";
import PopularPosts from "../../Pages/PopularPosts/PopularPosts";
import About from "../../Pages/UserInfo/About/About";
import MyProfile from "../../Pages/UserInfo/MyProfile/MyProfile";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/popularPosts",
                element: <PopularPosts></PopularPosts>
            },
            {
                path: "/message",
                element: <Message></Message>
            },
            {
                path: "/profile",
                element: <MyProfile></MyProfile>
            },
            {
                path: "/about",
                element: <About></About>
            },
            {
                path: "/feedback",
                element: <Feedback></Feedback>
            },
            {
                path: "/support",
                element: <Support></Support>
            },
            {
                path: "/privacyPolicy",
                element: <PrivacyPolicy></PrivacyPolicy>
            },
            {
                path: "/login",
                element: <Login></Login>
            }
        ]
    },
    {
        path: "/dashboard",
    }
])