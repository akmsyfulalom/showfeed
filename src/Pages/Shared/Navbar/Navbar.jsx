
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import Login from '../../../Login/Login/Login';

const Navbar = () => {
    const { user, LogOut } = useContext(AuthContext);
    console.log(user)
    const [loginUser, setLoinUser] = useState({})



    useEffect(() => {
        if (user?.email) {
            fetch(`https://showfeed-server.vercel.app/user/${user?.email}`)
                .then(res => res.json())
                .then(data => setLoinUser(data))

        }
    }, [user?.email])


    const menuItems = <>
        <li><Link to="/">My Feed</Link></li>

        <li><Link to="/popularPosts">Popular Posts</Link></li>
        <li><Link to="/message">Message</Link></li>


    </>

    const userInfoMenu = <>
        <li><Link to="/profile" >Profile</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>
        <li><Link to="/support">Support</Link></li>
        <li><Link to="/privacyPolicy">Privacy Policy</Link></li>

    </>

    const handleLogOut = () => {
        LogOut()
            .then(() => {

            })
            .then(error => console.log(error));
    }
    return (<>
        {
            user?.uid ? <>
                <div className='shadow-xl'>
                    <div className="navbar  container mx-auto">
                        <div className="navbar-start">
                            <div className="dropdown">
                                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                                </label>
                                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                    {menuItems}
                                </ul>
                            </div>
                            <Link href='' className="btn  no-animation text-xl">ShowFeed</Link>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                {menuItems}
                            </ul>
                        </div>
                        <div className="navbar-end">
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={loginUser?.photoURL} alt='' />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                                    {userInfoMenu}


                                    <button onClick={() => handleLogOut(user?.uid)}>LogOut</button>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </>
                :
                <>
                    <Login></Login>
                </>
        }

    </>
    );
};

export default Navbar;