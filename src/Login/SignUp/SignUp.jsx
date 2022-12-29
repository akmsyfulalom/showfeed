import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import './signup.css';

const SignUp = () => {
    const { createUser, user } = useContext(AuthContext)
    const [error, setError] = useState('')

    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const university = form.university.value;
        const address = form.address.value;
        const userRole = form.role.value;
        const profileImage = form.userProfileImage.files[0]

        console.log(name, email, password, university, address, profileImage, userRole)

        const formData = new FormData();
        formData.append('image', profileImage);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    const userInfo = {
                        displayName: name,
                        email: email,
                        photoURL: imageData.data.url,
                        university: university,
                        address: address,
                        role: userRole
                    }
                    fetch('http://localhost:5000/users', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(userInfo)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {

                                event.target.reset();
                                console.log(data);
                            }
                        })
                }
            })

        createUser(email, password)
            .then(result => {
                const user = result.user;
                form.reset();
                toast.success(' successfully created')
            })
            .catch(error => {
                console.error('Error:', error)
                setError(error.message)
            })

    }


    return (
        <form onSubmit={handleSignUp}>

            <input type="checkbox" id="sign-up-modal" className="modal-toggle" />
            <div className="modal modal-top sm:modal-middle ">
                <div className="modal-box">
                    <label htmlFor="sign-up-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="form-control">
                        <p className="text-xl md:text-2xl text-center font-semibold">Sign Up</p>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input name="name" type="text" required className="input input-bordered h-10" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name="email" type="email" required className="input input-bordered h-10" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name="password" type="password" required className="input input-bordered h-10" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">University</span>
                        </label>
                        <input name="university" type="text" required className="input input-bordered h-10" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input name="address" type="text" required className="input input-bordered h-10" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Profile Image</span>
                        </label>
                        <input name="userProfileImage" type="file" required className="file-input input_photo file-input-ghost border-w-0 h-10 pb-10 file-input-bordered  w-full   " />
                    </div>
                    <input name='role' hidden type="text" defaultValue='sfUser' />
                    <button className="modal-action flex justify-between">
                        <label type="submit" htmlFor="sign-up-modal" className="btn">Sign Up</label>
                    </button>
                    <p className="text-red-600">
                        {error}
                    </p>
                </div>
            </div>
        </form>
    );
};

export default SignUp;