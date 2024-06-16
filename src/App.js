import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './c/Home';
import Dog from './c/Dog';
import Cat from './c/Cat';

const router= createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/dog', element: <Dog /> },
  { path: '/cat', element: <Cat /> }
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
