import React from 'react';

const PostModal = () => {
    return (
        <div className='mx-5'>
            <input type="checkbox" id="post-modal" className="modal-toggle" />
            <div className="modal modal-top sm:modal-middle">
                <div className="modal-box">
                    <div className="avatar flex items-center ">
                        <div className="md:w-12 w-8 rounded-full">
                            <img src="https://placeimg.com/192/192/people" alt='' />
                        </div>
                        <h3 className='ml-2 md:text-2xl  text-xl font-bold'>Name</h3>
                    </div>
                    <textarea className="textarea textarea-bordered w-full my-2 h-40" placeholder="Write your text..."></textarea>
                    <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    <div className="modal-action">
                        <label htmlFor="post-modal" className="btn">Yay!</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostModal;