import React, { useEffect } from "react";
import { SingleCartItem } from "../components";
import { useSelector } from "react-redux";

function Cart() {
  const cart = useSelector((state) => state.cart);

  

  if (!cart.cartItems.length)
    return (
      <>
        <div className="mx-auto p-8 max-w-[1300px]">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Your Cart is empty
          </h1>
        </div>
      </>
    );

  return (
    <div className="mx-auto p-8 max-w-[1300px]">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Shopping Cart
      </h1>
      <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        <section
          aria-labelledby="cart-heading"
          className="rounded-lg bg-white lg:col-span-8"
        >
          <h2 id="cart-heading" className="sr-only">
            Items in your shopping cart
          </h2>
          <ul role="list" className="divide-y divide-gray-200">
            {cart.cartItems.map((product) => (
              <SingleCartItem key={product.id} product={product} />
            ))}
          </ul>
        </section>
        {/* Order summary */}
        <section
          aria-labelledby="summary-heading"
          className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0 shadow"
        >
          <h2
            id="summary-heading"
            className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
          >
            Price Details
          </h2>
          <div>
            <dl className=" space-y-1 px-2 py-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-800">
                  Price ({cart.totalItems} item)
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  Rs. {cart.totalPrice}
                </dd>
              </div>
              <div className="flex items-center justify-between border-y border-dashed py-4 ">
                <dt className="text-base font-medium text-gray-900">
                  Total Amount
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  Rs. {cart.totalPrice}
                </dd>
              </div>
            </dl>
            <div className="px-2 pb-4 font-medium text-green-700">
              You will save ₹ 3,431 on this order
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}

export default Cart;
