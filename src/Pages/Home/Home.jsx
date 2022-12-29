import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useUser from '../../Hooks/useUser/useUser';
import Post from '../Post/Post';

import PostCard from '../PostCard/PostCard';


const Home = () => {
    const { user } = useContext(AuthContext);
    const [isUser] = useUser(user?.email);
    return (
        <div>
            {
                isUser && <>
                    <Post />
                    <PostCard />
                </>
            }


        </div>
    );
};

export default Home;