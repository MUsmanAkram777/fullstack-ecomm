import React, { useEffect } from "react";
import CheckoutNav from "../components/CheckoutNav";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addOrder } from "../slices/cartSlice";

function PlaceOrder() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

    const dispatch = useDispatch()
  const userInfo = useSelector(state=>state.user.userInfo)
  const navigate = useNavigate()

  useEffect(() => {
    if(!userInfo.name) navigate('/signin?redirect=/')
  }, [userInfo])


  const handleOrder = () => {
    dispatch(addOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        totalPrice:cart.totalPrice,
        shippingPrice:parseFloat((cart.totalPrice * 0.1).toFixed(2))
    }))
  }
  

  return (
    <div className="mx-auto p-8 max-w-[1300px] mt-4 h-screen">
      <CheckoutNav step1 step2 step3 step4 />
      <div className="mx-auto my-4 max-w-4xl md:my-6">
        <div className="overflow-hidden rounded-xl border border-gray-100 shadow">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="px-5 py-6 md:border-r md:border-r-gray-200 md:px-8">
              <div className="flow-root">
                <ul className="-my-7 divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li
                      className="flex items-stretch justify-between space-x-5 py-7"
                      key={item.id}
                    >
                      <div className="flex flex-1 items-stretch">
                        <div className="flex-shrink-0">
                          <img
                            className="h-20 w-20 rounded-lg border border-gray-200 object-cover"
                            src={item.image}
                          />
                        </div>
                        <div className="ml-5 flex flex-col justify-between">
                          <Link to={`/product/${item.id}`} className="flex-1">
                            <p className="text-sm font-bold text-gray-900">
                              {item.name}
                            </p>
                          </Link>
                          <p className="mt-4 text-sm font-medium text-gray-500">
                            {item.qty} x Rs. {item.price} = Rs.{" "}
                            {(item.qty * item.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <hr className="mt-6 border-gray-200" />
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center justify-between">
                    <p className="text-sm font-medium">Sub total</p>
                    <p className="text-sm font-medium">Rs. {cart.totalPrice}</p>
                  </li>
                  <li className="flex items-center justify-between">
                    <p className="text-sm font-medium">Shipping</p>
                    <p className="text-sm font-medium">
                      Rs. {(cart.totalPrice * 0.1).toFixed(2)}
                    </p>
                  </li>
                  <li className="flex items-center justify-between">
                    <p className="text-sm font-medium ">Total</p>
                    <p className="text-sm font-bold ">
                      Rs.{" "}
                      {parseFloat(cart.totalPrice) +
                        parseFloat((cart.totalPrice * 0.1).toFixed(2))}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="px-5 py-6 md:px-8">
              <div className="flow-root">
                <div className="-my-6 divide-y divide-gray-200">
                  <div className="py-6">
                    <h2 className="text-base font-bold text-black">
                      Shipping Information
                    </h2>
                    <p className="fontmedium mt-3 text-xs text-gray-700">
                      Address: {shippingAddress.address}{" "}
                      {shippingAddress.street}, {shippingAddress.city},{" "}
                      {shippingAddress.postalCode}, {shippingAddress.country}
                    </p>
                  </div>
                  <div className="py-6">
                    <h2 className="text-base font-bold text-black">
                      Payment Information
                    </h2>
                    <p className="mt-3 text-xs font-medium text-gray-700">
                      Mode: {paymentMethod == "cod" && "Cash on Delivery"}
                    </p>
                  </div>
                  <hr className="mb-6 border-gray-200"></hr>
                  <div className="mb-6">
                    <button className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80" onClick={handleOrder}>
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
