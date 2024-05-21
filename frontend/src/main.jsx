import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import MainProduct from './pages/MainProduct.jsx';


import { store } from './store.js';
import { Provider } from 'react-redux'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "cart",
        element: <Cart/>,
        children:[
          {
            path:':id?',
            element:<Cart/>
          }
        ]
      },
      {
        path: "signin",
        element: <Login/>
      },
      {
        path: "sigup",
        element: <SignUp/>
      },{
        path: "product/:id",
        element: <MainProduct/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
     <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
