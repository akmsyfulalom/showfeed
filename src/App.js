import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/Router/Router';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import LoadingSpinner from './Components/LoadingSpinner/LoadingSpinner';

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])
  return (
    <div>
      {
        loading ? <LoadingSpinner />
          :
          <>
            <RouterProvider router={router}>
            </RouterProvider>
            <Toaster></Toaster>
          </>
      }

    </div>
  );
}

export default App;
