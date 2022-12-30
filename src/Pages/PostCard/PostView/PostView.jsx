import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import LoadingSpinner from '../../../Components/LoadingSpinner/LoadingSpinner';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import { FaComment, FaEye, FaHandPointRight } from 'react-icons/fa'
import { format } from 'date-fns';

const PostView = () => {
    const postView = useLoaderData()
    console.log(postView)
    const { user } = useContext(AuthContext)
    const [commentDate] = useState(new Date());
    const [loginUser, setLoginUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);


    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/user/${user?.email}`)
                .then(res => res.json())
                .then(data => setLoginUser(data))
        }
    }, [user?.email])


    const { data: comments = [], refetch } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/comments')
            const data = await res.json()
            console.log(data);
            return data;
        }
    });
    function copy() {
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
    }

    const handleCommentPost = (event) => {
        event.preventDefault();
        const form = event.target;
        const postId = form.postId.value;

        const name = form.name.value;
        const userImage = form.userImage.value;
        const date = form.date.value;
        const comment = form.comment.value;
        console.log(postId, name, userImage, date, comment,)

        const addComment = {
            id: postId,
            name,
            userImage,
            date,
            comment,
            time: new Date()
        }

        fetch(`http://localhost:5000/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addComment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    event.target.reset();
                    console.log(data);
                    refetch()
                }
            })
    };


    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])


    return (
        <div>
            {
                loading ? <LoadingSpinner />
                    :
                    <div className='grid lg:grid-cols-5 grid-cols-1 gap-5 md:mx-10 mx-5 my-10   '>


                        <div className="col-span-3">
                            <div className="card card-compact  ">
                                <figure><img src={loginUser?.photoURL} alt="post img" /></figure>
                                <div className="">

                                    <p>{postView?.article}</p>

                                </div>
                            </div>

                        </div>
                        <div className='card card-compact md:p-5 p-2   card-body col-span-2'>

                            <div className='flex items-center '>
                                <div className="avatar mr-2">
                                    <div className="md:w-16 w-8 rounded-full">
                                        <img src={loginUser.photoURL} alt='profile' />
                                    </div>
                                </div>
                                <p className='text-xl font-bold -mt-4'>AKM SYFUL ALOM</p>
                                <button onClick={copy}>{!copied ? "Copy Link" : "Copied!"}</button>

                            </div>
                            <div className='md:pl-16 pl-8'>
                                <p className='pl-2 md:-mt-10 -mt-5'>Post date: 23-12-2022</p>
                            </div>
                            <div>
                                <h1 className='mt-2 mb-5 font-semibold text-xl'>{postView?.article}</h1>
                            </div>
                            <div className='flex justify-between'>
                                <div><p className='text-center'>1</p>
                                    <button className='flex items-center '> <FaHandPointRight className='mr-2 text-xl'></FaHandPointRight><p>Like</p></button>
                                </div>
                                <div><p className='text-center'>{comments.length}</p>
                                    <button className='flex items-center '> <FaComment className='mr-2 text-xl'></FaComment><p>Comment</p></button>
                                </div>
                                <div><p className='text-center'>1</p>
                                    <button className='flex items-center '> <FaEye className='mr-2 text-xl'></FaEye><p>Views</p></button>
                                </div>
                            </div>
                            <div>
                                <p>Write a Comment</p>
                                <form onSubmit={handleCommentPost}>
                                    <input name='postId' defaultValue={postView?._id} type="text" hidden />
                                    <input name='name' defaultValue={loginUser?.displayName} type="text" hidden />
                                    <input name='userImage' defaultValue={loginUser?.photoURL} type="text" hidden />
                                    <input name='comment' type="text" placeholder="Write your comment" required className="relative rounded-full input input-bordered w-full" />
                                    <input name='date' defaultValue={format(commentDate, "P")} type="text" hidden />
                                    <button type='submit' className={`btn btn-active btn-primary rounded-full no-animation absolute right-1`}>Comment</button>
                                </form>

                            </div>
                            <div>
                                <p className='font-semibold'>Comments</p>
                            </div>
                            <div>
                                {
                                    comments?.map(comment => <div key={comment._id} className='mb-5' >
                                        <div className='flex items-center'>
                                            <div className="avatar">
                                                <div className=" mr-1 w-4 rounded-full  ">
                                                    <img src={loginUser.photoURL} alt="" />
                                                </div>
                                            </div>
                                            <p className='text-sm'>{comment?.name}</p>

                                        </div>

                                        <p>{comment?.comment}</p>
                                        <p className='text-xs'>Commented: {comment?.date}</p>
                                        <hr className='my-2' />
                                    </div>)
                                }
                            </div>

                        </div>


                    </div>
            }
        </div>
    );
};

export default PostView;