import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import userImg from '../../Assets/user.png';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import SignUp from '../SignUp/SignUp';
const Login = () => {
    const { userLogin } = useContext(AuthContext);
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        setLoginError('')
        userLogin(email, password)
            .then((result) => {
                const user = result.user;
                toast.success('successfully login now')
                console.log(user)
                navigate('/')
            })
            .catch(err => {
                console.error(err)
                setLoginError(err.message)
            })
    }
    return (
        <div>
            <h1 className="text-5xl text-center mt-5 mb-2 font-bold">ShowFeed</h1>
            <div className="hero ">

                <div className="hero-content flex-col  md:flex-row-reverse ">
                    <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <p className="text-2xl md:text-4xl text-center font-semibold">Login</p>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name='password' type="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <Link to='' className="label-text-alt link link-hover">Forgot password?</Link>
                                </label>
                            </div>
                            <div>
                                {loginError && <p className='text-red-600'>{loginError}</p>}
                            </div>
                            <div className="form-control mt-2">
                                <button type='submit' className="btn btn-primary no-animation">Login</button>
                            </div>
                            <div className='form-control '>

                                <label htmlFor="sign-up-modal" className="btn btn-outline btn-primary no-animation">Create New Account</label>
                            </div>

                        </form>

                    </div>

                    <div className="text-center lg:text-left invisible md:visible">

                        <div>
                            <img src={userImg} className="max-w-md" alt="" />
                        </div>
                    </div>

                </div>
            </div>
            <SignUp></SignUp>
        </div>
    );
};

export default Login;