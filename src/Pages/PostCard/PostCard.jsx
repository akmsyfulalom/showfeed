import React from 'react';
import { FcLike } from 'react-icons/fc';
import { CgComment } from 'react-icons/cg';
import { IoIosShareAlt } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';
import { BsThreeDots } from 'react-icons/bs';


const PostCard = () => {

    const { data: posts = [] } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/posts')
            const data = await res.json()
            return data.reverse();
        }

    })

    return (
        <div>
            <p className='text-center mt-2'>Recent posts</p>
            {
                posts?.map(post => <div key={post?._id} className="card md:w-1/2  bg-base-100 shadow-xl md:mx-auto mx-5 my-2 ">
                    <div className="card-body">
                        <div className='flex items-center justify-between gap-4'>
                            <div className='flex '>
                                <div className="avatar">
                                    <div className="md:w-12 w-8 rounded-full">
                                        <img src="https://placeimg.com/192/192/people" alt='' />
                                    </div>

                                </div>
                                <div className='ml-2'>
                                    <h2 className="card-title ">Your name</h2>
                                    <p className='-mt-1 ml-1 text-xs'>Dec-22-2022</p>
                                </div>
                            </div>
                            <div >
                                <BsThreeDots className='font-bold ' ></BsThreeDots>
                            </div>
                        </div>

                        <p>{post?.article}</p>
                    </div>
                    <figure><img src={post?.img} alt="PostImage" /></figure>


                    <div className="divider"></div>
                    <div className='flex justify-around pb-4'>
                        <div className='flex gap-1'><FcLike className='text-xl' /><p> React</p></div>
                        <div className='flex gap-1'><CgComment className='text-xl' /><p> Comment</p></div>
                        <div className='flex gap-1'><IoIosShareAlt className='text-xl' /><p> Share</p></div>

                    </div>
                </div>)
            }

        </div>
    );
};

export default PostCard;