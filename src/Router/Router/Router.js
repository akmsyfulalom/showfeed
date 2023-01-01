import { createBrowserRouter } from "react-router-dom";
import FrontLayout from "../../Layout/FrontLayout/FrontLayout";
import Main from "../../Layout/MainLayout/Main";
import Feedback from "../../Pages/Conpany/Feedback/Feedback";
import PrivacyPolicy from "../../Pages/Conpany/PrivacyPolicy/PrivacyPolicy";
import Support from "../../Pages/Conpany/Support/Support";
import Home from "../../Pages/Home/Home";
import Message from "../../Pages/Message/Message";
import PopularPosts from "../../Pages/PopularPosts/PopularPosts";
import PostView from "../../Pages/PostCard/PostView/PostView";
import About from "../../Pages/UserInfo/About/About";
import MyProfile from "../../Pages/UserInfo/MyProfile/MyProfile";
import PrivateRouter from "./PrivateRouter/PrivateRouter";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <PrivateRouter><Home /></PrivateRouter>
            },
            {
                path: "/popularPosts",
                element: <PrivateRouter><PopularPosts></PopularPosts></PrivateRouter>
            },
            {
                path: "/message",
                element: <PrivateRouter><Message></Message></PrivateRouter>
            },
            {
                path: "/profile",
                element: <PrivateRouter><MyProfile></MyProfile></PrivateRouter>
            },
            {
                path: "/about",
                element: <PrivateRouter><About></About></PrivateRouter>
            },
            {
                path: "/feedback",
                element: <PrivateRouter><Feedback></Feedback></PrivateRouter>
            },
            {
                path: "/support",
                element: <PrivateRouter><Support></Support></PrivateRouter>
            },
            {
                path: "/privacyPolicy",
                element: <PrivateRouter><PrivacyPolicy></PrivacyPolicy></PrivateRouter>
            },
            {
                path: '/post/:id',
                element: <PrivateRouter><PostView></PostView></PrivateRouter>,
                loader: ({ params }) => fetch(`https://showfeed-server.vercel.app/post/${params.id}`),

            }

        ]
    },
    {
        path: "/login",
        element: <FrontLayout></FrontLayout>,

    },
    {
        path: "/dashboard",
    }
])