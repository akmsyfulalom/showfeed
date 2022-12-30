import React from 'react';
import { useState } from 'react';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { useEffect } from 'react';




const PostModal = () => {
    const { user } = useContext(AuthContext)
    const [postTime] = useState(new Date());
    const [loginUser, setLoginUser] = useState({});


    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/user/${user?.email}`)
                .then(res => res.json())
                .then(data => setLoginUser(data))
        }
    }, [user?.email])


    const imgHostKey = process.env.REACT_APP_imgbb_key;

    const handlePostData = (event) => {
        event.preventDefault()
        const form = event.target;
        const articles = form.article.value;
        const formImage = form.image.files[0];
        const postDate = form.date.value;
        const posTime = new Date();


        const formData = new FormData();
        formData.append('image', formImage);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    const addPost = {
                        article: articles,
                        userId: user?.uid,
                        img: imageData.data.url,
                        userImage: loginUser.photoURL,
                        userName: loginUser.displayName,
                        likes: [{ user: user.uid }],
                        date: postDate,
                        time: posTime
                    }
                    fetch('http://localhost:5000/post', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(addPost)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                toast.success('Post added successfully');
                                event.target.reset();
                                console.log(data);
                            }
                        })
                }
            })



    };

    return (
        <div className='mx-5'>
            <input type="checkbox" id="post-modal" className="modal-toggle" />

            <div className="modal modal-top sm:modal-middle">
                <div className="modal-box">
                    <div className="avatar flex items-center ">
                        <div className="md:w-12 w-8 rounded-full">
                            <img src={loginUser?.photoURL} alt='' />
                        </div>
                        <h3 className='ml-2 md:text-2xl  text-xl font-bold'>{loginUser?.displayName}</h3>
                        <label htmlFor="post-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    </div>
                    <form onSubmit={handlePostData}>
                        <input name='date' hidden type="text" defaultValue={format(postTime, 'PP')} />
                        <textarea name='article' required className="textarea textarea-bordered w-full my-5 h-40" placeholder="Write your text..."></textarea>
                        <input type="file" name='image' className="file-input file-input-ghost w-full file-input-bordered " />

                        <div className="modal-action  ">
                            <button className='w-full'>
                                <label type='submit' htmlFor="post-modal" className="btn w-96  ">Post submit</label>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostModal;