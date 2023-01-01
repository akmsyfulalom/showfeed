import React, { useContext, useState } from 'react';
import { GrLike } from 'react-icons/gr'
import { CgComment } from 'react-icons/cg';
import { IoIosShareAlt } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';
import { BsThreeDots } from 'react-icons/bs';
import { useEffect } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner';


const PostCard = () => {
    const { user } = useContext(AuthContext);
    const [loginUser, setLoinUser] = useState({})
    const [commentDate, setCommentDate] = useState(new Date())



    useEffect(() => {
        if (user?.email) {
            fetch(`https://showfeed-server.vercel.app/user/${user?.email}`)
                .then(res => res.json())
                .then(data => setLoinUser(data))

        }
    }, [user?.email])

    const { data: posts = [], refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('https://showfeed-server.vercel.app/posts')
            const data = await res.json()
            return data.reverse();
        }

    });

    const { data: comments = [], isLoading, } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await fetch('https://showfeed-server.vercel.app/comments')
            const data = await res.json()

            return data;
        }
    })




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

        fetch(`https://showfeed-server.vercel.app/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addComment)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch()
                    event.target.reset();
                    console.log(data);

                }
            })
    };


    const handleLikePost = (id) => {
        fetch(`https://showfeed-server.vercel.app/like/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: user.uid })
        }).then(res => res.json()).then(data => {

            // console.log(data)
            refetch()
        })

    };

    // const like = likes.map(like => console.log(like._id))

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div>
            <p className='text-center mt-2 text-slate-500'>Recent posts</p>
            {
                posts?.map(post => <div key={post?._id} className="card md:w-1/2  bg-base-100 shadow-xl md:mx-auto mx-5 my-2 ">
                    <div className="card-body">
                        <div className='flex items-center justify-between gap-4'>
                            <div className='flex '>
                                <div className="avatar">
                                    <div className="md:w-12 w-8 rounded-full">
                                        <img src={post.userImage} alt='' />
                                    </div>

                                </div>
                                <div className='ml-2'>
                                    <h2 className="card-title ">{post.userName}</h2>
                                    <p className='-mt-1 ml-1 text-xs'>{post.date}</p>
                                </div>
                            </div>
                            <div >
                                <BsThreeDots className='font-bold ' ></BsThreeDots>
                            </div>
                        </div>

                        <p>{post?.article}</p>
                        <div className="card-actions justify-start">
                            <Link to={`/post/${post?._id}`} className="   font-bold">Read More</Link>
                        </div>
                    </div>
                    <figure><img src={post?.img} alt="PostImage" className='max-h-96' /></figure>

                    <div>
                        <span></span>
                    </div>
                    <div className='flex justify-between lg:mx-20 md:mx-10 mx-5'>

                        <p>{post.likes?.length === 0 ? '' : post.likes?.length} {post.likes?.length === 1 ? "Like" : "Likes"}</p>


                        <div className='flex gap-1'>
                            <p>
                                {
                                    comments?.filter(c => c.id === post._id).length === 0 ? '' : comments?.filter(c => c.id === post._id).length
                                }

                            </p>
                            <p>
                                {
                                    comments?.filter(c => c.id === post._id).length === 1 ? "Comment" : "Comments"
                                }
                            </p>
                        </div>
                    </div>
                    <div className="divider my-1"></div>
                    <div className='flex justify-around pb-4'>
                        <div onClick={() => handleLikePost(post._id)} className='flex gap-1 cursor-pointer'><GrLike /><p className='select-none'>Like</p></div>
                        <div className='flex gap-1'><CgComment className='text-xl' /><p> Comment</p></div>
                        <div className='flex gap-1'><IoIosShareAlt className='text-xl' /><p> Share</p></div>
                    </div>
                    <div className="divider -mt-4"></div>
                    <div>
                        <form onSubmit={handleCommentPost} className='flex gap-1 mb-4 mx-1'>

                            <input name='postId' defaultValue={post?._id} type="text" hidden />
                            <input name='name' defaultValue={loginUser?.displayName} type="text" hidden />
                            <input name='userImage' defaultValue={loginUser?.photoURL} type="text" hidden />
                            <input name='comment' type="text" placeholder="Write your comment" required className="relative rounded-full input input-bordered w-full" />
                            <input name='date' defaultValue={format(commentDate, "P")} type="text" hidden />
                            <button type='submit' className={`btn btn-active btn-primary rounded-full no-animation absolute right-1`}>Comment</button>
                        </form>
                        <div>
                            {/* postComment.comment === '' */}
                            {
                                comments.filter(c => c.id === post._id).map(comment => <div key={comment?._id} className='bg-base-300 py-2 mt-2 mb-3 rounded-md'>
                                    <div className=' mx-2'>

                                        <div className='flex items-center '>
                                            <div className="avatar">
                                                <div className="md:w-8 w-6 rounded-full ">
                                                    <img src={comment.userImage} alt='profile' />
                                                </div>
                                            </div>
                                            <h3 className='md:text-1xl font-bold ml-1'>{comment.name}</h3>

                                        </div>
                                        <div className='lg:ml-8 md:ml-8 ml-7'>
                                            <p className='-mt-2'>{comment.comment}</p>
                                            <p className='text-xs'>Dec-30-2022</p>
                                        </div>

                                    </div>
                                </div>)
                            }
                        </div>

                    </div>
                </div>)
            }

        </div>
    );
};

export default PostCard;