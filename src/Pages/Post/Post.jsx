
import React from 'react';
import PostModal from '../../Components/PostModal/PostModal';



const Post = () => {

    return (
        <div>
            <div className="card md:w-1/2  bg-base-100 shadow-xl md:mx-auto mx-5 mt-2">
                <div className="card-body p-5 ">
                    <label htmlFor="post-modal" className='hover:cursor-pointer'>
                        <div>
                            <p className="textarea w-full textarea-bordered" placeholder=" ">Write your post...</p>
                        </div>
                        <div className='flex justify-center'>
                            <h1 className='text-xl font-semibold mt-2 -mb-2'>Create Post</h1>
                        </div>
                    </label>
                </div>
            </div>
            <PostModal></PostModal>
        </div>
    );
};

export default Post;