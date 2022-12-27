import React from 'react';


const Post = () => {
    return (
        <div>
            <div className="card md:w-1/2  bg-base-100 shadow-xl md:mx-auto mx-5 mt-2">
                <div className="card-body ">
                    <div className='flex items-center gap-4'>
                        <div className="avatar">
                            <div className="md:w-16 w-10 rounded-full">
                                <img src="https://placeimg.com/192/192/people" alt='' />
                            </div>
                        </div>
                        <p>Start your post here!</p>
                    </div>
                    <div>
                        <textarea className="textarea w-full textarea-bordered" placeholder="Write your post... "></textarea>
                    </div>
                    <div className='flex justify-center'>
                        <input type="file" className="file-input" />
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Post;