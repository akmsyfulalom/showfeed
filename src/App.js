import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/Router/Router';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <RouterProvider router={router}>
      </RouterProvider>
      <Toaster></Toaster>
    </>
  );
}

export default App;
