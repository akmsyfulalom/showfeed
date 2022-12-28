import React from 'react';
import { Link } from 'react-router-dom';
import userImg from '../../Assets/user.png';
const Login = () => {
    return (
        <div>
            <h1 className="text-5xl text-center mt-5 mb-2 font-bold">ShowFeed</h1>
            <div className="hero ">

                <div className="hero-content flex-col  md:flex-row-reverse ">
                    <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <p className="text-2xl md:text-4xl text-center font-semibold">Login</p>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <Link to='' className="label-text-alt link link-hover">Forgot password?</Link>
                                </label>
                            </div>
                            <div className="form-control mt-2">
                                <button className="btn btn-primary no-animation">Login</button>
                            </div>
                            <div className='form-control '>
                                <button className="btn btn-outline btn-primary no-animation">Create New Account</button>
                            </div>

                        </div>

                    </div>

                    <div className="text-center lg:text-left invisible md:visible">

                        <div>
                            <img src={userImg} className="max-w-md" alt="" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;