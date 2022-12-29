import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className='text-center mt-5'>
            <div animation="border" variant="primary" />
        </div>
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;

};

export default PrivateRouter;