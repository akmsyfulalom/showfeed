import React from 'react';
import { FcLike } from 'react-icons/fc';
import { CgComment } from 'react-icons/cg';
import { IoIosShareAlt } from 'react-icons/io';

const PostCard = () => {
    return (
        <div>
            <div className="card md:w-1/2  bg-base-100 shadow-xl md:mx-auto mx-5 my-2 ">
                <div className="card-body">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                </div>
                <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>


                <div className="divider"></div>
                <div className='flex justify-around pb-4'>
                    <div className='flex gap-1'><FcLike className='text-xl' /><p> React</p></div>
                    <div className='flex gap-1'><CgComment className='text-xl' /><p> Comment</p></div>
                    <div className='flex gap-1'><IoIosShareAlt className='text-xl' /><p> Share</p></div>

                </div>
            </div>
        </div>
    );
};

export default PostCard;