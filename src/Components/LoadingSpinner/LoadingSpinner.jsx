import React from 'react';
import { Puff } from 'react-loader-spinner';

const LoadingSpinner = () => {
    return (
        <div className='flex justify-center my-48'>
            <Puff
                height="80"
                width="80"
                radius={1}
                color="#00FFAB"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
};

export default LoadingSpinner;