import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import MainProduct from "./pages/MainProduct.jsx";

import { store } from "./store.js";
import { Provider } from "react-redux";
import Profile from "./pages/profile/Profile.jsx";
import UpdateProfile from "./pages/profile/UpdateProfile.jsx";
import Layout from "./pages/profile/Layout.jsx";
import Shipping from "./pages/Shipping.jsx";
import Payment from "./pages/Payment.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "signin",
        element: <Login />
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "shipping",
        element: <Shipping />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "placeorder",
        element: <PlaceOrder />,
      },
      {
        path: "/order/:id",
        element: <OrderDetails />,
      },
      {
        path: "product/:id",
        element: <MainProduct />,
      },
      {
        path: "profile",
        element: <Layout/>,
        children:[
          {
            path: "",
            element: <Profile />
          },
          {
            path: "update",
            element: <UpdateProfile />,
          }
        ]
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
