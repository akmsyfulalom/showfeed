import React from 'react';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useUser from '../../Hooks/useUser/useUser';
import Login from '../../Login/Login/Login';
import Footer from '../../Pages/Shared/Footer/Footer';
import Navbar from '../../Pages/Shared/Navbar/Navbar';

const Main = () => {
    const { user } = useContext(AuthContext);
    const [isUser] = useUser(user?.email);
    return (
        <div>
            {
                isUser && <>
                    <Navbar />
                    <Outlet />
                    <Footer />
                </>
            }
            {
                !isUser && < Login />
            }
        </div >
    );
};

export default Main;